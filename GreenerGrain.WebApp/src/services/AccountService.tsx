import { AxiosResponse } from "axios";
import { AuthorizationPayload } from "../contexts/GoogleAuthContext";
import ApiPaginatedResponse from "../framework/domain/api/ApiPaginatedResponse";
import ApiResponse from "../framework/domain/api/ApiResponse";
import AccountInterface from "../framework/interface/AccountInterface";
import { AccountApplicationViewModel, AuthorizationResponseViewModel } from "../domain/models/AccountApplicationViewModel";
import ApiInterface from "../framework/interface/ApiInterface";



export default class AccountService {
    public async getApplications(): Promise<ApiPaginatedResponse<AccountApplicationViewModel> | undefined> {
        try {
            let endpoint = `/Application/GetApplicationsAvailableLogin`;
            let response: AxiosResponse<ApiPaginatedResponse<AccountApplicationViewModel>> = await AccountInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    public async authorization(data: AuthorizationPayload): Promise<ApiResponse<AuthorizationResponseViewModel> | undefined> {
        try {
            let endpoint = `/Account/Authorization`;
            let response = await AccountInterface.post(endpoint, data);

            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export class AccountWalletService{
    public async getAccountWallet(): Promise<ApiResponse<AccountWalletViewModel> | undefined> {
        try {
            let endpoint = `/AccountWallet`;
            let response: AxiosResponse<ApiResponse<AccountWalletViewModel>> = await ApiInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}


interface AccountWalletViewModel{
    credits:number
}


