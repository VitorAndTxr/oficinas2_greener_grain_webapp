import ApplicationViewModel from "../domain/viewModel/token/ApplicationViewModel"
import AuthTokenViewModel from "../domain/viewModel/token/AuthTokenViewModel"

export interface AuthContextData {
    logout:()=> void
    isAuthenticating:boolean
    getDecodedToken:()=> AuthTokenViewModel |null
    getInstitutionId:()=> string
    getToken:()=> string|null
    userHasProfile:(profileCode: string) => boolean
}
