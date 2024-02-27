import dayjs, { Dayjs } from 'dayjs'
import { Show, createSignal } from 'solid-js'
import { store, setStore } from '../global/store'
import { getDayjsFromEpoch, getLocalDate, getUTCDate } from '../util/date'
import { getRandomJoke } from '../util/jokes'
import CopyButton from './CopyButton'
import DateDisplay from './DateDisplay'

function Card() {
	function handleUserInput() {
		try {
			const date = getDayjsFromEpoch(store.userInput)
			setStore({
				...store,
				userDate: date,
				userInputError: false,
				showJoke: false
			})
		} catch {
			setStore({
				...store,
				userInputError: true
			})
		}
	}

	return (
		<div class="card w-10/12 min-w-80 bg-stone-800 shadow-2xl">
			<div class="card-body justify-center items-center">
				<Show when={store.showJoke}>
					<div class="w-11/12 text-center mb-2 font-semibold text-purple-300">{getRandomJoke()}</div>
				</Show>

				<Show when={store.userInputError}>
					<div class="text-red-400 font-bold text-center mb-4">Enter a valid epoch timestamp in milliseconds or seconds.</div>
				</Show>

				<Show when={store.userInput !== '' && !store.userInputError}>
					<DateDisplay date={store.userDate} />
				</Show>

				<input
					type="text"
					placeholder="Time in seconds or ms"
					class="input input-bordered focus:outline-none w-11/12 bg-stone-800 m-2"
					value={store.userInput}
					onChange={(e) => {
						if (e.target.value === '') {
							return
						}
						setStore({
							userInput: e.target.value
						})
						handleUserInput()
					}}
				/>

				<div class="flex flex-col items-center">
					<div class="badge badge-lg text-white bg-purple-700 font-bold mb-2">Current Time</div>

					<h1 class="font-bold">ISO 8601</h1>
					<div class="flex items-center space-x-2">
						<a class="text-sm sm:text-xl font-medium text-gray-400 text-center" href="#">
							{store.isoDate}
						</a>

						<CopyButton toCopy={`${store.isoDate}`} />
					</div>

					<h1 class="font-bold">In Seconds</h1>
					<div class="flex items-center space-x-2">
						<a class="text-xl font-medium text-gray-400" href="#">
							{store.epochS}
						</a>

						<CopyButton toCopy={`${store.epochS}`} />
					</div>

					<h1 class="font-bold">In Milliseconds</h1>
					<div class="flex items-center space-x-2">
						<h1 class="text-xl font-medium text-gray-400">{store.epochMs}</h1>

						<CopyButton toCopy={`${store.epochMs}`} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
