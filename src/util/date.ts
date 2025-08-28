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

export function datesFromEpochInput(input: string): { local: string; utc: string } {
  let valid = z.coerce.number().parse(input)

  // it's in seconds
  if (valid < 2000000000) {
    valid *= 1000
  }

  const d = dayjs(valid)

  return {
    local: getLocalDate(d),
    utc: getUTCDate(d)
  }
}
