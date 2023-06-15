import AppConsts from './appconst';

declare var abp: any;

export function L(key: string, sourceName?: string): string {
  let localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;
  return abp.localization.localize(key, sourceName ? sourceName : localizationSourceName);
}

export function isGranted(permissionName: string): boolean {
  if (abp.auth.getRoles().indexOf(permissionName) >= 0) {
    return true;
  }
  else {
    return false;
  }
}

export function mapThat(obj: any, mappedObject: any) {
  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] === 'object') {
      mapThat(obj[key], mappedObject);
    }
    else {
      mappedObject[key.toLowerCase()] = obj[key];
    }
  });
}

export function processInteractTime(dateTimeHistory: Date | string) {
  let now = new Date();
  let end = new Date(dateTimeHistory);
  let diff = now.getTime() - end.getTime();

  let day = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (day !== 0) return day.toString() + " " + L("DAY", "COMMON");

  let hour = Math.floor(diff / (1000 * 60 * 60));
  if (hour !== 0) return hour.toString() + " " + L("HOUR", "COMMON");

  let minute = Math.floor(diff / (1000 * 60));
  if (minute !== 0) return minute.toString() + " " + L("MINUTE", "COMMON");

  let second = Math.floor(diff / 1000);
  if (second >= 30) return second.toString() + " " + L("SECOND", "COMMON");
  else return L("JUST_FINISHED", "COMMON");
}