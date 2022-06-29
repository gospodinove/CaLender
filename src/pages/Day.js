import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef } from 'react'
import { api } from '../utils/api'
import { isDateInRange } from '../utils/dates'
import CalendarNavigationBar from '../components/CalendarNavigationBar'

export default function Day({ onTimeSelected }) {
  const params = useParams()
  const dispatch = useDispatch()

  const calendarRef = useRef(null)

  const events = useSelector(store =>
    store.events.filter(event =>
      isDateInRange(
        new Date(event.start),
        new Date(params.date),
        new Date(params.date)
      )
    )
  )

  const fetchEvents = useCallback(async () => {
    try {
      const response = await api('events', 'GET', {
        startDate: params.date,
        endDate: params.date
      })

      if (!response.success) {
        // TODO: Error handling
        return
      }

      dispatch({
        type: 'events/add',
        payload: response.events
      })
    } catch {}
  }, [params.date, dispatch])

  useEffect(() => {
    calendarRef.current.getApi().gotoDate(params.date)
    fetchEvents()
  }, [fetchEvents, params.date])

  return (
    <>
      <CalendarNavigationBar data={{ type: 'day', date: params.date }} />
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        allDaySlot={false}
        height="auto"
        nowIndicator
        selectable
        select={onTimeSelected}
        events={events}
        headerToolbar={false}
        dayHeaders={false}
      />
    </>
  )
}

Day.propTypes = {
  onTimeSelected: PropTypes.func
}
