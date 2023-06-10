import { OfficerPauseModel } from "./OfficerPauseModel";
import { OfficerHourModel } from "./OfficerHourModel";
import { ServiceDeskModel } from "./ServiceDeskModel";

export interface ServiceDeskOfficerModel {
  id: string;
  serviceDeskId: string;
  officerId: string;
  serviceDesk: ServiceDeskModel;
  officerPauses: OfficerPauseModel[];
  officerHours: OfficerHourModel[];
}
