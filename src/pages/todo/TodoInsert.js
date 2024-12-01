import React, { useState } from 'react';
import S from './style'
import useInput from '../../hooks/userInput';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const TodoInsert = ({isTodoUpdate, setIsTodoUpdate, todos}) => {
  //const { register} = useForm({mode : "onChange"});
    //const [value, onChangeValue, setValue] = useInput("");
    const [value, setValue] = useState("")
    const currentUser = useSelector((state)=> state.user.currentUser);
    const isLogin = useSelector((state) => state.user.isLogin);
  
    const onPressAddTodo = async (e) => {
      if (e.key === 'Enter') {
          if (!window.confirm("Are you sure you want to add it?")) return;
  
          // Todo 추가 요청
          await fetch("http://localhost:8000/todo/register", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: currentUser.email,
                  title: value,
              })
          }).then((response) => {
              if (!response.ok) {
                  return response.json().then(err => alert(err.message)); // 에러 메시지 출력
              }
              setIsTodoUpdate(!isTodoUpdate);
              setValue(""); // 입력 필드 초기화
          });
      }
  }
  
  
    return (
      <S.Input type='text' placeholder='Would you like to add a task?' 
      value={value} onChange={(e)=>{setValue(e.target.value)}} onKeyDown={onPressAddTodo}

      
      />
    );
  
};

export default TodoInsert;
