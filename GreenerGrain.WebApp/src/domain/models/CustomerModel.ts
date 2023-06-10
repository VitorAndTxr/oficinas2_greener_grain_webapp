import { AppointmentModel } from "./AppointmentModel";

export interface CustomerModel {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    appointments: AppointmentModel[];
}
