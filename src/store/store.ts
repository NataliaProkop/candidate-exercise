import { Store } from '../flux/store';
import { 
  IState, 
  IMyStore, 
  IResult,
  ActionType,
  MyStoreActionTypes
} from './types';
import { loginUser, registerUser, getSecretData } from './service';
import { PayloadAction } from '../flux/types';

const initialState = {
  someSecretData: null,
  userData: null,
}

function reducer(action: PayloadAction, state: IState = initialState) {
  const incomingAction = action as MyStoreActionTypes;
  switch (incomingAction.type) {
    case ActionType.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload.userData
      };
    case ActionType.SET_SECRET_DATA:
      return {
        ...state,
        someSecretData: action.payload.someSecretData
      }
    case ActionType.CLEAN:
      return initialState
    default:
      return state;
  }
}

export class MyStore extends Store<IState> implements IMyStore {

  constructor() {
    super(reducer, initialState);
  }

  isLoggedIn() {
    return Boolean(this.state.userData);
  }

  async login(email: string, password: string): Promise<IResult> {
    try {
      const response = await loginUser(email, password);
      if (response.ok) {
        const body = await response.json();
        this.dispatch({
          type: ActionType.SET_USER_DATA,
          payload: {
            userData: {
              email,
              token: body.token
            }
          }
        });
        return { success: true, message: 'Succesful login' }
      } else {
        throw Error(response.statusText)
      }
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  logout() {
    this.dispatch({
      type: ActionType.CLEAN,
    });
  }

  async fetchSecretData(): Promise<IResult> {
    try {
      const response = await getSecretData(this.state.userData?.token || '');
      if (response.ok) {
        const body = await response.json();
        this.dispatch({
          type: ActionType.SET_SECRET_DATA,
          payload: {
            someSecretData: body
          }
        });
        return { success: true, message: 'Data fetched' };
      } else {
        if (response.status === 401) {
          this.dispatch({
            type: ActionType.CLEAN,
          });
        }
        throw Error(response.statusText);
      }
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  async register(email: string, password: string): Promise<IResult> {
    try {
      const response = await registerUser(email, password);
      if (response.ok) {
        return { success: true, message: 'Succesful registration' };
      }
      throw Error(response.statusText);
    } catch (e) {
      return { success: false, message: e.message };
    }
  }
}
