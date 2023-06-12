import { AxiosResponse } from "axios";
import ApiResponse from "../framework/domain/api/ApiResponse";
import ApiInterface from "../framework/interface/ApiInterface";
import { UnitViewModel } from "../framework/domain/viewModel/UnitViewModel";


export class UnitService {
    public async getUnitByCode(code: string): Promise<ApiResponse<UnitViewModel> | undefined> {
        try {
            let endpoint = `/Unit/` + code;
            let response: AxiosResponse<ApiResponse<UnitViewModel>> = await ApiInterface.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

