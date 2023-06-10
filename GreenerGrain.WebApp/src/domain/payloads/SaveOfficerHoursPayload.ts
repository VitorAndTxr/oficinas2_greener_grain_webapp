import { OfficerHourModel } from "../models/OfficerHourModel";

export interface SaveOfficerHoursPayload {
    serviceDeskId: string;
    hours: OfficerHourModel[];
}
