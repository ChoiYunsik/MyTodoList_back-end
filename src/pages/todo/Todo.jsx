import React, { useState } from 'react';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import useInput from './../../hooks/userInput';

const Todo = ({todo, isTodoUpdate, setIsTodoUpdate}) => {
    const {email, title} = todo;
    

    // 수정 할 때
    const [isEdit, setIsEdit] = useState(false);
    const [value, onChangeValue, setValue] = useInput(title);
  
    const handleIsEdit = () => {
      setIsEdit(!isEdit)
    }
   
    // CRUD 수정
    // 체크 상태관리
    const [isChecked, setIsChecked] = useState(todo.isChecked);
  
    const handleIsChecked = async () => {
      await fetch("https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app/todo/update", {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          ...todo,
          isChecked : !isChecked
        })
      }).then((response) => {
        console.log('리스폰트', response)
        if(!response.ok) return console.error(`Error ${response}`)
          setIsTodoUpdate(!isTodoUpdate)
          setIsChecked(!isChecked)
      })
    }
  
    // 삭제
    // 투두리스트 삭제
    const handleRemoveTodo = async () => {
        if(window.confirm("Are you sure you want to delete this?")){
            await fetch("https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app/todo/delete", {
                method : 'DELETE',
                headers : {
                  'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                  ...todo,
                })

              }).then((response) => {
                console.log('리스폰트', response)
                if(!response.ok) return console.error(`Error ${response}`)
                  setIsTodoUpdate(!isTodoUpdate)
              })
              
              
        }
    }

    // 수정
    // 타이틀 수정
    const handleUpdateTodo = async () => {
        await fetch("https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app/todo/titleUpdate", {
            method : 'PUT',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              ...todo,
              title : value
            })
          }).then((response) => {
            console.log('리스폰스', response)
            if(!response.ok) return console.error(`Error ${response}`)
              setIsTodoUpdate(!isTodoUpdate)
              setIsEdit(!isEdit)
          })
    }
  
    return (
      <S.Li>
        <S.Wrapper>
          <input type="checkbox" checked={isChecked} onChange={handleIsChecked} />
          {isEdit ? (
            <input className='update-input' type='text' value={value} onChange={onChangeValue}/>
          ) : (
            <S.Title className={ isChecked ? "complete" : ""}>{title}</S.Title>
          )}
        </S.Wrapper>
        <S.Wrapper>
          {isEdit ? (
            <>
              <S.Button onClick={handleUpdateTodo}>
                <FontAwesomeIcon className='check' icon={faCheck}></FontAwesomeIcon>
              </S.Button>
              <S.Button>
                <FontAwesomeIcon className='exit' icon={faX} onClick={handleIsEdit}></FontAwesomeIcon>
              </S.Button>
            </>
          ) : (
            <S.Button>
              <FontAwesomeIcon className='pen' icon={faPen} onClick={handleIsEdit}></FontAwesomeIcon>
            </S.Button>
          )}
          <S.Button onClick={handleRemoveTodo}>
            <FontAwesomeIcon className='trash' icon={faTrash}></FontAwesomeIcon>
          </S.Button>
        </S.Wrapper>
      </S.Li>
    );
  
};

export default Todo;

