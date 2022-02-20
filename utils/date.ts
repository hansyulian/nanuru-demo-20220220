import { config } from 'Config/App';
import { DateTimeParameter } from 'CustomTypes';
import moment from 'moment';

export function formatDateTime(
  value: DateTimeParameter = new Date(),
  format = `${config.timeFormat} ${config.dateFormat}`
) {
  const momentDate = moment(value);
  if (!momentDate.isValid()) {
    return undefined;
  }
  return momentDate.format(format);
}

export function formatDate(
  value: DateTimeParameter | undefined = new Date(),
  format = config.dateFormat
) {
  return formatDateTime(value, format);
}

export function formatMonth(
  value: DateTimeParameter | undefined = new Date(),
  format = 'MMM YYYY'
) {
  return formatDateTime(value, format);
}

export function dateNumber(value: DateTimeParameter): number | undefined {
  if (!value) {
    return undefined;
  }
  const momentDate = moment(value);
  if (!momentDate.isValid()) {
    return undefined;
  }
  return momentDate.toDate().getTime();
}

export function findOldestRecord<T = any>(records: T[], dateSelector: (record: T) => Date): T | undefined {
  let oldestTime = new Date().getTime();
  let oldestRecord = undefined;
  for (const record of records) {
    const recordTime = dateSelector(record).getTime();
    if (recordTime < oldestTime) {
      oldestTime = recordTime;
      oldestRecord = record;
    }
  }
  return oldestRecord
}

export function friendlyFormatDateTime(value: DateTimeParameter | undefined) {
  const momentDate = moment(value);
  if (!momentDate.isValid()) {
    return `Invalid Date: ${value}`;
  }
  return momentDate.format('h:mm A DD-MMMM-YYYY');
}