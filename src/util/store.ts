import { Store } from '@tanstack/react-store'

interface ReduxDevToolsExtension {
  connect(options?: { name?: string }): ReduxDevToolsInstance
}

interface ReduxDevToolsInstance {
  send(action: { type: string; [key: string]: any }, state: any): void
  init(state: any): void
  subscribe(listener: (message: any) => void): void
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: ReduxDevToolsExtension
  }
}

function connectToDevTools<T>(store: Store<T>, options: { name?: string } = {}) {
  // Do nothing if the extension is not installed
  if (typeof window === 'undefined' || !window.__REDUX_DEVTOOLS_EXTENSION__) {
    return
  }

  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
    name: options.name || 'TanStack Store'
  })

  let isTimeTraveling = false

  // Send the initial state to the DevTools
  devTools.init(store.state)

  // Subscribe to messages from the Redux DevTools
  devTools.subscribe((message) => {
    if (message.type === 'DISPATCH' && message.state) {
      const payload = message.payload

      // When we jump to a specific state or perform other time-travel actions
      if (payload.type === 'JUMP_TO_STATE' || payload.type === 'JUMP_TO_ACTION') {
        isTimeTraveling = true

        const newState = JSON.parse(message.state)
        store.setState(() => newState)
      }
    }
  })

  store.subscribe(() => {
    // If the change was triggered by a time-travel action from the devtools,
    // we don't need to send it back to the devtools.
    if (isTimeTraveling) {
      isTimeTraveling = false
      return
    }

    const actionName = `State Changed: ${new Date().toLocaleTimeString()}`
    devTools.send({ type: actionName }, store.state)
  })
}

function persistStore<T>(store: Store<T>, key: string) {
  try {
    const state = JSON.parse(localStorage.getItem(key)!)
    if (state) store.setState(state)
  } catch (e) {
    console.error(e)
  }

  store.subscribe((event) => {
    try {
      console.log('persisting')
      localStorage.setItem(key, JSON.stringify(event.currentVal))
    } catch (e) {
      console.error(e)
    }
  })
}

declare module '@tanstack/react-store' {
  interface Store<TState> {
    update(partial: Partial<TState>): void
  }
}

Store.prototype.update = function <TState>(this: Store<TState>, partial: Partial<TState>) {
  this.setState((prev) => ({ ...prev, ...partial }))
}

export function createStore<T>(options: {
  initialState: T
  name: string
  devtools?: boolean
  persist?: boolean
}): Store<T> {
  const store = new Store<T>(options.initialState)

  if (options.persist === true) {
    persistStore(store, options.name)
  }
  if (options.devtools === true) {
    connectToDevTools(store, { name: options.name })
  }

  return store
}
