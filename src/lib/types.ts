export interface IStore<S> {
    state: S
    reducer: (action: PayloadAction, state: S) => S;
    dispatch: (action: PayloadAction) => void;
    subscribe: (subscriber: () => void) => () => void;
};

export interface  PayloadAction<P = any, T extends string = string> {
    payload?: P;
    type: T;
};
