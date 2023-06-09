import { Button, Container, Form } from "react-bootstrap";
import styled from "styled-components";


export const LoginScreenStyles = styled(Container)`
  min-height:100vh;
  background-color: #E5D1B7;
  h1{
    font-family: 'Inter', sans-serif;
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
    font-family: 'Inter', sans-serif;
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

export const PrimaryGreenButtonStyles = styled(Button)`
    background: #4F6D30;
    border-radius: 10px;
    box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border:none!important;
    :hover{
      background: #384d23;

    }
    :active{
      background: #719051;

    }
    &:disabled{
      background: #719051!important;
    }
`

export const MenuButtonStyles = styled(PrimaryGreenButtonStyles)`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
    text-align: center;
`;

export const ModalButtonStyles = styled(PrimaryGreenButtonStyles)`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
`;

export const ClientComponentStyles = styled(Container)`
  button{
    width: 70vmin;
    height: 72px;
  }
  h3{
    font-family: 'Inter',sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;

    color: #4D6930;
  }
  h1{
    font-family: 'Inter',sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    text-align: center;

    color: #4F6D31;
  }
  .grain-selector{
    background: #F8F8F8;
    box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    img{
      max-width:25vmin;
      max-height:20vmin;

    }
      .selected{
        background: #D9D9D9;
      }
  }
`

export const QuantityInputStyles = styled(InputStyles)`
  background: #F8F8F8;
  box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: auto;
  height: 64px;
`;
