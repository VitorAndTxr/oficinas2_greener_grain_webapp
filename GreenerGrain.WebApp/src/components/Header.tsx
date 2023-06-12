import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { useAuthContext } from "../framework/auth/AuthContextProvider";


export function Header({ text }: HeaderProps) {
  const {logout} =  useAuthContext()

  return (
    <HeaderStyles>
      <Container className="my-3">
        <Row>
          <Col xs='auto'>
            <img src={"/logo.png"} />
          </Col>
          <Col className="my-auto">
            <span>
              {text}
            </span>
          </Col>
          <Col xs='auto' className="my-auto">
              <i onClick={()=>logout()} className="bi bi-box-arrow-right" />
          </Col>
        </Row>
      </Container>
    </HeaderStyles>
  );

}
interface HeaderProps {
  text: string;
}
const HeaderStyles = styled.header`
  span{
    font-family: 'Inter',sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    text-align: center;

    color: #4F6D31;
  }
  img{
    width: 49px;
    height: 70px;

    background: url(logo-removebg-preview.png);
  }
  i{
    font-family: 'Inter',sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    text-align: center;

    color: #4F6D31;
  }
`;
