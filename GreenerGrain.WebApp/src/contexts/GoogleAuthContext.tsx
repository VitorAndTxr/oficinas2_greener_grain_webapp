import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import React, { ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import AccountService from "../services/AccountService";
import { AuthorizationResponseViewModel } from "../domain/models/AccountApplicationViewModel";

const accountService = new AccountService()

interface GoogleAuthContextProvider {
    children: ReactNode;
}
interface GoogleAuthContextData {
    showUndentifiedUserModal:boolean,
    setShowUndentifiedUserModal: React.Dispatch<SetStateAction<boolean>>
}
const AuthContext = React.createContext({} as GoogleAuthContextData);

export function useGoogleAuthContext() {
    return useContext(AuthContext);
}

export function GoogleAuthContextProvider(props: GoogleAuthContextProvider) {

    const [showUndentifiedUserModal, setShowUndentifiedUserModal] = useState(false)


    useEffect(() => {
        //loginWithGoogle()
    }, [])

    // async function loginWithGoogle(){
    //     try {
            
    //         googleAuthProvider.setCustomParameters({
    //             prompt: 'select_account'
    //           })

    //         getRedirectResult(auth)
    //         .then(
    //             async (result)=>{
    //                 if(result){

    //                     const credential = GoogleAuthProvider.credentialFromResult(result);
    //                     if(credential != null){

    //                         let payload:AuthorizationPayload = {
    //                             login: result.user.email!,
    //                             accessToken:credential.idToken!
    //                         }                           
            
    //                         await handleAuthorization(payload)
            
    //                     }
    //                 }else{
    //                     signInWithRedirect(auth, googleAuthProvider)
    //                 }

    //             }
    //         )

    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    async function handleAuthorization(payload:AuthorizationPayload){
        try {
            let loginResponse = await accountService.authorization(payload)

            if(loginResponse !== undefined){
                
                if(loginResponse.success){
                    handleSuccessfullLogin(loginResponse.result!)
                }
            }
            else{
                setShowUndentifiedUserModal(true)
            }

        } catch (error) {
            throw error
        }
    }

    function handleSuccessfullLogin(data:AuthorizationResponseViewModel) {
        try {
    
            let queryParamToken = `?${String(process.env.REACT_APP_NAME_TOKEN)}=${data.token}`;
            window.location.href= window.location.origin + queryParamToken;
    
        } catch (error) {
            throw error
        }
    }


    return (
        <>
            <AuthContext.Provider
                value={{
                    showUndentifiedUserModal, setShowUndentifiedUserModal
                }}>
                {props.children}
            </AuthContext.Provider>
        </>
    );
}

export interface AuthorizationPayload {
    login: string;
    accessToken?: string;
    password?: string;
}

export enum AuthorizationTypeEnum {
    Google = 3
}