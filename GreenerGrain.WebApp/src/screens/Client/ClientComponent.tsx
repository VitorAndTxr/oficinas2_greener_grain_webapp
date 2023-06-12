import { Col, Row } from "react-bootstrap";
import { ClientComponentStyles, InputStyles, MenuButtonStyles } from "../Styles";
import { useClientContext } from "../../contexts/ClientContext";
import { ClientStateEnum } from "../../framework/domain/enum/ClientStateEnum";


export function ClientComponent({ }: ClientComponentProps) {

  const {
    saldo, 
    token, 
    estado, 
    unitCode, 
    setUnitCode, 
    setEstado,
    getUnitOnlineByCode
  } = useClientContext();

  return (
    <ClientComponentStyles>
      <Row className="mt-3">
        <Col xs={10} className="mx-auto">
          <h3>
            Bem-Vindo, {token!.name}!
          </h3>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs={10} className="mx-auto">
          <h3>
            Saldo:R${saldo.toFixed(2)}
          </h3>
        </Col>
      </Row>
      {estado === ClientStateEnum.INITIAL &&
        <>
          <Row className="my-5">
            <Col xs='auto' className="mx-auto">
              <MenuButtonStyles>
                Adicionar Créditos
              </MenuButtonStyles>
            </Col>
          </Row>
          <Row>
            <Col xs='auto' className="mx-auto">
              <MenuButtonStyles onClick={() => setEstado(ClientStateEnum.CHOOSE_MODULE)}>
                Comprar
              </MenuButtonStyles>
            </Col>
          </Row>
        </>}
      {estado === ClientStateEnum.CHOOSE_MODULE &&
        <>
          <Row className="my-5">
            <Col xs='auto' className="mx-auto">
              <InputStyles
                onChange={(e: any) => setUnitCode(e.target.value)}
                value={unitCode} />
            </Col>
          </Row>
          <Row>
            <Col xs='auto' className="mx-auto">
              <MenuButtonStyles onClick={()=>{getUnitOnlineByCode()}}>
                Avançar
              </MenuButtonStyles>
            </Col>
          </Row>
        </>}

    </ClientComponentStyles>
  );
}
interface ClientComponentProps {
}
