export interface OfficerPauseModel {
  id: string;
  serviceDeskOfficerId: string;
  entireDay: boolean;
  startDate: string;
  endDate: string;
  reason: string;
}
