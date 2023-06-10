import AppointmentStatusEnum from "../enums/AppointmentStatusEnum";

export interface CloseAppointmentQueuePayload {
  appointmentStatus: AppointmentStatusEnum;
}
