import { Button, Container, Form } from "react-bootstrap";
import styled from "styled-components";


export const LoginScreenStyles = styled(Container)`
  min-height:100vh;
  background-color: #E5D1B7;
  h1{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 45px;
    line-height: 54px;
    text-align: center;

    color: #4F6D31;
  }
`;
export const InputStyles = styled(Form.Control)`
  background: #F8F8F8;
  box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 271px;
  height: 64px;
`;
export const LoginFormStyles = styled(Form)`
  input{
    background: #F8F8F8;
    box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    width: 271px;
    height: 64px;
  }
  label{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    text-align: center;

    color: #4D6930;
  }
  button{
    width: 176px;
    height: 72px;
  }
`;

export const ButtonStyles = styled(Button)`
    background: #4F6D30;


    border-radius: 10px;
    box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    text-align: center;

    color: #FFFFFF;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border:none!important;
    :hover{
      background: #384d23;

    }
    :active{
      background: #384d23;

    }
`;
