import ActionTypes from './constants';
import { ReduxComponentState, ReduxComponentActions } from './types';

declare var abp: any;

export const initialState: ReduxComponentState = {
    loading: false,
    completed: true
};

function reduxComponentReducer( //:)
    state: ReduxComponentState = initialState,
    action: ReduxComponentActions
) {
    switch (action.type) {
// OPEN PAGE
        case ActionTypes.WATCH_PAGE_START:
            return {
                ...state,
                loading: true
            };

        case ActionTypes.WATCH_PAGE_COMPLETED:
            return {
                ...state,
                loading: true,
                completed: true
            };

        case ActionTypes.WATCH_PAGE_ERROR:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}

export default reduxComponentReducer; //:)