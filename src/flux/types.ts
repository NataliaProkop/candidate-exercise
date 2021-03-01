export interface IStore<S> {
    state: S
    reducer: <P>(action: PayloadAction<P>, state: S) => S;
    dispatch: <P>(action: PayloadAction<P>) => void;
    subscribe: (subscriber: () => void) => () => void;
};

export interface  PayloadAction<P = any, T extends string = string> {
    payload?: P;
    type: T;
};