import { Container } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import styled from "styled-components";
import { useState } from "react";
import { ClientContextProvider } from "../../contexts/ClientContext";
import { useAuthContext } from "../../framework/auth/AuthContextProvider";
import { AccountWalletService } from "../../services/AccountWalletService";
import { ClientComponent } from "./ClientComponent";



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


