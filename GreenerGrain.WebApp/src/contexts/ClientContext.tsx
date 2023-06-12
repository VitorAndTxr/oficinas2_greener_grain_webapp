import React, { useEffect } from "react";
import { ReactNode, useContext, useState } from "react";
import { AccountWalletService } from "../services/AccountWalletService";
import { UnitService } from "../services/UnitService";
import { useAuthContext } from "../framework/auth/AuthContextProvider";
import { ClientStateEnum } from "../framework/domain/enum/ClientStateEnum";
import AuthTokenViewModel from "../framework/domain/viewModel/token/AuthTokenViewModel";
import { UnitViewModel } from "../framework/domain/viewModel/UnitViewModel";

const  accountWalletService = new AccountWalletService()
const  unitiService = new UnitService()



interface ClientContextProvider{
    children: ReactNode;
}

interface ClientContextData{
    saldo:number
    token: AuthTokenViewModel | null
    estado: ClientStateEnum
    setEstado: React.Dispatch<React.SetStateAction<ClientStateEnum>>
    unitCode:string
    setUnitCode: React.Dispatch<React.SetStateAction<string>>
    getUnitOnlineByCode:()=>void
}

const ClientContext = React.createContext({} as ClientContextData)

export function useClientContext(){
    return useContext(ClientContext)
}

export function ClientContextProvider({children}: ClientContextProvider){

  
    const {getDecodedToken} = useAuthContext()
    const token = getDecodedToken()

    const [unit, setUnit] = useState<UnitViewModel>({} as any)
  
    const [estado, setEstado] = useState<ClientStateEnum>(ClientStateEnum.INITIAL)
  
    const [unitCode, setUnitCode] = useState('')

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

    function getUnitOnlineByCode(){
        setIsLoading(true)

        unitiService.getUnitByCode(unitCode)
        .then((response)=>{
            if(response?.success){

            }
            console.log(response);     
        })
        .catch((response)=>{

        })
    }

    return (
        <>
            <ClientContext.Provider
                value={{
                    saldo,
                    token,
                    unitCode, setUnitCode,
                    estado, setEstado,

                    getUnitOnlineByCode
                }}>
                {
                    !isLoading&&
                    children
                }
            </ClientContext.Provider>
        </>
    );
}