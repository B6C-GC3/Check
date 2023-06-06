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
import service from './scenes/OAuthAreas/UserLogin/services';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

declare var abp: any;
Utils.setLocalization();

abpLocalizationConfigService.getLocalization().then(async function (res) {
    Utils.extend(true, abp, defaultConfig);
    if (!!abp.auth.getToken()) {
        //let checktoken = await service.checkToken(abp.auth.getToken());
        // console.log('checktoken', checktoken)
        // if (checktoken) {
        //     abp.session.userId = checktoken.userId;
        //     abp.auth.setRoles(checktoken.roleList, undefined);
        // }
        // else {
        //     // localStorage.clear();
        //     // sessionStorage.clear();
        //     // abp.auth.clearToken();
        // }
    }
    else{
       // service.setCookie();
    }
    
    service.setCookie();
    var loadingEl = document.getElementById('root-loading');

    if (loadingEl) {
        loadingEl.remove();
    }
    localStorage.setItem("wiSQy", "e807f1fcf82d132f9bb018ca6738a19f");
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
