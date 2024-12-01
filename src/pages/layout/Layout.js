import { faBell, faCalendarCheck, faCreditCard, faHouse, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Link, Outlet, NavLink, useLocation } from 'react-router-dom';
import S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setPreviousUrl } from '../../modules/user';

const Layout = () => {

    // 비로그인 회원이 My페이지 접근을 못하게 한다.
    const location = useLocation();
    const dispatch = useDispatch();

    const previousUrl = useSelector((state)=> state.user.previousUrl);
    const path = location.pathname + location.search;

    const isLogin = useSelector((state) => state.user.isLogin);
    console.log(isLogin)
    
    const currentUser = useSelector((state)=> state.user.currentUser);
    console.log(currentUser);
    const {name} = currentUser;



    useEffect(()=>{

        if(path !== "/my"){
            dispatch(setPreviousUrl(path))
            console.log("리덕스 이전경로", previousUrl)
            console.log("현재 경로", path)
        }
    },[path, dispatch])

    let userName = "";

    if(isLogin){
        userName = `${name}'s Todo List`;
    }else{
        userName = "My Todo List";
    }


    return (
        <S.BackGround>
            <S.Wrapper>
                <S.Header>
                    {/* <Link to={"/"}>{userName}</Link> */}
                    <Link to={"/"}>{isLogin ? (<><span style={{color : "#87A2FF"}}>{name}</span>'s Todo List</>) : ("My Todo list")}</Link>
                    {/* <Link to={"/"}>My Todo list</Link> */}
                </S.Header>
                <S.Main>
                    <Outlet />
                </S.Main>
                <S.Nav>
                    <NavLink to={"/"}>
                        <FontAwesomeIcon icon={faHouse} className='icon' />
                        <p>Home</p>
                    </NavLink>
                    <NavLink to={"/todo"}>
                        <FontAwesomeIcon icon={faCalendarCheck} className='icon' />
                        <p>Feed</p>
                    </NavLink>
                    <NavLink to={"/my"}>
                        <FontAwesomeIcon icon={faUser} className='icon' />
                        <p>My</p>
                    </NavLink>
                </S.Nav>
            </S.Wrapper>
        </S.BackGround>
    );
};

export default Layout;