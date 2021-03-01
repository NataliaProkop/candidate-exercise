
import { IStore, PayloadAction } from './types';

export class Store<S> implements IStore<S> {
    reducer: <P>(action: PayloadAction<P>, state: S) => S;
    state: S;
    private subscribers: { (newState: S): void; } [] = [];

    constructor ( reducer: <P>(action: PayloadAction<P>, state: S) => S, initialState : S) {
        this.reducer = reducer
        this.state = initialState
    }
    
    dispatch = <P>(action: PayloadAction<P>) => {
        this.state = this.reducer(action, this.state);
        this.subscribers.forEach(subscriber => subscriber(this.state))
    };

    subscribe = (subscriber: () => void): () => void => {
        this.subscribers.push(subscriber)
        return () => {
            this.subscribers.filter(sub => sub !== subscriber)
        }
    };
}