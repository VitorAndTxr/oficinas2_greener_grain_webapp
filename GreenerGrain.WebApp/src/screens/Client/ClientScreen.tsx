import { Col, Container, Row } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import styled from "styled-components";
import { ButtonStyles } from "../Styles";
import { useState } from "react";
import { ClientContextProvider, useClientContext } from "../../contexts/ClientContext";
import { useAuthContext } from "../../framework/auth/AuthContextProvider";
import { AccountWalletService } from "../../services/AccountService";



export function ClientScreen({ }: ClientScreenProps) {
  return (
    <Layout
      text="Área do Cliente">
      <ClientContextProvider>
        <ClientComponent/>
      </ClientContextProvider>
    </Layout>
  );
}
interface ClientScreenProps {
}

enum ClientStateEnum{
  INITIAL,
  CHOOSE_MODULE,
  BUY
}

export function ClientComponent({ }: ClientComponentProps) {

  const {getDecodedToken} = useAuthContext()
  const {saldo} = useClientContext()


  const token = getDecodedToken()

  const [estado, setEstado] = useState<ClientStateEnum>(ClientStateEnum.INITIAL)
  return (
    <ClientComponentStyles>
      <Row>
        <Col>
          <h3>
            Bem-Vindo, {token!.name}!
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>
            Saldo:{saldo}R$
          </h3>
        </Col>
      </Row>
      {
        estado===ClientStateEnum.INITIAL&&
        <>
          <Row>
            <Col>
              <ButtonStyles>
                Adicionar Créditos
              </ButtonStyles>
            </Col>
          </Row>
          <Row>
            <Col>
              <ButtonStyles>
                Comprar
              </ButtonStyles>
            </Col>
          </Row>
        </>
      }

    </ClientComponentStyles>
  );
}

interface ClientComponentProps {
}

const ClientComponentStyles = styled(Container)`

`
