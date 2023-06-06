import { applyMiddleware, createStore, compose } from 'redux';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';
import { InjectedStore, ApplicationRootState } from './types';

export default function configureStore(
    initialState: ApplicationRootState | {} = {}
) {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const { run: runSaga } = sagaMiddleware;

    const middlewares = [sagaMiddleware];

    const enhancers = [
        applyMiddleware(...middlewares),
        createInjectorsEnhancer({
            createReducer,
            runSaga
        })
    ];
    
    const composeEnhancer =
        (process.env.NODE_ENV !== 'production' && (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) || compose;

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancer(...enhancers)
    ) as InjectedStore;

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    return store;
}