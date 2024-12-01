import React from 'react';
import { Link } from 'react-router-dom';
import S from './style';
import BasicButton from '../../components/button/BasicButton';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from '../../modules/user';
const Main = () => {
    const isLogin = useSelector((state) => state.user.isLogin);
    console.log(isLogin)

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setUser({}))
        dispatch(setUserStatus(false))
        // return (
        //     <Navigate to={"/"} replace={true} />
        // )
    }

    return (
        <S.Wrapper> 
            <S.ImageWrapper>
                <img src={process.env.PUBLIC_URL + "/images/main/icon.jpg"} alt="todo" />
            </S.ImageWrapper>
            {!isLogin && <S.ButtonWrapper>
                <Link to={"/signIn"}>
                    <BasicButton size={"full"} shape={"small"} variant={"blue"} color={"white"}>Sign In</BasicButton>
                </Link>
                <Link to={"/signUp"}>
                    <BasicButton size={"full"} shape={"small"} variant={"blue"} color={"white"}>Sign Up</BasicButton>
                </Link>
            </S.ButtonWrapper>}
            {isLogin && <S.ButtonWrapper>
              
                <Link to={"/"}>
                    <BasicButton onClick={logout} size={"full"} shape={"small"} variant={"blue"} color={"white"}>Logout</BasicButton>
                </Link>
            </S.ButtonWrapper>}

        </S.Wrapper>
    );
};

export default Main;