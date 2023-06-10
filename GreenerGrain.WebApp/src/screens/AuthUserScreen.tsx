import { useAuthContext } from "../framework/auth/AuthContextProvider";
import { useEffect, useState } from "react";
import AuthTokenViewModel from "../framework/domain/viewModel/token/AuthTokenViewModel";
import ProfileViewModel from "../framework/domain/viewModel/token/ProfileViewModel";
import { ClientScreen } from "./Client/ClientScreen";


export function AuthUserScreen({ }: AuthUserScreenProps) {
  const {getDecodedToken, extractUserProfilesFromToken} =  useAuthContext()

  const [token, setToken] = useState<AuthTokenViewModel | null>(null);

  const [profiles, setProfiles] = useState<ProfileViewModel[] | null>(null);


  useEffect(()=>{ 
    let token = getDecodedToken()
    setToken(token)

    let profiles = extractUserProfilesFromToken(token)
    setProfiles(profiles)
  },[])

  function isAdmin():boolean{
    let adminProfile = profiles?.filter(x => x.Code ==='admin')
    if(adminProfile!== undefined){
      if(adminProfile!.length>0){
        return true
      }
    }
    return false

  }
  return (
    <>
      {
        isAdmin()?
        <>
        Admin
        </>
        :
        <ClientScreen/>
      }
    </>

  );
}
interface AuthUserScreenProps {
}




