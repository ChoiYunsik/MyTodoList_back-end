import styled from "styled-components";
import { flexCenter } from './../../global/common';

const S = {};

    S.BackGround = styled.div`
        width: 100%;
        height: 100vh;
        background-color : #f5f5f5;
        display: flex;
        justify-content: center;
        ${flexCenter}
    `
    S.Wrapper = styled.div`
        width : 430px;
        height : 800px;
        background-color : #fff;
        display: flex;
        flex-direction: column;
        padding: 0 30px;
    `
    S.Header = styled.header`
        width : 100%;
        height: 100px;
        display: flex;
        align-items : center;

        & a {
            font-size: 24px;
            font-weight: 600;
            display: block;
            color: #357DED !important;
        }

        
    `
    S.Nav = styled.nav`
     width : 100%;
        height: 100px;
        display : flex;
        align-items: center;
        justify-content : space-between;

        & a {
            font-size : 16px;
            text-align: center;

            & p {
                color: #357DED;
            }
            .icon {
                color: #357DED;
            }

        }
        & .active {
            & p {
                color : #102C57 !important;
            }
            & path {
                color : #102C57 !important;
            }
        }

    `
    S.Main  = styled.main`
        flex: 1;
    `



export default S;