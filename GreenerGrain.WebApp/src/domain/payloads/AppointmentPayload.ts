export interface AppointmentPayload {
  serviceDeskId: string;
  attendantId?: string;
  meetId?: string;
  note?: string;
  appointmentContent?: string;
  customer?: CustomerPayload;
}

export interface CustomerPayload {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface CustomerAppointmentPayload {
  serviceDeskId: string;
  date: string;
  protocolNumber: string;
  customer: CustomerPayload;
}
