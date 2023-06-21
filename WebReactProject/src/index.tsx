import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Utils from './utils/utils';
import registerServiceWorker from './registerServiceWorker';
import abpLocalizationConfigService from './services/abpLocalizationConfigService';
import defaultConfig from './localization/defaultConfig.json';
import service, { LocationDetectionDto } from './services';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { notifyError } from './components/Common/notification';

declare var abp: any;
Utils.setLocalization();

abpLocalizationConfigService.getLocalization().then(async function (res) {
    Utils.extend(true, abp, defaultConfig);

    if (!!abp.auth.getToken()) {
        loadDefault();
    }
    else {

    }

    service.setCookie();
    var loadingEl = document.getElementById('root-loading');

    if (loadingEl) {
        loadingEl.remove();
    }

    abp.localization.values = res;

    abpLocalizationConfigService.getCurrentLanguage().then(function (res) {
        abp.localization.currentLanguage = res;
        abp.localization.currentCulture = {
            name: res.name,
            displayName: res.displayName
        }
    });

    moment.locale(abp.utils.getCookieValue('Localization'));

    const initialState = {};
    const store = configureStore(initialState);

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root') as HTMLElement
    );

    registerServiceWorker();
});

async function loadDefault() {
    var rsl = await service.DefaultLoader();
    if (rsl.error === true || rsl.result !== undefined) {
        abp.utils.setCookieValue(
            'Localization',
            rsl.result.location,
            new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
            abp.appPath
        );
    }
    else {
        notifyError("ERROR", "ERROR");
    }
}
