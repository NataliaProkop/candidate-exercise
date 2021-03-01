import { IStore } from '../flux/types';

export interface ISomeSecretData {
  secretInfo: string;
}

export interface IUserData {
  email: string;
  token: string;
}

export interface IState {
  someSecretData: ISomeSecretData | null;
  userData: IUserData | null;
}

export interface IResult {
  success: boolean;
  message: string;
}

export interface IMyStore extends IStore<IState> {
  isLoggedIn: () => boolean;
  login: (email: string, password: string) => Promise<IResult>;
  logout: () => void;
  fetchSecretData: () => Promise<IResult>;
  register: (email: string, password: string) => Promise<IResult>;
}

export interface ILoginResult {
  token: string;
}

export enum ActionType {
  SET_USER_DATA = 'SET_USER_DATA',
  SET_SECRET_DATA = 'SET_SECRET_DATA',
  CLEAN = 'CLEAN'
}

export interface SetUserDataPayload {
  userData: IUserData
}

export interface SetUserDataAction {
  type: ActionType.SET_USER_DATA,
  payload: SetUserDataPayload
}

export interface SetSecretDataPayload  {
  someSecretData: ISomeSecretData
}

export interface SetSecretDataAction {
  type: ActionType.SET_SECRET_DATA,
  payload: SetSecretDataPayload
}

export interface CleanAction {
  type: ActionType.CLEAN
}

export type MyStoreActionTypes =  SetUserDataAction | SetSecretDataAction | CleanAction


