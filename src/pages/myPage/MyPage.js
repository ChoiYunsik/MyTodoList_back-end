import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useSearchParams, Navigate, useNavigate} from 'react-router-dom'
import { setPreviousUrl, setUser, setUserStatus } from '../../modules/user';
import BasicButton from '../../components/button/BasicButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faPhone, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import S from './style';
import { useRef } from 'react';
import { useState } from 'react';


const MyPage = () => {
    const [ searchParams ] = useSearchParams();
    const previousUrl = useSelector((state) => state.user.previousUrl);
    const currentUser = useSelector((state) => state.user.currentUser);
    const isLogin = useSelector((state) => state.user.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    console.log(currentUser)
    console.log(isLogin)

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        console.log(accessToken)
        if(accessToken){
            localStorage.setItem("accessToken", accessToken)
        }  

    }, [searchParams, navigate])
      
    const {email, name, age, createAt, phone } = currentUser;
    const date = createAt?.substring(0, 10);
    
    // 로그아웃
    const logoutHandle = () => {
      localStorage.removeItem("accessToken")
      dispatch(setUser({}));
      dispatch(setUserStatus(false));
      navigate("/")
    }
    
    // 프로필 이미지
    const pictureRef = useRef(null);
    const [selectFile, setSelectFile] = useState(null);
    const [picturePath, setPicturePath] = useState(`https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app${currentUser.picture}`);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectFile(file);
            const fileUrl = URL.createObjectURL(file);
            setPicturePath(fileUrl); // 화면에 미리보기할 path
        }

    }
    const savePicture = async (e) => {
        if(!selectFile){
            alert("이미지를 등록해주세요.")
        }
        const formData = new FormData();
        formData.append("picture", pictureRef.current.files[0]);
        formData.append("email",currentUser.email);

        const config = {
            method : "POST",
            header : {
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            },
            body : formData

        }
        await fetch("https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app/user/picture", config)
        .then((res)=> res.json())
        .then((res) => {
            console.log(res)
            const newPicturePath = res.filePath;
            setPicturePath(`https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app${newPicturePath}`)
        })
        .catch()
    }
    if(!isLogin){
      return <Navigate to={previousUrl ? previousUrl : "/"} replace={true} />
    }

    return (
      <>
        <S.Wrapper>
            <S.Label htmlFor='profile'>
                <S.Profile src={picturePath} />
            </S.Label>
            <input 
            type="file" style={{display : "none"}}
            ref={pictureRef} id='profile' name='picture'
            onChange={handleFileChange}
            />
            <S.Button className='button' onClick={savePicture}>Change profile image</S.Button>
        </S.Wrapper>            
        <S.Container >
            <p><S.NameSpan><FontAwesomeIcon className="icon" icon={faUser}></FontAwesomeIcon>{name}</S.NameSpan></p>
            <p><S.Span><FontAwesomeIcon className="icon" icon={faEnvelope}></FontAwesomeIcon>{email}</S.Span></p>
            <p><S.Span><FontAwesomeIcon className="icon" icon={faPhone}></FontAwesomeIcon>{phone}</S.Span></p>
            <p><S.Span><FontAwesomeIcon className="icon" icon={faUserPlus}></FontAwesomeIcon>{date}</S.Span></p>
        </S.Container >
        <BasicButton onClick={logoutHandle} size={"full"} shape={"small"} variant={"blue"} color={"white"}>Logout</BasicButton>
      </>
    )
  
}
    // Navigate to={보낼 경로} replace ={} 왔던 기록을 없애게 만든다. history에서 사라진다.

export default MyPage;
