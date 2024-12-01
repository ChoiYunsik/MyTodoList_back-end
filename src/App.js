import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/router';
import GlobalStyle from './global/global';
import { ThemeProvider } from 'styled-components';
import theme from './global/theme';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from './modules/user';

function App() {

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin)
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {

    if(localStorage.getItem("accessToken")){
      const isAuthenticate = async () => {
          const response = await fetch("http://localhost:8000/auth/jwt", {
            method : "POST",
            headers : {
              'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
            }
          })

          if(!response.ok) return;

          const getAuthenticate = await response.json();
          return getAuthenticate;
      }

      isAuthenticate()
        .then((res) => {
          let {message, user} = res;
          console.log(message)
          dispatch(setUser(user))
          dispatch(setUserStatus(true))
        })    
        .catch(console.error)  
    }

  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
