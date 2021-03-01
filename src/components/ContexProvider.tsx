import React, { createContext, useContext } from 'react';
import { MyStore } from '../store/store';
import { IMyStore, IState } from '../store/types';
import { useSelector, useDispatch } from '../lib/hooks';

const StoreContext = createContext<IMyStore>(new MyStore());

interface StoreContextProviderProps {
    children?:
    | React.ReactChild
    | React.ReactChild[];
}

const StoreContextProvider: React.FC<StoreContextProviderProps> = ({ children }) => {
    const contextValue = new MyStore();
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export interface IUseSelector<TSelected = unknown> {
    (state: IState): TSelected;
};

const useStore = () => useContext(StoreContext);
const useMyStoreSelector = <R extends unknown>(selector:(state: IState) => R): R => useSelector(selector, useContext(StoreContext))
const useMyStoreDispatch = () => useDispatch(useContext(StoreContext))

export { StoreContext, StoreContextProvider, useStore, useMyStoreSelector as useSelector,  useMyStoreDispatch as useDispatch };
