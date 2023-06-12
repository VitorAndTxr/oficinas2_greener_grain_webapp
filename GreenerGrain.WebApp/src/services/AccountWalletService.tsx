import { AxiosResponse } from "axios";
import ApiResponse from "../framework/domain/api/ApiResponse";
import ApiInterface from "../framework/interface/ApiInterface";
import { AccountWalletViewModel } from "../framework/domain/viewModel/AccountWalletViewModel";


export class AccountWalletService {
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


