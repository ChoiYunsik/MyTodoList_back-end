import { faBell, faCreditCard, faHouse, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, Outlet, NavLink, useLocation } from 'react-router-dom';
import S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setPreviousUrl } from '../../modules/user';

const AdminLayout = () => {

    const currentUser = useSelector((state)=> state.user.currentUser);
    const {name} = currentUser;
    return (
        <S.BackGround>
            <S.Wrapper>
                <S.Header>
                    <Link to={"/"}><span style={{color : "#87A2FF"}}>{name}</span>'s Todo List</Link>
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
                        <FontAwesomeIcon icon={faBell} className='icon' />
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

export default AdminLayout;