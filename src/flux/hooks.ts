import { useEffect, useReducer } from 'react'
import { IStore } from './types';

function useSelector<S, R>(selector:(state: S) => R, store: IStore<S>): R {
  const [, forceRender] = useReducer((s) => s + 1, 0)

  useEffect(() => {
    const unsubscribe = store.subscribe(forceRender)
    return () => {
      unsubscribe()
    }
  })
  return selector(store.state)
}

function useDispatch<S>(store: IStore<S>) {
  return store.dispatch
}

export { useSelector, useDispatch }
