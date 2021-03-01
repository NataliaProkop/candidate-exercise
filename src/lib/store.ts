
import { IStore, PayloadAction } from './types';

export class Store<S> implements IStore<S> {
    reducer: (action: PayloadAction, state: S) => S;
    state: S;
    private subscribers: { (newState: S): void; } [] = [];

    constructor ( reducer: (action: PayloadAction, state: S) => S, initialState : S) {
        this.reducer = reducer
        this.state = initialState
    }
    
    dispatch = (action: PayloadAction) => {
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
