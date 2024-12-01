import React, { useEffect, useState } from 'react';
import TodoInsert from './TodoInsert';
import Todo from './Todo';
import S from './style';
import { useSelector } from 'react-redux';
const TodoContainer = () => {

  const currentUser = useSelector((state)=> state.user.currentUser);
  const isLogin = useSelector((state) => state.user.isLogin);


    const [todos, setTodos] = useState([]);
    const [isTodoUpdate, setIsTodoUpdate] = useState(false);

    const getTodos = async () => {
        const email = currentUser.email;
        const response = await fetch(`https://port-0-mytodolist-m318bp2ybd6633fd.sel4.cloudtype.app/todo/get?email=${encodeURIComponent(email)}`)
        const datas = await response.json();
        setTodos(datas)
   
    }
    console.log(todos)
    //const titles = todos.map((data)=>data.titles)
    

    useEffect(()=>{
        getTodos()
    },[isTodoUpdate])

    //console.log(todos)
    return (
        <div>
            <TodoInsert isTodoUpdate={isTodoUpdate} setIsTodoUpdate={setIsTodoUpdate} todos={todos}/>
            <S.SubTitle>⭐ To-do :  <span>{todos && todos.length}</span></S.SubTitle>
            <ul>
                {
                    todos && todos.map((todo, i) => (
                    <Todo key={i} todo={todo} todos={todos} isTodoUpdate={isTodoUpdate} setIsTodoUpdate={setIsTodoUpdate} />
                ))}
            </ul>
        </div>
    );
};

export default TodoContainer;