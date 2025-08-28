import { create } from 'zustand'
import dayjs from 'dayjs'
import { getRandomJoke } from '@/util/jokes'
import { ReactNode } from 'react'

interface Store {
  currentDate: dayjs.Dayjs | null
  userInput: string
  currentJoke: string
  userResult?: ReactNode
}

export const useStore = create<Store>(() => ({
  currentDate: null,
  userInput: '',
  currentJoke: getRandomJoke()
}))

// selectors
export const useCurrentDate = () => useStore((state) => state.currentDate)
export const useUserInput = () => useStore((state) => state.userInput)
export const useCurrentJoke = () => useStore((state) => state.currentJoke)
export const useUserResult = () => useStore((state) => state.userResult)

// Global interval reference
let intervalRef: NodeJS.Timeout | null = null

// Simple functions
export const startTicking = () => {
  if (intervalRef) return

  useStore.setState({ currentDate: dayjs() })
  intervalRef = setInterval(() => {
    useStore.setState({ currentDate: dayjs() })
  }, 1000)
}

export const stopTicking = () => {
  if (intervalRef) {
    clearInterval(intervalRef)
    intervalRef = null
  }
}

export const setUserInput = (input: string) => {
  useStore.setState({ userInput: input })
}

export const setUserResult = (node?: ReactNode) => {
  useStore.setState({ userResult: node })
}
