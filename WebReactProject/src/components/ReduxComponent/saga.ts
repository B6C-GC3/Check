import { call, put, takeLatest, race } from 'redux-saga/effects';
import { watchPageCompleted, watchPageError } from './actions';
import ActionTypes from './constants';
import service from './services';

export default function* watchLoginRequestStart() {

    yield takeLatest(
        ActionTypes.WATCH_PAGE_START,
        requestLogin
    );
}

function* requestLogin(input: any) {
    try {
        const { output } = yield race({
            output: call(service.authenticate)
        });
        if (output) {
            yield put(watchPageCompleted());
        }
        else {
            yield put(watchPageError());
        }
    } catch (error) {
        yield put(watchPageError());
    }
}