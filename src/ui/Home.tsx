import { ClientOnly } from '@tanstack/react-router'
import { ReactNode, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import {
  setUserInput,
  setUserResult,
  startTicking,
  stopTicking,
  useCurrentDate,
  useCurrentJoke,
  useUserInput,
  useUserResult
} from '@/ui/Store'
import { datesFromEpochInput } from '@/util/date'

const handleCopyClick = async (e: React.MouseEvent<HTMLDivElement>) => {
  try {
    const h2 = e.currentTarget.querySelector('h2')
    const text = h2?.textContent || ''

    if (text === '') throw new Error('Copying nothing')

    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      // Fallback for iOS/older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }

    toast.success('Copied to clipboard')
  } catch (e) {
    toast.error(`Failed to copy: ${e.message}`)
  }
}

const TickingDate = () => {
  const date = useCurrentDate()

  useEffect(() => {
    startTicking()
    return () => stopTicking()
  }, [])

  return (
    <div
      className={`flex flex-col gap-1 items-center justify-center min-h-32 opacity-0 transition-opacity duration-500 ease-in-out delay-100 ${date ? 'opacity-100' : 'opacity-0'}`}
    >
      {date ? (
        <>
          <div
            onClick={handleCopyClick}
            className="grid grid-cols-[auto_1fr] gap-4 select-none cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-2xl"
          >
            <div className="flex justify-start items-center">
              <span className="items-center rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400">
                Seconds
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-300">{date.unix()}</h2>
          </div>

          <div
            onClick={handleCopyClick}
            className="grid grid-cols-[auto_1fr] gap-4 select-none cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-2xl"
          >
            <div className="flex justify-start items-center">
              <span className="items-center rounded-full bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400">
                Milliseconds
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-300">{date.valueOf()}</h2>
          </div>

          <div
            onClick={handleCopyClick}
            className="grid grid-cols-[auto_1fr] gap-4 select-none cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-2xl"
          >
            <div className="flex justify-start items-center">
              <span className="items-center rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400">
                ISO 8601
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-300">{date.toISOString()}</h2>
          </div>
        </>
      ) : null}
    </div>
  )
}

const UserTextInput = () => {
  const userInput = useUserInput()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && inputRef.current) {
        event.preventDefault()
        inputRef.current.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Debounced input handler
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInput === '') return setUserResult()

      let result: ReactNode
      try {
        const dates = datesFromEpochInput(userInput)

        result = (
          <div className="flex flex-col gap-1 justify-center items-center min-h-20 my-4">
            <div
              onClick={handleCopyClick}
              className="grid grid-cols-[auto_1fr] gap-4 select-none cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-2xl"
            >
              <div className="flex justify-start items-center">
                <span className="items-center rounded-full bg-sky-400/10 px-2 py-1 text-xs font-medium text-sky-400">
                  Local
                </span>
              </div>
              <h2 className="text-lg font-semibold text-sky-300">{dates.local}</h2>
            </div>
            <div
              onClick={handleCopyClick}
              className="grid grid-cols-[auto_1fr] gap-4 select-none cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-2xl"
            >
              <div className="flex justify-start items-center">
                <span className="items-center rounded-full bg-orange-400/10 px-2 py-1 text-xs font-medium text-orange-400">
                  UTC
                </span>
              </div>
              <h2 className="text-lg font-semibold text-orange-300">{dates.utc}</h2>
            </div>
          </div>
        )
      } catch (e) {
        result = (
          <div className="flex flex-col gap-2 justify-center items-center min-h-20 my-4 text-red-400 font-semibold text-lg text-center">
            Please enter a valid epoch timestamp.
          </div>
        )
      }

      setUserResult(result)
    }, 300)

    return () => clearTimeout(timer)
  }, [userInput])

  return (
    <div className="flex rounded-lg bg-white/5  focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-purple-800">
      <input
        ref={inputRef}
        value={userInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur()
          }
        }}
        onChange={(e) => {
          setUserInput(e.target.value)
        }}
        type="text"
        placeholder="Enter an epoch timestamp"
        className="block min-w-0 grow bg-transparent px-3 py-2  text-white placeholder:text-zinc-600 focus:outline-none text-lg placeholder:text-base"
      />
      <div className="hidden py-1.5 pr-1.5 md:flex">
        <kbd className="inline-flex items-center rounded-sm border border-white/10 px-3 font-sans text-xs text-gray-400">
          /
        </kbd>
      </div>
    </div>
  )
}

const Joke = () => {
  const joke = useCurrentJoke()

  const className =
    'text-sm text-center my-4 text-purple-300 font-medium md:text-base min-h-20 flex flex-col justify-center items-center'

  return (
    <ClientOnly fallback={<div className={className} />}>
      <h2 className={className}>{joke}</h2>
    </ClientOnly>
  )
}

function Home() {
  const userResult = useUserResult()

  return (
    <div className="bg-stone-900 justify-center items-center max-w-3xl mx-auto min-h-dvh flex flex-col space-y-4 text-white">
      <div className="flex flex-col pt-4 w-full my-auto items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">Epoch Guru</h1>
        <img src="/favicon.svg" alt="icon" className="w-24 h-24 md:w-32 md:h-32" />

        <div className="w-[350px] flex flex-col gap-3 max-w-2xl md:w-8/12">
          <div className="flex flex-col px-8">
            {userResult ? userResult : <Joke />}
            <UserTextInput />
          </div>

          <TickingDate />
        </div>
      </div>
    </div>
  )
}

export default Home
