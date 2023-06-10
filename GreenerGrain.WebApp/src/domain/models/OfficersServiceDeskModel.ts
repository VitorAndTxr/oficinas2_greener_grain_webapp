import { ServiceDeskModel } from "./ServiceDeskModel";

export interface OfficersServiceDeskModel {
  virtualQueue: ServiceDeskModel;
  virtualScheduling: ServiceDeskModel;
}
