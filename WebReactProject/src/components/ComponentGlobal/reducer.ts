import { GlobalState } from './types';

// The initial state of the App
export const initialState: GlobalState = {
    
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function globalReducer(
    state: GlobalState = initialState
) {
    return state;
}

export default globalReducer;