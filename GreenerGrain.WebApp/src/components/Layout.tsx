import styled from "styled-components";
import { ReactNode } from "react";
import { Header } from "./Header";


export function Layout({ children, text }: LayoutProps) {

  return (
    <>
      <Wrapper>
        <Header text={text} />
        {children}
      </Wrapper>
    </>
  );

}
interface LayoutProps {
  children: ReactNode;
  text: string;
}

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #E5D1B7;

`;
