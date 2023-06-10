import { ServiceDeskTypeEnum } from "../enums/ServiceDeskTypeEnum";

export interface ServiceDeskModel {
  id: string;
  institutionId: string;
  description: string;
  code: string;
  calendarName: string;
  calendarTimeZone: string;
  serviceDeskTypeId: ServiceDeskTypeEnum;
  // serviceDeskOfficer: ServiceDeskOfficerModel[];
  // appointments: AppointmentModel[];
}
