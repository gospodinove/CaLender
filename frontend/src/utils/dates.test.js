import {
  addDaysToDate,
  adjustHoursOfDateFromFullcallendar,
  getWeekBoundsForDate,
  getWeekEndForDate,
  getWeekStartForDate,
  isDateInRange
} from './dates'

test('get the end of week that contains given date', () => {
  expect(getWeekEndForDate(new Date('07-23-2022')).toString()).toMatch(
    new Date('07-24-2022').toString()
  )
  expect(getWeekEndForDate(new Date('07-13-2022')).toString()).toMatch(
    new Date('07-17-2022').toString()
  )
})

test('get the start of week that contains given date', () => {
  expect(getWeekStartForDate(new Date('07-23-2022')).toString()).toMatch(
    new Date('07-18-2022').toString()
  )
  expect(getWeekStartForDate(new Date('07-30-2022')).toString()).toMatch(
    new Date('07-25-2022').toString()
  )
})

test('get the bounds of week that contains given date', () => {
  const bounds = getWeekBoundsForDate(new Date('07-23-2022'))

  expect(bounds[0].toString()).toMatch(new Date('07-18-2022').toString())
  expect(bounds[1].toString()).toMatch(new Date('07-24-2022').toString())
})

test('whether date is in range', () => {
  expect(
    isDateInRange(
      new Date('07-23-2022'),
      new Date('07-23-2022'),
      new Date('07-23-2022')
    )
  ).toBeTruthy()

  expect(
    isDateInRange(
      new Date('07-24-2022'),
      new Date('07-23-2022'),
      new Date('07-25-2022')
    )
  ).toBeTruthy()
})

test('whether date is not in range', () => {
  expect(
    isDateInRange(
      new Date('07-20-2022'),
      new Date('07-23-2022'),
      new Date('07-23-2022')
    )
  ).toBeFalsy()

  expect(
    isDateInRange(
      new Date('07-23-2022'),
      new Date('07-24-2022'),
      new Date('07-25-2022')
    )
  ).toBeFalsy()

  expect(
    isDateInRange(
      new Date('07-28-2022'),
      new Date('07-24-2022'),
      new Date('07-25-2022')
    )
  ).toBeFalsy()
})

test('add 3 days to date', () => {
  expect(addDaysToDate(3, new Date('07-24-2022')).toString()).toMatch(
    new Date('07-27-2022').toString()
  )

  expect(addDaysToDate(3, new Date('07-29-2022')).toString()).toMatch(
    new Date('08-01-2022').toString()
  )
})

test('adjust hours of date from Fullcalendar', () => {
  expect(
    adjustHoursOfDateFromFullcallendar(new Date('2022-07-17').toISOString())
  ).toMatch(new Date('2022-07-16T21:00:00.000Z').toISOString())

  expect(
    adjustHoursOfDateFromFullcallendar(
      new Date('2022-07-16T21:00:00.000Z').toISOString()
    )
  ).toMatch(new Date('2022-07-16T18:00:00.000Z').toISOString())
})
