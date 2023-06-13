import React, { useEffect } from "react";
import { ReactNode, useContext, useState } from "react";
import { AccountWalletService } from "../services/AccountWalletService";
import { UnitService } from "../services/UnitService";
import { useAuthContext } from "../framework/auth/AuthContextProvider";
import { ClientStateEnum } from "../domain/enums/ClientStateEnum";
import AuthTokenViewModel from "../framework/domain/viewModel/token/AuthTokenViewModel";
import { UnitViewModel } from "../domain/models/UnitViewModel";
import { BuyTransactionService } from "../services/BuyTransactionService";
import { BuyTransactionPayload } from "../domain/payloads/BuyTransactionPayload";

const  accountWalletService = new AccountWalletService()
const  unitService = new UnitService()
const  buyTransactionService = new BuyTransactionService()




interface ClientContextProvider{
    children: ReactNode;
}

interface ClientContextData{
    saldo:number
    token: AuthTokenViewModel | null
    unit: UnitViewModel

    estado: ClientStateEnum
    setEstado: React.Dispatch<React.SetStateAction<ClientStateEnum>>

    unitCode:string
    setUnitCode: React.Dispatch<React.SetStateAction<string>>

    selectedGrain:string
    setSelectedGrain: React.Dispatch<React.SetStateAction<string>>

    quantity:number
    setQuantity: React.Dispatch<React.SetStateAction<number>>

    getUnitOnlineByCode:()=>void
    createBuyTransaction:()=>void
    getTotalValue:()=> number
}

const ClientContext = React.createContext({} as ClientContextData)

export function useClientContext(){
    return useContext(ClientContext)
}

export function ClientContextProvider({children}: ClientContextProvider){

  
    const {getDecodedToken} = useAuthContext()
    const token = getDecodedToken()

    const [unit, setUnit] = useState<UnitViewModel>({} as any)

    const [selectedGrain, setSelectedGrain] = useState('')
  
    const [estado, setEstado] = useState<ClientStateEnum>(ClientStateEnum.INITIAL)
  
    const [unitCode, setUnitCode] = useState('')
    const [quantity, setQuantity] = useState(0)


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

    function reloadSaldo(){
        accountWalletService.getAccountWallet()
        .then((response)=>{
            if(response?.success){
                setSaldo(response.result.credits)
                setIsLoading(false)
            }
        })
    }

    function clear(){
        setQuantity(0)
        setSelectedGrain('')
    }

    function getUnitOnlineByCode(){
        setIsLoading(true)

        unitService.getUnitByCode(unitCode)
        .then((response)=>{
            if(response?.success){
                setUnit(response.result)
                setEstado(ClientStateEnum.BUY)
                setIsLoading(false)
            }
    
        })
        .catch((response)=>{

        })
    }

    function getTotalValue(){
        if(selectedGrain ==='')
        {
            return 0
        }

        if(quantity==0){
            return 0
        }

        let module = unit.modules.filter(module =>{
           return module.grain.id === selectedGrain
        })[0]

        return (quantity*module.grain.price)/1000
    }

    function createBuyTransaction(){
        let module = unit.modules.filter(
            module =>{
                return module.grain.id === selectedGrain
            }
        )[0]
        console.log(unit);
        

        let payload: BuyTransactionPayload ={
            moduleId:module.id,
            grainId:selectedGrain,
            quantity:quantity
        }

        buyTransactionService.createTransaction(payload)
        .then((response)=>{
            if(response?.success){
                console.log(response);
                reloadSaldo()
                clear()
            }
        })
        .catch((response)=>{
            console.log(response)
        })

    }

    return (
        <>
            <ClientContext.Provider
                value={{
                    saldo,
                    token,
                    unit,

                    quantity, setQuantity,
                    unitCode, setUnitCode,
                    
                    estado, setEstado,

                    selectedGrain, setSelectedGrain,

                    getUnitOnlineByCode,
                    getTotalValue,
                    createBuyTransaction
                }}>
                {
                    !isLoading&&
                    children
                }
            </ClientContext.Provider>
        </>
    );
}