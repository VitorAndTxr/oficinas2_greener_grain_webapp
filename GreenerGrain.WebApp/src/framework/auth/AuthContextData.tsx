import ApplicationViewModel from "../domain/viewModel/token/ApplicationViewModel"
import AuthTokenViewModel from "../domain/viewModel/token/AuthTokenViewModel"
import ProfileViewModel from "../domain/viewModel/token/ProfileViewModel"

export interface AuthContextData {
    logout:()=> void
    isAuthenticating:boolean
    getDecodedToken:()=> AuthTokenViewModel |null
    getInstitutionId:()=> string
    getToken:()=> string|null
    userHasProfile:(profileCode: string) => boolean
    extractUserProfilesFromToken:(decodedToken: AuthTokenViewModel | null) => ProfileViewModel[]
}
