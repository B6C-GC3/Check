import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface ReduxComponentState { //:)
    readonly loading: boolean;
    readonly completed: boolean;
}

export type ReduxComponentActions = ActionType<typeof actions>; //:)