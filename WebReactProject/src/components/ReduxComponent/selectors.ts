import { createSelector } from 'reselect';

import { ApplicationRootState } from '../../redux/types';
import { initialState } from './reducer';

const selectReduxComponent = (state: ApplicationRootState) => state.reduxComponent || initialState;

const makeSelectLoading = () => createSelector(selectReduxComponent, substate => substate.loading);
const makeSelectCompleted = () => createSelector(selectReduxComponent, substate => substate.completed);

export { 
    makeSelectLoading, 
    makeSelectCompleted 
}; 