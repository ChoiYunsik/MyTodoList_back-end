import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/style';
import BasicButton from './../../components/button/BasicButton';
import S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Google from './img/google.svg'
import NAVER from './img/naver.png'
const SignIn = () => {
    // react-hook-form
    const { register, handleSubmit, getValues, formState: { isSubmitted, isSubmitting, errors}} = useForm({mode : "onchange"});

    // 정규식
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
 
    // 로그인 이후 로직
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.user.isLogin);
    const currentUser = useSelector((state => state.user.currentUser));
  
    if(isLogin){
      return (
        <>
          <Navigate to={"/my"} replace={true} />
        </>
      )
    }
  
    return (
      <S.Form onSubmit={handleSubmit(async (data) => {
          console.log(data)
          await fetch("mytodolist:8000/auth/local", {
            method : "POST",
            headers : {
              "Content-Type" : "application/json",
            },
            body : JSON.stringify({
              email : data.email,
              password : data.password
            })
          })
          .then((res)=>{
            if(!res.ok){
              throw new Error(res.message || "로그인에 실패했습니다.");
            }
            return res.json()
          })
          .then((res)=>{
            // 성공적인 응답
            const { accessToken, user} = res;
            dispatch(setUser(user));
            dispatch(setUserStatus(true));
            localStorage.setItem("accessToken", accessToken)
          })
          .catch(console.error)
  
        })}>
  
        {/* 이메일 검증로직 */}
        <S.Label>
          <S.Title>Email</S.Title>
          <Input size={"full"} shape={"small"} variant={"blue"} color={"black"}
            type="text" className='BasicInput'
            id='email'
            name='email' 
            placeholder='Enter your email'
  
            {...register("email", {
              required : true,
              pattern : {
                value : emailRegex,
              }
            })}
          />  
          {errors?.email?.type === 'required' && (
            <S.ConfirmMessage>Enter your email</S.ConfirmMessage>
          )}
          {errors?.email?.type === 'pattern' && (
            <S.ConfirmMessage>Please enter your email in the correct format</S.ConfirmMessage>
          )}
        </S.Label>    
  
        {/* 비밀번호 검증로직 */}
        <S.Label>
          <S.Title>Password</S.Title>
          <Input size={"full"} shape={"small"} variant={"blue"} color={"black"}
            type="password" className='BasicInput'
            id='password'
            name='password' 
            placeholder='Enter your password'
  
            {...register("password", {
              required : true,
              pattern : {
                value : passwordRegex,
              }
            })}
          />  
          {errors?.password?.type === 'required' && (
            <S.ConfirmMessage>Please enter your password</S.ConfirmMessage>
          )}
          {errors?.password?.type === 'pattern' && (
            <S.ConfirmMessage>It must contain at least one lowercase letter, one number, and one special character(!@#), and be at least 8 characters long</S.ConfirmMessage>
          )}
        </S.Label>    
  
        <BasicButton size={"full"} shape={"small"} variant={"blue"} color={"white"}>Sign In</BasicButton>
        <div>
          <S.DivGoogle>
            <a className="googleButton" href='https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app/auth/google'><img className="google" src={Google}></img>Google</a>
          </S.DivGoogle>
          <S.DivNaver>
            <a className="naverButton" href='https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app/auth/naver'><img className="naver" src={NAVER}></img>NAVER</a>
          </S.DivNaver>
        </div>
      </S.Form>
    );
  
};

export default SignIn;