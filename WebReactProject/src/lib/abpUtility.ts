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