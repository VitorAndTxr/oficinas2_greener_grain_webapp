import { AxiosResponse } from "axios";
import ApiResponse from "../framework/domain/api/ApiResponse";
import ApiInterface from "../framework/interface/ApiInterface";
import { AccountWalletViewModel } from "../domain/models/AccountWalletViewModel";
import { BuyTransactionPayload } from "../domain/payloads/BuyTransactionPayload";


export class BuyTransactionService {
    public async createTransaction(payload: BuyTransactionPayload): Promise<ApiResponse<AccountWalletViewModel> | undefined> {
        try {
            let endpoint = `/BuyTransaction`;
            let response: AxiosResponse<ApiResponse<AccountWalletViewModel>> = await ApiInterface.post(endpoint, payload);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

