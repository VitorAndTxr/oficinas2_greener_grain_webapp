import { Col, Form, Row } from "react-bootstrap";
import { LoginScreenStyles, LoginFormStyles, ButtonStyles } from "../Styles";
import { useState } from "react";
import AccountService from "../../services/AccountService";
import { AuthorizationPayload } from "../../contexts/GoogleAuthContext";
import { Buffer } from "buffer";
import { AuthorizationResponseViewModel } from "../../domain/models/AccountApplicationViewModel";

const accountService = new AccountService();

export function LoginScreen({ }: LoginScreenProps) {

  const [login,setLogin] = useState('')
  const [pass,setPass] = useState('')

  function onSubmit(e:any){
    let encodedPass = Buffer.from(pass).toString('base64');
    var authPayload:AuthorizationPayload ={
      login:login,
      password:encodedPass
    } 
    accountService.authorization(authPayload)
    .then(
      (response)=>{
        if(response!.success){
          handleSuccessfullLogin(response!.result)
        }
        console.log(response);
        
      }
    )

    function handleSuccessfullLogin(data:AuthorizationResponseViewModel) {
      try {
  
          let queryParamToken = `?${String(process.env.REACT_APP_NAME_TOKEN)}=${data.token}`;
          window.location.href= window.location.origin + queryParamToken;
  
      } catch (error) {
          throw error
      }
  }
  }
  return (
    <LoginScreenStyles fluid={true}>
      <Row>
        <Col xs={'auto'} className="mx-auto logo">
          <img src={"/logo.png"} />
        </Col>
      </Row>
      <Row>
        <Col xs={'auto'} className="mx-auto text-center">
          <h1>
            Greener <br />
            Grain
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={'auto'} className="mx-auto">
          <LoginFormStyles >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control id='login-input' onChange={(e:any)=>setLogin(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control id='pass-input' type="password" onChange={(e:any)=>setPass(e.target.value)}/>
            </Form.Group>
            <Row>
              <Col xs='auto' className="mx-auto">
                <ButtonStyles variant="primary" onClick={(e:any) => { onSubmit(e)}}>
                  Entrar
                </ButtonStyles>
              </Col>
            </Row>
          </LoginFormStyles>
        </Col>
      </Row>
      <Row>
        <Col xs={'auto'} className="mx-auto">
        </Col>
      </Row>
      <Row>
        <Col xs={'auto'} className="mx-auto">
        </Col>
      </Row>
    </LoginScreenStyles>
  );
}
interface LoginScreenProps {
}


