export interface OfficerHourModel {
  id: string;
  serviceDeskOfficerId?: string;
  institutionServiceLocationId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  order: number;
  weekDay?: number;
}
