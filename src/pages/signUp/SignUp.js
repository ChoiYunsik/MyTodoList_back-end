import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/style';
import BasicButton from './../../components/button/BasicButton';
import S from './style';
import { useNavigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';

const SignUp = () => {
  
  // react-hook-form
  const { register, handleSubmit, getValues, formState: { isSubmitted, isSubmitting, errors}} = useForm({mode : "onchange"});

  // 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  
  const navigate = useNavigate();

  return (
    <S.Form onSubmit={handleSubmit(async (data) => {
      console.log(data)
        await fetch("https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app/user/register", {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            email : data.email,
            name : data.name,
            password : data.password,
            phone : data.phone
          })
        })
        .then((res) => res.json())
        .then((res) => {
          //console.log(res)

          if(!res.registerSuccess){
            alert(res.message)
          }else{
            alert(res.message)
            navigate("/signIn");
          }
        })
      })}>

      {/* 이메일 검증로직 */}
      <S.Label>
        <S.Title>Name</S.Title>
        <Input size={"full"} shape={"small"} variant={"blue"} color={"black"}
          type="text" className='BasicInput'
          id='name'
          name='name' 
          placeholder='Enter your name'

          {...register("name", {
            required : true
          })}
        />  
        {errors?.name?.type === 'required' && (
          <S.ConfirmMessage>Please enter your name</S.ConfirmMessage>
        )}
      </S.Label>    
      <S.Label>
        <S.Title>Phone</S.Title>
        <Input size={"full"} shape={"small"} variant={"blue"} color={"black"}
          type="text" className='BasicInput'
          id='phone'
          name='phone' 
          placeholder='Enter your phone number'

          {...register("phone", {
            required : true
          })}
        />  
        {errors?.phone?.type === 'required' && (
          <S.ConfirmMessage>Please enter your phone number</S.ConfirmMessage>
        )}
      </S.Label>    
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
          <S.ConfirmMessage>Please Enter your email</S.ConfirmMessage>
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

      {/* 비밀번호 확인 */}
      <S.Label>
        <S.Title>Password</S.Title>
        <Input size={"full"} shape={"small"} variant={"blue"} color={"black"}
          type="password" className='BasicInput'
          placeholder='Enter your password again'

          {...register("passwordConfirm", {
            required : true,
            validate : {
              matchPassword : (value) => {
                const { password } = getValues();
                let isMatch = password == value;
                console.log(value, password, isMatch);
                return isMatch;
              }
            }
          })}
        />  
        {errors?.passwordConfirm && (
          <S.ConfirmMessage>Please re-enter your password</S.ConfirmMessage>
        )}
      </S.Label>        
    <BasicButton size={"full"} shape={"small"} variant={"blue"} color={"white"}>Sign Up</BasicButton>
    </S.Form>
  );
};

export default SignUp;