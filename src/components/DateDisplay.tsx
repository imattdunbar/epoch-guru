import { Dayjs } from 'dayjs'
import { getLocalDate, getUTCDate } from '../util/date'

function DateDisplay(props: { date: Dayjs }) {
	const localDate = () => getLocalDate(props.date)
	const utcDate = () => getUTCDate(props.date)

	return (
		<>
			<div class="flex flex-col sm:flex-row sm:space-x-2 sm:space-y-0 items-center space-y-2">
				<p class="font-semibold text-2xl sm:text-3xl text-blue-400 text-center">{localDate()}</p>
				<div class="badge text-white bg-blue-400 my-0">Local</div>
			</div>
			<div class="flex flex-col sm:flex-row sm:space-x-2 sm:space-y-0 items-center space-y-2">
				<p class="font-semibold text-2xl sm:text-3xl text-orange-300 text-center">{utcDate()}</p>
				<div class="badge text-white bg-orange-500">UTC</div>
			</div>
		</>
	)
}

export default DateDisplay
