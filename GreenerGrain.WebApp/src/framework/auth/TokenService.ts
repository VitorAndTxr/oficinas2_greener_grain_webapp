import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { AxiosResponse } from 'axios';
import AccountInterface from '../interface/AccountInterface';
import AuthTokenViewModel from '../domain/viewModel/token/AuthTokenViewModel';
import ApplicationViewModel from '../domain/viewModel/token/ApplicationViewModel';
import ApiResponse from '../domain/api/ApiResponse';
import { RefreshTokenResponseViewModel } from '../domain/viewModel/token/RefreshTokenResponseViewModel';
import ProfileViewModel from "../domain/viewModel/token/ProfileViewModel";

const cookies = new Cookies();

class TokenService {
    private static instance: TokenService;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }

        return TokenService.instance;
    }

    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    isTeams = (): boolean => {
        try {
            return window.location.ancestorOrigins[0] === "https://teams.microsoft.com";
        } catch (error) {
            console.error("error at BrainzTokenService.isTeams():",error)
        }
        return false;
    } 

    setToken = (query: string) => {
        try {
            
            
            if (this.isTeams()) {
                window.localStorage.setItem(String(process.env.REACT_APP_NAME_TOKEN), query);
            } else {
                if(String(process.env.REACT_APP_DOMAIN)===""){
                    cookies.set(String(process.env.REACT_APP_NAME_TOKEN), query);

                }else{
                    cookies.set(String(process.env.REACT_APP_NAME_TOKEN), query, { domain: String(process.env.REACT_APP_DOMAIN), path: "/", secure: true, sameSite: "strict" });
                }
            }
        } catch (error) {
            console.error("error at TokenService.setToken():",error);
            
        }
        
    };

    getToken = (): string|null => {
        try {
            if (this.isTeams()) {
                return window.localStorage.getItem(String(process.env.REACT_APP_NAME_TOKEN))
            } else {
                let token =  cookies.get<string>(String(process.env.REACT_APP_NAME_TOKEN))
                if(token !== undefined)
                    return token
            }
        } catch (error) {
            console.error("error at TokenService.getToken():",error);
        }
        return null
    };

    getDecodedToken(): AuthTokenViewModel|null {
        try {

            let stringToken = this.getToken()
            
            if(stringToken!== null){
                let token = jwt_decode<AuthTokenViewModel>(stringToken);
                return token;
            }
        } catch (error) {
            console.error("error at TokenService.getDecodedToken():",error);
        }
        return null
    }

    getInstitutionId(): string {
        try {
            let decodedToken = this.getDecodedToken()
            if(decodedToken!== null)
                return decodedToken.institutionId;
        } catch (error) {
            console.error("error at TokenService.getInstitutionId():",error);
        }
        return ''
    }

    removeToken() {
        try {
            if (this.isTeams()) {
                window.localStorage.removeItem(String(process.env.REACT_APP_NAME_TOKEN));
                window.location.pathname = "/userDefaultTeams";
            } else {
                cookies.remove(String(process.env.REACT_APP_NAME_TOKEN), { path: "/", domain: process.env.REACT_APP_DOMAIN });
                cookies.remove(String(process.env.REACT_APP_NAME_TOKEN));
    
                window.location.href = process.env.REACT_APP_LOGIN_REDIRECT!;
            }
        } catch (error) {
            console.error("error at TokenService.removeToken():",error);
        }
    }

    async refreshToken(firstAccess:boolean = false):Promise<void>{
        try {        

            if(firstAccess){
                
                let response = await AccountInterface.get("/Account/Authorization/RefreshToken") as AxiosResponse<ApiResponse<RefreshTokenResponseViewModel>>
                
                this.setToken(response.data.result.token)

                window.location.href = window.location.origin

                return 
            }

            let decodedToken = this.getDecodedToken()
            if(decodedToken!== null){

                let remainingSeconds = decodedToken.exp - Date.now() / 1000;
    
                if((remainingSeconds < 0)){
                    this.removeToken()
                    return
                }else{
                    let profiles: ProfileViewModel[] = JSON.parse(decodedToken.profiles)
                    if(profiles.length == 0){
                        this.removeToken()
                        return    
                    }
                    let response = await AccountInterface.get("/Account/Authorization/RefreshToken") as AxiosResponse<ApiResponse<RefreshTokenResponseViewModel>>
                    this.setToken(response.data.result.token)
    
                }
            }else{
                console.log("TokenService.refreshToken(): There is no token to be refreshed");   
            }

        } catch (error) {
            console.error("error at TokenService.refreshToken():",error);   
        }
    }

    userHasProfile(profileCode: string) : boolean{

        let decodedToken = this.getDecodedToken()
    
        if (!decodedToken || !decodedToken.profiles?.length) {
            return false;
        }
        
        let profiles = this.extractUserProfilesFromToken(decodedToken);
        
        if (!Array.isArray(profiles)) {    
            return false;
        }
    
        const userProfile = profiles.filter(profile => {
            return profile.Code === profileCode;
        });   
        
        return userProfile.length>0;
    }
    
    extractUserProfilesFromToken(decodedToken: AuthTokenViewModel | null): ProfileViewModel[]{   
        let profiles: ProfileViewModel[] = JSON.parse(decodedToken!.profiles);    
        
        return profiles;
    }
      
}


export default TokenService 


