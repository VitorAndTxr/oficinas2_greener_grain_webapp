import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { LoginScreenStyles, LoginFormStyles, MenuButtonStyles, ModalButtonStyles } from "../Styles";
import { useState } from "react";
import AccountService from "../../services/AccountService";
import { AuthorizationPayload } from "../../contexts/GoogleAuthContext";
import { Buffer } from "buffer";
import { AuthorizationResponseViewModel } from "../../domain/models/AccountApplicationViewModel";
import PageLoader from "../../framework/components/Common/PageLoader";

const accountService = new AccountService();

export function LoginScreen({ }: LoginScreenProps) {

  const [login,setLogin] = useState('')
  const [pass,setPass] = useState('')
  const [showFailLoginModal,setShowFailLoginModal] = useState(false)
  const [isLoading,setIsloading] = useState(false)



  function onSubmit(e:any){
    setIsloading(true)
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

        }else{
          setShowFailLoginModal(true)
        }        
        setIsloading(false)

      }
    )
    .catch(
      ()=>{
        setShowFailLoginModal(true)
        setIsloading(false)

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
      {
        isLoading&&
        <PageLoader
          spinnerColor={String(process.env.REACT_APP_MAIN_COLOR)} />

      } 
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
                <MenuButtonStyles disabled={(pass.length==0||login.length == 0 )} variant="primary" onClick={(e:any) => { onSubmit(e)}}>
                  Entrar
                </MenuButtonStyles>
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
    <FailedLoginModal
      showModal={showFailLoginModal}
      closeModal={()=>setShowFailLoginModal(false)}
    />
    </LoginScreenStyles>
  );
}

interface LoginScreenProps {
}

export function FailedLoginModal({showModal,closeModal}:FailedLoginModalProps){
  return(
    <Modal show={showModal} centered>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Acesso Negado</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>As credenciais fornecidas não são válid</p>
        </Modal.Body>

        <Modal.Footer>
          <ModalButtonStyles onClick={()=>closeModal()}>
            Tentar Novamente
          </ModalButtonStyles>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

interface FailedLoginModalProps{
  showModal:boolean,
  closeModal:()=>void
}


