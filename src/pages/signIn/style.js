import styled from "styled-components";
import { flexCenterColumn } from './../../global/common';

const S = {};

     S.SignUpWrapper = styled.div`
        ${flexCenterColumn}
        height: 600px;
     `

     S.Title = styled.p`
     
        font-size:  16px;
        color: #0077b6;
        font-weight: 600;
        margin: 0 0 12px 0;
     
     `
     S.ConfirmMessage = styled.p`
        font-size: 12px;
        color: #FF0000;
        padding-top: 10px;
     
     `

     S.Label = styled.label`
        display: block;
        width: 100%;
        margin: 0 0  30px 0;
     `
     S.Form = styled.form`

        width: 100%;
        height: 100%;
     
     `
     S.DivGoogle = styled.div`
      position: relative;
      width: 370px;
      height: 49.33px;
      aspect-ratio: 8 / 1;
      padding: 16px 0;
      border-radius: 10px;
      background-color: white;
      border: 1px solid black;
      margin-top: 10px;
      text-align: center;
      
      & a {
         text-decoration: none;
         font-weight: 600;
         color: black;
         font-size: 14px;
         & img.google{
            position: absolute;
            top: 1px;
            left: 112px;
            width: 50px;
         }
         
      }


     
     `
     S.DivNaver = styled.div`
      position: relative;
      width: 370px;
      height: 49.33px;
      aspect-ratio: 8 / 1;
      padding: 16px 0;
      border-radius: 10px;
      background-color: #03c75a;
      margin-top: 10px;
      text-align: center;
      
      & a {
         text-decoration: none;
         font-weight: 600;
         color: white;
         font-size: 14px;
    
         & img.naver{
            position: absolute;
            top: 0px;
            left: 113px;
            width: 48px;
            border-radius: 10px;
         }
         
         
      }


     
     `

export default S;