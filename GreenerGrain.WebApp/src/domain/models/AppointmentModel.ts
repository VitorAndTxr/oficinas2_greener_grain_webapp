import AppointmentStatusEnum from "../enums/AppointmentStatusEnum";
import { AppointmentQueueModel } from "./AppointmentQueueModel";

export interface AppointmentModel {
  id: string;
  appointmentStatus: AppointmentStatusEnum;
  serviceDeskId: string;
  customerId: string;
  officerId: string;
  date: string;
  protocolNumber: string;
  position?: number;
  meetId: string;
  note: string;
  appointmentQueue?: AppointmentQueueModel;
}
