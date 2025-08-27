import { getRandomJoke } from '@/util/jokes'
import { ClientOnly } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const TickingDate = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null)

  useEffect(() => {
    setDate(dayjs())

    const interval = setInterval(() => {
      setDate(dayjs())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center min-h-32 opacity-0 transition-opacity duration-500 ease-in-out delay-100 ${date ? 'opacity-100' : 'opacity-0'}`}
    >
      {date ? (
        <div className="flex flex-col items-center justify-center w-full gap-1">
          <div
            onClick={() => {
              toast.success('Copied to Clipboard')
            }}
            className="grid grid-cols-[auto_1fr] rounded-xl px-2 py-1 hover:bg-gray-800 w-full cursor-pointer select-none"
          >
            <span className="inline-flex items-center rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400">
              Seconds
            </span>
            <h2 className="text-lg font-semibold text-gray-300 text-center">{date.unix()}</h2>
          </div>

          <div className="grid grid-cols-[auto_1fr] rounded-xl px-2 py-1 hover:bg-gray-800 w-full cursor-pointer select-none">
            <span className="inline-flex items-center rounded-full bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400">
              Milliseconds
            </span>
            <h2 className="text-lg font-semibold text-gray-300 text-center">{date.valueOf()}</h2>
          </div>

          <div className="grid grid-cols-[auto_1fr] rounded-xl px-2 py-1 hover:bg-gray-800 w-full cursor-pointer select-none">
            <span className="inline-flex items-center rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400">
              ISO 8601
            </span>
            <h2 className="font-semibold text-gray-300 text-center">{date.toISOString()}</h2>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const UserTextInput = () => {
  const [userInput, setUserInput] = useState('')
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
      if (userInput !== '') {
        console.log('handle ', userInput)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [userInput])

  return (
    <div className="flex rounded-lg bg-white/5  focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-purple-800">
      <input
        ref={inputRef}
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value)
        }}
        type="text"
        placeholder="Enter an epoch timestamp"
        className="block min-w-0 grow bg-transparent px-3 py-2  text-white placeholder:text-zinc-600 focus:outline-none text-sm"
      />
      <div className="hidden py-1.5 pr-1.5 md:flex">
        <kbd className="inline-flex items-center rounded-sm border border-white/10 px-2 font-sans text-xs text-gray-400">
          /
        </kbd>
      </div>
    </div>
  )
}

function Home() {
  const joke = getRandomJoke()

  return (
    <div className="bg-stone-900 justify-center items-center max-w-3xl mx-auto min-h-dvh flex flex-col space-y-4 text-white">
      <div className="flex flex-col pt-4 w-full my-auto items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">Epoch Guru</h1>
        <img src="/favicon.svg" alt="icon" className="w-24 h-24 md:w-32 md:h-32" />

        <div className="w-[350px] flex flex-col gap-3 max-w-2xl md:w-8/12">
          <div className="flex flex-col px-8">
            <ClientOnly>
              <h2 className="text-sm text-center my-4 text-purple-300 font-medium md:text-base">{joke}</h2>
            </ClientOnly>

            <UserTextInput />
          </div>

          <TickingDate />
        </div>
      </div>
    </div>
  )
}

export default Home
