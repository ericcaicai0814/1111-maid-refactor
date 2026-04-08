/** 服務時間 */
export interface ServiceHours {
  label: string;
  hours: string;
}

/** 服務電話 */
export interface ServicePhone {
  region: string;
  number: string;
}

export const serviceHours: ServiceHours[] = [
  { label: '週一至週五', hours: '8:30 ~ 21:00' },
  { label: '週六、日、國定假日', hours: '9:00 ~ 21:00' },
];

export const servicePhones: ServicePhone[] = [
  { region: '苗栗以北', number: '02-8787-1111' },
  { region: '中部地區', number: '04-2203-1111' },
  { region: '南部地區', number: '07-958-1111' },
];
