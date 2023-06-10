import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";


export function Header({ text }: HeaderProps) {

  return (
    <HeaderStyles>
      <Container>
        <Row>
          <Col xs='auto'>
            <img src={"/logo.png"} />
          </Col>
          <Col>
            <h1>
              {text}
            </h1>
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
  h1{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    text-align: center;

    color: #4F6D31;
  }
  img{
    width: 49px;
    height: 49px;

    background: url(logo-removebg-preview.png);
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
