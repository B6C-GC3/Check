import { L } from '../lib/abpUtility';
import { routers } from '../components/Router/router.config';

declare var abp: any;

class Utils {

  generateID() {
    return Math.random().toString(36).substring(2, 12);
  }
  toArray = <T>(arg: T | T[]): T[] => {
    return Array.isArray(arg) ? arg : [arg];
  };

  removeNullValues(array: any[] = []) {
    return array.filter(obj => {
      return Object.values(obj).every(objData => !!objData)
    });
  }

  _randomColor = (index: number | boolean): string => {
    var color = ["#b3d4ff", "#50e991", "#0bb4ff", "#e6d800", "#e60049", "#9b19f5", "#ffa300", "#dc0ab4", "#00bfa0"];
    if (index < color.length) {
      return color[Number(index)]
    }
    else {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getAllKeyObject(obj: Object) {
    let rsl = []
    for (const [key, value] of Object.entries(obj)) {
      rsl.push(key);
    }
    return rsl;
  }

  getAllValueObject(obj: Object) {
    let rsl = []
    for (const [key, value] of Object.entries(obj)) {
      rsl.push(value);
    }
    return rsl;
  }

  getAllThroughObject(obj: Object) {
    let k = [];
    let v = [];
    for (const [key, value] of Object.entries(obj)) {
      k.push(key);
      v.push(value);
    }
    return [k, v];
  }

  getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => object[key] === value);
  }

  getValueByKey(object: any, row: any) {
    return object[row];
  }

  loadScript(url: string) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
  }

  extend(...args: any[]) {
    let options,
      name,
      src,
      srcType,
      copy,
      copyIsArray,
      clone,
      target = args[0] || {},
      i = 1,
      length = args.length,
      deep = false;
    if (typeof target === 'boolean') {
      deep = target;
      target = args[i] || {};
      i++;
    }
    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = args[i]) !== null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          srcType = Array.isArray(src) ? 'array' : typeof src;
          if (deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && srcType === 'array' ? src : [];
            } else {
              clone = src && srcType === 'object' ? src : {};
            }
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  }

  getPageTitle = (pathname: string) => {
    const localizedAppName = L('Common.AppName');
    return L(pathname) + ' | ' + localizedAppName;
  };

  getRoute = (path: string): any => {
    return routers.filter(route => route.path === path)[0];
  };

  setLocalization() {
    if (!abp.utils.getCookieValue('Localization')) {
      let language = "vi";
      abp.utils.setCookieValue('Localization', language, new Date(new Date().getTime() + 5 * 365 * 86400000), abp.appPath);
    }
  }

  getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return abp.timing.unspecifiedClockProvider;
    }

    if (currentProviderName === 'utcClockProvider') {
      return abp.timing.utcClockProvider;
    }

    return abp.timing.localClockProvider;
  }

  formatDate = (input: Date): string => {
    return input?.toLocaleString("vi").substring(0, 22).replaceAll("T", " ").replaceAll("-", "/");
  }

  Distinct = (array: Object[]) => {
    return [...new Set(array)];
  }
}

export default new Utils();
