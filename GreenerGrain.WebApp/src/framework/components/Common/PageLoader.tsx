import styled from "styled-components"
import { TailSpin } from "react-loader-spinner";
import {Col, Container, Row} from "react-bootstrap"
import React from "react";

interface PageLoaderProps{
    spinnerColor:string
}

export default function PageLoader(props:PageLoaderProps){
    return(
        <PageLoaderStyles fluid={true}>
            <Row className="my-auto w-100">
                <Col xs="auto" className="mx-auto">
                    <TailSpin
                        color={props.spinnerColor}
                        height={100}
                        width={100}
                    />
                </Col>
            </Row>
        </PageLoaderStyles>
    )
}

const PageLoaderStyles = styled(Container)`
    position: absolute;
    top: 0px;
    z-index: 1000;
    min-width: 100vw;
    height: 100vh;
    background-color: #c0b9b0;
    display: flex;
    align-items: center; 
`