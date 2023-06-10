import { CustomerModel } from "./CustomerModel";

export interface CustomerAppointment {
  serviceDeskId: string;
  date: string;
  protocolNumber: string;
  customer: CustomerModel;
}
