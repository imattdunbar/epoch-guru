import { useStore } from '@tanstack/react-store'
import dayjs from 'dayjs'
import { getRandomJoke } from '@/util/jokes'
import { ReactNode } from 'react'
import { createStore } from '@/util/store'

interface EGStore {
  currentDate: dayjs.Dayjs | null
  userInput: string
  currentJoke: string
  userResult?: ReactNode
}

const store = createStore<EGStore>({
  initialState: { currentDate: null, userInput: '', currentJoke: getRandomJoke() },
  name: 'Epoch Guru',
  devtools: true
})

export const useCurrentDate = () => useStore(store, (state) => state.currentDate)
export const useUserInput = () => useStore(store, (state) => state.userInput)
export const useCurrentJoke = () => useStore(store, (state) => state.currentJoke)
export const useUserResult = () => useStore(store, (state) => state.userResult)

let intervalRef: NodeJS.Timeout | null = null

export const startTicking = () => {
  if (intervalRef) return

  store.update({ currentDate: dayjs() })

  intervalRef = setInterval(() => {
    store.update({ currentDate: dayjs() })
  }, 1000)
}

export const stopTicking = () => {
  if (intervalRef) {
    clearInterval(intervalRef)
    intervalRef = null
  }
}

export const setUserInput = (input: string) => {
  store.update({ userInput: input })
}

export const setUserResult = (node?: ReactNode) => {
  store.update({ userResult: node })
}
