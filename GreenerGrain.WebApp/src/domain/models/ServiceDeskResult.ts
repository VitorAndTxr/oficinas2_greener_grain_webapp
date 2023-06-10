export interface ServiceResult {
  id: string;
  serviceDeskTypeId: number;
  institutionId: string;
  description: string;
  code: string;
  calendarName: string;
  calendarTimeZone: string;
  serviceDeskType: ServiceDeskType;
  meetDurationTime: number;
  serviceDeskOpeningHours: ServiceDeskOpeningHour[];
}

export interface ServiceDeskType {
  id: number;
  description: string;
}

export interface ServiceDeskOpeningHour {
  id: string;
  serviceDeskId: string;
  dayOfWeek: number;
  startTime: StartTime;
  endTime: EndTime;
}

export interface StartTime {
  ticks: number;
  days: number;
  hours: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMilliseconds: number;
  totalMinutes: number;
  totalSeconds: number;
}

export interface EndTime {
  ticks: number;
  days: number;
  hours: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMilliseconds: number;
  totalMinutes: number;
  totalSeconds: number;
}
