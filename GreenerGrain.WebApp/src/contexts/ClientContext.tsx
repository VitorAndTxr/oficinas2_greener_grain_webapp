import React, { useEffect } from "react";
import { ReactNode, useContext, useState } from "react";
import { AccountWalletService } from "../services/AccountService";

const  accountWalletService = new AccountWalletService()


interface ClientContextProvider{
    children: ReactNode;
}

interface ClientContextData{
    saldo:number
}

const ClientContext = React.createContext({} as ClientContextData)

export function useClientContext(){
    return useContext(ClientContext)
}

export function ClientContextProvider({children}: ClientContextProvider){

    const [isLoading, setIsLoading] = useState(true)

    const[saldo , setSaldo] = useState(0.0)

    useEffect(()=>{
        accountWalletService.getAccountWallet()
        .then((response)=>{
            if(response?.success){
                setSaldo(response.result.credits)
                setIsLoading(false)
            }
        })
    },[])

    return (
        <>
            <ClientContext.Provider
                value={{
                    saldo
                }}>
                {
                    !isLoading&&
                    children
                }
            </ClientContext.Provider>
        </>
    );
}