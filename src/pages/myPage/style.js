import styled from "styled-components";
import { flexCenterColumn } from "../../global/common";

const S = {};

S.Container = styled.div`

    width: 100%;
    height: 256px;
    margin-bottom: 20px;
    border: 3px solid #C4D7FF;
    border-radius: 20px;
    margin-top : 10px;

    & p{
        width: 100%;
        height: 43px;
        margin-top: 20px;
        border-radius: 15px;
        border-bottom: 2px solid #D1E9F6;

        & .icon{
            margin-right: 10px;
            color: #C4D7FF;
        }
    }

   

`
S.Span = styled.span`
    margin-left: 20px;
    

`
S.NameSpan = styled.span`
    font-size: 20px;
    margin-left: 20px;

    

`
S.LogoutButton = styled.button`
  margin-left: 100px;
  border: none;
  background-color: white;
`

S.MainP = styled.p`
    font-size: 20px;
`
S.Wrapper = styled.div`
    ${flexCenterColumn}
    margin-bottom: 20px;
`

S.Label = styled.label`
    display: block;
    width: 200px;
    height: 200px;
`

S.Profile = styled.img`
    display: block;
    width: 200px;
    height: 200px;
    background-color: #d9d9d9;
    overflow: hidden;
    border-radius: 50%;
`

S.Button = styled.button`
    cursor: pointer;
    width: 200px;
    height: 30px;
    border-radius: 30px;
    margin-top: 5px;
    background-color: #96C9F4;
    border: none;
    color: white;
`

export default S;