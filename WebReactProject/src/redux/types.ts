import { Store } from "redux";
import { Saga } from "redux-saga";

import { GlobalState } from "../components/ComponentGlobal/types";
import { ReduxComponentState } from "../components/ReduxComponent/types";

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: Saga<any[]> | undefined, args: any | undefined): any;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly global: GlobalState;
  readonly reduxComponent : ReduxComponentState;
}
