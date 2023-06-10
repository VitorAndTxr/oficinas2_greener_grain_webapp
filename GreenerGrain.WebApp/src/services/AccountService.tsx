import { AxiosResponse } from "axios";
import { AuthorizationPayload } from "../contexts/GoogleAuthContext";
import ApiPaginatedResponse from "../framework/domain/api/ApiPaginatedResponse";
import ApiResponse from "../framework/domain/api/ApiResponse";
import AccountInterface from "../framework/interface/AccountInterface";
import { AccountApplicationViewModel, AuthorizationResponseViewModel } from "../domain/models/AccountApplicationViewModel";



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


