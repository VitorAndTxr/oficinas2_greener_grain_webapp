import { Col, Row } from "react-bootstrap";
import { ClientComponentStyles, InputStyles, MenuButtonStyles, QuantityInputStyles } from "../Styles";
import { useClientContext } from "../../contexts/ClientContext";
import { ClientStateEnum } from "../../domain/enums/ClientStateEnum";


export function ClientComponent({ }: ClientComponentProps) {

  const {
    saldo, 
    token, 
    estado, 
    unitCode, 
    unit,
    setUnitCode, 
    setEstado,
    getUnitOnlineByCode,
    quantity, setQuantity,
    selectedGrain, setSelectedGrain,
    createBuyTransaction,
    getTotalValue
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
        {estado === ClientStateEnum.BUY &&
          <Row className="my-5">
            <Col xs='auto' className="mx-auto">
              <Row>
                <Col>
                  <h3>
                    Selecione um dos grãos disponíveis:
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col className={"grain-selector px-3 mx-2"}>
                  {
                    unit.modules.sort((a, b) => a.order - b.order).map((module)=>{
                      return(
                        <Row onClick={()=>setSelectedGrain(module.grain.id)} className={"my-2 py-3 "+(selectedGrain === module.grain.id?'selected':'')}>
                          <Col xs='auto'>
                            <img src={module.grain.imageUrl}/>
                          </Col>
                          <Col className="my-auto">
                            <h3>
                              {module.grain.name}
                            </h3>
                          </Col>
                          <Col xs='auto' className="my-auto">
                            <h3>
                              {module.grain.price.toFixed(2)} R$/Kg
                            </h3>
                          </Col>
                        </Row>
                      ) 
                    })
                  }
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs={4} className="my-auto">
                  <h3>
                    Quantidade em gramas:
                  </h3>
                </Col>
                <Col>
                  <QuantityInputStyles
                    onChange={(e:any)=>setQuantity(e.target.value)}
                    value={quantity}
                    type="number"
                  />  
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>
                    Valor Total
                  </h3>
                </Col>
                <Col>
                  <h1>
                    {
                      (getTotalValue().toFixed(2))
                    }R$
                  </h1>
                </Col>
                
              </Row>
              <Row>
                <Col>
                  <MenuButtonStyles 
                    disabled={quantity<100||getTotalValue()<1} onClick={()=>{createBuyTransaction()}}>
                    Avançar
                  </MenuButtonStyles>
                </Col>
              </Row>
            </Col>
          </Row>
        }

    </ClientComponentStyles>
  );
}
interface ClientComponentProps {
}
