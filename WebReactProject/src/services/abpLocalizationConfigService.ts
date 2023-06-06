import enJson from '../localization/en.json';
import viJson from '../localization/vi.json';

declare var abp: any;

class AbpLocalizationConfigService {
  public async getLocalization() {
    let language;
    if (!abp.utils.getCookieValue('Localization')) {
      language = "vi";
    }
    else {
      language = abp.utils.getCookieValue('Localization');
    }

    let objReturn;
    switch (language) {
      case "en":
        objReturn = enJson;
        break;
      case "vi":
        objReturn = viJson;
        break;
      default:
        objReturn = viJson;
        break;
    }

    return objReturn;
  }

  public async getCurrentLanguage() {
    let language: string;
    if (!abp.utils.getCookieValue('Localization')) {
      language = "vi";
    }
    else {
      language = abp.utils.getCookieValue('Localization');
    }
    var wanted = abp.localization.languages.filter(function (item: any) {
      return (item.name === language);
    });

    return wanted.length > 0 ? wanted[0] : null;
  }
}

export default new AbpLocalizationConfigService();
