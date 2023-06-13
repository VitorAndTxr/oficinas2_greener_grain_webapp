import  React, { createContext, useContext, useEffect, useState } from "react";
import PageLoader from '../components/Common/PageLoader';
import AuthTokenViewModel from "../domain/viewModel/token/AuthTokenViewModel";
import { AuthContextData } from "./AuthContextData";
import { AuthContextProviderProps } from "./AuthContextProviderProps";
import TokenService from './TokenService';

const tokenService = TokenService.getInstance();

const AuthContext: React.Context<AuthContextData>  = createContext({} as AuthContextData);

export function useAuthContext() {
  return useContext(AuthContext);
}

const  AuthContextProvider: React.FC<AuthContextProviderProps>  = ({ children, waitAuthentication }) =>{

  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    loadAuthContext();
  }, []);
 
  function loadAuthContext() {

    let token = tokenService.getToken();
    console.log('token',token);
    
    if (token === null) {
      let query = new URLSearchParams(window.location.search).get(String(process.env.REACT_APP_NAME_TOKEN));
      console.log('query',query);

      if (query !== null && query !== "") {

        tokenService.setToken(query);
        tokenService.refreshToken(true);

      } else if(waitAuthentication){
        window.location.href = process.env.REACT_APP_LOGIN_REDIRECT!;
      }else{
        setIsAuthenticating(false);

      }
    }
    else {
      tokenService.refreshToken().then(
        () => {
          setIsAuthenticating(false);
        }
      );
    };
  }

  function getDecodedToken(): AuthTokenViewModel |null {
    return tokenService.getDecodedToken()
  }

  function getInstitutionId(): string {
    return tokenService.getInstitutionId()
  }

  function getToken(): string|null {
    return tokenService.getToken()
  }

  function userHasProfile(profileCode: string) : boolean{
    return tokenService.userHasProfile(profileCode)
  }

  function logout() {
    tokenService.removeToken()
  }
  function extractUserProfilesFromToken(decodedToken: AuthTokenViewModel | null){
    return tokenService.extractUserProfilesFromToken(decodedToken);
  }
  return (
    <AuthContext.Provider
      value={{
        logout,
        isAuthenticating,
        getDecodedToken,
        getInstitutionId,
        getToken,
        userHasProfile,
        extractUserProfilesFromToken
      }}
    >
      {(isAuthenticating&&waitAuthentication) ?
        (
          <PageLoader
            spinnerColor={String(process.env.REACT_APP_MAIN_COLOR)} />
        )
        :
        (
          children
        )}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext}


