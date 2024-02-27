import dayjs, { Dayjs } from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import { z } from 'zod'

dayjs.extend(LocalizedFormat)
dayjs.extend(utc)

export function getLocalDate(date: Dayjs): string {
	return date.format('M/D/YYYY h:mm:ss A')
}

export function getUTCDate(date: Dayjs): string {
	return date.utc().format('M/D/YYYY h:mm:ss A')
}

export function getDayjsFromEpoch(input: string): Dayjs {
	try {
		let validEpoch = z.coerce.number().parse(input)

		// it's in seconds
		if (validEpoch < 2000000000) {
			validEpoch *= 1000
		}

		return dayjs(validEpoch)
	} catch (e) {
		throw e
	}
}
