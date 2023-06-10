import { AxiosError, AxiosResponse } from "axios";
import { ServiceDeskModel } from "../domain/models/ServiceDeskModel";
import { ServiceResult } from "../domain/models/ServiceDeskResult";
import { WaitingTimeModel } from "../domain/models/WaitingTimeModel";
import ApiResponse from "../framework/domain/api/ApiResponse";
import { PublicApiInterface } from "../framework/interface/PublicApiInterface";

export default class ServiceDeskService {
  public async getByCode(code: String): Promise<ApiResponse<ServiceDeskModel> | undefined> {
    try {
      let endpoint = `/ServiceDesk/GetByCode?code=${code}`;

      let response:
        | AxiosResponse<ApiResponse<ServiceDeskModel>, ApiResponse<ServiceDeskModel>>
        | AxiosError<ApiResponse<ServiceDeskModel>> = await PublicApiInterface.get(endpoint);

      if (response instanceof AxiosError<ApiResponse<ServiceDeskModel>>) {
        return response.response!.data;
      }
      return response!.data;
    } catch (error) {
      console.error("ServiceDeskService.getByCode()", error);
    }
  }

  public async getListServices(code: String): Promise<ApiResponse<ServiceResult[]> | undefined> {
    try {
      let endpoint = `/ServiceDesk/ListScheduleServices?institutionId=${code}`;

      let response: AxiosResponse<ApiResponse<ServiceResult[]>> | AxiosError<ApiResponse<ServiceResult[]>> =
        await PublicApiInterface.get(endpoint);

      if (response instanceof AxiosError<ApiResponse<ServiceResult[]>>) {
        return response.response!.data;
      }
      return response!.data;
    } catch (error) {
      console.error("ServiceDeskService.getByCode()", error);
    }
  }

  public async getServiceDeskSchedulingAvailability(code: String): Promise<ApiResponse<any> | undefined> {
    try {
      let endpoint = `/ServiceDesk/GetServiceDeskSchedulingAvailability?serviceDeskId=${code}`;
      let response: AxiosResponse<ApiResponse<any>, ApiResponse<any>> | AxiosError<ApiResponse<any>> =
        await PublicApiInterface.get(endpoint);

      if (response instanceof AxiosError<ApiResponse<any>>) {
        return response.response!.data;
      }
      return response.data;
    } catch (error) {
      console.error("ServiceDeskService.getByCode()", error);
    }
  }

  public async getQueueAverageWaitingTime(serviceDeskId: String): Promise<ApiResponse<WaitingTimeModel> | undefined> {
    try {
      let endpoint = `/ServiceDesk/GetQueueAverageWaitingTime?serviceDeskId=${serviceDeskId}`;
      let response:
        | AxiosResponse<ApiResponse<WaitingTimeModel>, ApiResponse<WaitingTimeModel>>
        | AxiosError<ApiResponse<any>> = await PublicApiInterface.get(endpoint);

      if (response instanceof AxiosError<ApiResponse<WaitingTimeModel>>) {
        return response.response!.data;
      }
      return response.data;
    } catch (error) {
      console.error("ServiceDeskService.getQueueAverageWaitingTime()", error);
    }
  }
}
