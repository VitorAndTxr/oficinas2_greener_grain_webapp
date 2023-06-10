import { InstitutionSettingsModel } from "./InstitutionSettingsModel";

export interface QueueSettingsModel extends InstitutionSettingsModel {   
    code: string;
    queueOpeningHours: string;
};