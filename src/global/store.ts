import { createStore } from 'solid-js/store'
import dayjs from 'dayjs'

export const [store, setStore] = createStore({
	userInput: '',
	userInputError: false,
	showJoke: true,
	epochS: dayjs().unix(),
	epochMs: dayjs().valueOf(),
	isoDate: dayjs().toISOString(),
	userDate: dayjs()
})

setInterval(() => {
	setStore({
		epochS: dayjs().unix(),
		epochMs: dayjs().valueOf(),
		isoDate: dayjs().toISOString()
	})
}, 1000)
