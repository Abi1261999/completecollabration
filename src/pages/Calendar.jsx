import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus, X } from 'lucide-react'

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const EVENT_COLORS = {
  teal: { bar: 'bg-teal-100 border-l-teal-500 text-teal-800', dot: 'bg-teal-500' },
  blue: { bar: 'bg-sky-100 border-l-sky-500 text-sky-800', dot: 'bg-sky-500' },
  yellow: { bar: 'bg-amber-100 border-l-amber-500 text-amber-800', dot: 'bg-amber-500' },
  green: { bar: 'bg-brand-green/15 border-l-brand-dark text-brand-dark', dot: 'bg-brand-dark' },
}

const COLOR_OPTIONS = Object.keys(EVENT_COLORS)

function dateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDateKey(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function isSameDay(left, right) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

function isToday(date) {
  return isSameDay(date, new Date())
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date, amount) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function createSeedEvents(referenceDate) {
  const year = referenceDate.getFullYear()
  const month = referenceDate.getMonth()
  const day = (offset) => new Date(year, month, offset)

  return [
    {
      id: 'seed-1',
      title: 'Call Back Priscilla',
      start: dateKey(day(3)),
      end: dateKey(day(5)),
      time: '10:00',
      color: 'teal',
      description: 'Follow-up call regarding the onboarding process and next steps.',
    },
    {
      id: 'seed-2',
      title: 'Meeting with Judith',
      start: dateKey(day(11)),
      end: dateKey(day(12)),
      time: '10:00',
      color: 'blue',
      description: 'Quarterly planning meeting with Judith to review project milestones.',
    },
    {
      id: 'seed-3',
      title: 'Meeting...',
      start: dateKey(day(11)),
      end: dateKey(day(11)),
      time: '10:00',
      color: 'blue',
      description: 'Short sync with the design team.',
    },
    {
      id: 'seed-4',
      title: 'Project "Rocket"',
      start: dateKey(day(16)),
      end: dateKey(day(18)),
      time: '10:00',
      color: 'yellow',
      description: 'Sprint review for Project Rocket deliverables and release timeline.',
    },
    {
      id: 'seed-5',
      title: 'Presentation',
      start: dateKey(day(25)),
      end: dateKey(day(26)),
      time: '10:00',
      color: 'green',
      description: 'Client presentation for the updated dashboard experience.',
    },
    {
      id: 'seed-6',
      title: 'Presentation',
      start: dateKey(day(25)),
      end: dateKey(day(26)),
      time: '10:00',
      color: 'green',
      description: 'Internal rehearsal before the client presentation.',
    },
    {
      id: 'seed-7',
      title: 'Team Standup',
      start: dateKey(day(8)),
      end: dateKey(day(8)),
      time: '09:00',
      color: 'teal',
      description: 'Daily standup with the product and engineering teams.',
    },
    {
      id: 'seed-8',
      title: 'Budget Review',
      start: dateKey(day(18)),
      end: dateKey(day(18)),
      time: '14:00',
      color: 'yellow',
      description: 'Finance review for Q4 budget allocations.',
    },
    {
      id: 'seed-9',
      title: 'Workshop',
      start: dateKey(day(18)),
      end: dateKey(day(18)),
      time: '11:00',
      color: 'blue',
      description: 'UX workshop for the mobile navigation flow.',
    },
    {
      id: 'seed-10',
      title: 'Demo Session',
      start: dateKey(day(18)),
      end: dateKey(day(18)),
      time: '15:30',
      color: 'green',
      description: 'Product demo for stakeholders.',
    },
    {
      id: 'seed-11',
      title: 'Partner Call',
      start: dateKey(day(18)),
      end: dateKey(day(18)),
      time: '16:30',
      color: 'teal',
      description: 'Partner integration status call.',
    },
    {
      id: 'seed-12',
      title: 'Retrospective',
      start: dateKey(day(18)),
      end: dateKey(day(18)),
      time: '17:00',
      color: 'yellow',
      description: 'Sprint retrospective with the delivery team.',
    },
  ]
}

function getMonthWeeks(year, month) {
  const firstOfMonth = new Date(year, month, 1)
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7
  const gridStart = addDays(firstOfMonth, -mondayOffset)
  const weeks = []

  for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
    const dates = Array.from({ length: 7 }, (_, dayIndex) => addDays(gridStart, weekIndex * 7 + dayIndex))
    weeks.push({ dates })
  }

  return weeks
}

function getWeekDates(referenceDate) {
  const mondayOffset = (referenceDate.getDay() + 6) % 7
  const weekStart = addDays(referenceDate, -mondayOffset)
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))
}

function eventOverlapsDate(event, date) {
  const current = startOfDay(date).getTime()
  const start = startOfDay(parseDateKey(event.start)).getTime()
  const end = startOfDay(parseDateKey(event.end)).getTime()
  return current >= start && current <= end
}

function compareEvents(left, right) {
  const startDiff = parseDateKey(left.start).getTime() - parseDateKey(right.start).getTime()
  if (startDiff !== 0) {
    return startDiff
  }

  return left.time.localeCompare(right.time)
}

function getWeekEventSegments(events, weekDates) {
  const weekStart = startOfDay(weekDates[0]).getTime()
  const weekEnd = startOfDay(weekDates[6]).getTime()

  return events
    .filter((event) => {
      const eventStart = startOfDay(parseDateKey(event.start)).getTime()
      const eventEnd = startOfDay(parseDateKey(event.end)).getTime()
      return eventEnd >= weekStart && eventStart <= weekEnd
    })
    .sort(compareEvents)
    .map((event, index) => {
      const eventStart = startOfDay(parseDateKey(event.start)).getTime()
      const eventEnd = startOfDay(parseDateKey(event.end)).getTime()
      const segmentStart = Math.max(0, Math.round((Math.max(eventStart, weekStart) - weekStart) / 86400000))
      const segmentEnd = Math.min(6, Math.round((Math.min(eventEnd, weekEnd) - weekStart) / 86400000))

      return {
        event,
        startCol: segmentStart + 1,
        span: segmentEnd - segmentStart + 1,
        lane: index,
      }
    })
}

function groupEventsByDate(events, dates) {
  return dates.map((date) => ({
    date,
    events: events.filter((event) => eventOverlapsDate(event, date)).sort(compareEvents),
  }))
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [view, setView] = useState('month')
  const [events, setEvents] = useState(() => createSeedEvents(new Date()))
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [draftDate, setDraftDate] = useState(() => dateKey(new Date()))

  const monthWeeks = useMemo(
    () => getMonthWeeks(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate],
  )

  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate])

  const goToToday = () => setCurrentDate(new Date())

  const goPrevious = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
      return
    }

    if (view === 'week') {
      setCurrentDate(addDays(currentDate, -7))
      return
    }

    setCurrentDate(addDays(currentDate, -1))
  }

  const goNext = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
      return
    }

    if (view === 'week') {
      setCurrentDate(addDays(currentDate, 7))
      return
    }

    setCurrentDate(addDays(currentDate, 1))
  }

  const openAddEvent = (date = currentDate) => {
    setDraftDate(dateKey(date))
    setIsAddOpen(true)
  }

  const handleSaveEvent = (eventData) => {
    setEvents((currentEvents) => [...currentEvents, { ...eventData, id: `event-${Date.now()}` }])
    setIsAddOpen(false)
  }

  const handleDeleteEvent = (eventId) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== eventId))
    setSelectedEvent(null)
  }

  const headerLabel =
    view === 'day'
      ? currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
      : `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-ink-900">Calendar</h1>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-medium text-white shadow-card hover:bg-brand-green"
          onClick={() => openAddEvent()}
        >
          <Plus size={16} />
          Add Event
        </button>
      </div>

      <section className="overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card">
        <div className="flex flex-col gap-4 border-b border-ink-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <IconButton label="Previous" onClick={goPrevious}>
                <ChevronLeft size={18} />
              </IconButton>
              <IconButton label="Next" onClick={goNext}>
                <ChevronRight size={18} />
              </IconButton>
            </div>
            <button
              className="rounded-xl border border-ink-100 px-4 py-2 text-sm font-medium text-ink-500 hover:bg-ink-50"
              onClick={goToToday}
            >
              Today
            </button>
            <h2 className="text-lg font-semibold text-ink-900 sm:ml-2">{headerLabel}</h2>
          </div>

          <ViewSwitcher view={view} onChange={setView} />
        </div>

        {view === 'month' ? (
          <MonthView
            weeks={monthWeeks}
            month={currentDate.getMonth()}
            events={events}
            onSelectEvent={setSelectedEvent}
            onAddEvent={openAddEvent}
          />
        ) : null}

        {view === 'week' ? (
          <WeekView
            weekDates={weekDates}
            events={events}
            onSelectEvent={setSelectedEvent}
            onAddEvent={openAddEvent}
          />
        ) : null}

        {view === 'day' ? (
          <DayView
            date={currentDate}
            events={events.filter((event) => eventOverlapsDate(event, currentDate)).sort(compareEvents)}
            onSelectEvent={setSelectedEvent}
            onAddEvent={() => openAddEvent(currentDate)}
          />
        ) : null}
      </section>

      {isAddOpen ? (
        <EventFormModal
          initialDate={draftDate}
          onClose={() => setIsAddOpen(false)}
          onSave={handleSaveEvent}
        />
      ) : null}

      {selectedEvent ? (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onDelete={handleDeleteEvent} />
      ) : null}
    </div>
  )
}

function ViewSwitcher({ view, onChange }) {
  const options = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
  ]

  return (
    <div className="inline-flex rounded-xl border border-ink-100 bg-ink-50 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            view === option.value ? 'bg-brand-dark text-white shadow-sm' : 'text-ink-500 hover:text-ink-700'
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function MonthView({ weeks, month, events, onSelectEvent, onAddEvent }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-7 border-b border-ink-100 bg-ink-50/60">
          {WEEKDAYS.map((day) => (
            <div key={day} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
              <span className="hidden md:inline">{day}</span>
              <span className="md:hidden">{day.slice(0, 3)}</span>
            </div>
          ))}
        </div>

        {weeks.map((week, weekIndex) => {
          const segments = getWeekEventSegments(events, week.dates)
          const overflowByCol = Array.from({ length: 7 }, () => 0)

          segments.forEach((segment, index) => {
            if (index >= 2) {
              for (let col = segment.startCol - 1; col < segment.startCol - 1 + segment.span; col += 1) {
                overflowByCol[col] += 1
              }
            }
          })

          return (
            <div key={`week-${weekIndex}`} className="border-b border-ink-100 last:border-b-0">
              <div className="grid grid-cols-7">
                {week.dates.map((date) => {
                  const outsideMonth = date.getMonth() !== month

                  return (
                    <button
                      key={dateKey(date)}
                      type="button"
                      className={`min-h-[92px] border-r border-ink-100 p-2 text-left last:border-r-0 ${
                        outsideMonth ? 'calendar-outside-month text-ink-300' : 'bg-white text-ink-700'
                      } hover:bg-ink-50/80`}
                      onDoubleClick={() => onAddEvent(date)}
                    >
                      <div className="flex justify-end">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                            isToday(date) ? 'bg-brand-dark text-white' : ''
                          }`}
                        >
                          {date.getDate()}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div
                className="relative grid grid-cols-7 gap-y-1 px-1 pb-2"
                style={{ minHeight: `${Math.max(2, Math.min(segments.length, 3)) * 28 + 8}px` }}
              >
                {segments.slice(0, 2).map((segment) => (
                  <button
                    key={`${segment.event.id}-${weekIndex}`}
                    type="button"
                    className={`mx-0.5 flex h-6 items-center justify-between gap-2 overflow-hidden rounded-md border-l-4 px-2 text-left text-xs font-medium ${EVENT_COLORS[segment.event.color].bar}`}
                    style={{ gridColumn: `${segment.startCol} / span ${segment.span}` }}
                    onClick={() => onSelectEvent(segment.event)}
                  >
                    <span className="truncate">{segment.event.title}</span>
                    <span className="shrink-0 text-[10px] opacity-80">{segment.event.time}</span>
                  </button>
                ))}

                {overflowByCol.map((count, colIndex) =>
                  count > 0 ? (
                    <div
                      key={`overflow-${weekIndex}-${colIndex}`}
                      className="mx-1 flex h-6 items-center justify-center rounded-md bg-amber-50 text-[10px] font-semibold text-amber-700"
                      style={{ gridColumn: `${colIndex + 1} / span 1` }}
                    >
                      +{count}
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekView({ weekDates, events, onSelectEvent, onAddEvent }) {
  const grouped = groupEventsByDate(events, weekDates)

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-7 border-b border-ink-100">
          {grouped.map(({ date }) => (
            <div key={dateKey(date)} className="border-r border-ink-100 px-3 py-4 text-center last:border-r-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{WEEKDAYS_SHORT[(date.getDay() + 6) % 7]}</p>
              <button
                type="button"
                className={`mt-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  isToday(date) ? 'bg-brand-dark text-white' : 'text-ink-700 hover:bg-ink-50'
                }`}
                onClick={() => onAddEvent(date)}
              >
                {date.getDate()}
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {grouped.map(({ date, events: dayEvents }) => (
            <div key={dateKey(date)} className="min-h-[320px] border-r border-ink-100 p-2 last:border-r-0">
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    className={`w-full rounded-lg border-l-4 px-2 py-2 text-left text-xs font-medium ${EVENT_COLORS[event.color].bar}`}
                    onClick={() => onSelectEvent(event)}
                  >
                    <p className="truncate">{event.title}</p>
                    <p className="mt-1 text-[10px] opacity-80">{event.time}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DayView({ date, events, onSelectEvent, onAddEvent }) {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-400">{WEEKDAYS[(date.getDay() + 6) % 7]}</p>
          <p className="text-xl font-semibold text-ink-900">
            {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <button
          className="rounded-xl border border-ink-100 px-4 py-2 text-sm font-medium text-ink-500 hover:bg-ink-50"
          onClick={onAddEvent}
        >
          Add to this day
        </button>
      </div>

      {events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event) => (
            <button
              key={event.id}
              type="button"
              className={`flex w-full items-start gap-3 rounded-xl border border-ink-100 p-4 text-left hover:bg-ink-50`}
              onClick={() => onSelectEvent(event)}
            >
              <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${EVENT_COLORS[event.color].dot}`} />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink-900">{event.title}</p>
                <p className="mt-1 text-sm text-ink-400">{formatEventRange(event)}</p>
                {event.description ? <p className="mt-2 text-sm text-ink-500">{event.description}</p> : null}
              </div>
              <span className="shrink-0 text-sm font-medium text-ink-500">{event.time}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-ink-100 px-6 py-16 text-center">
          <p className="text-ink-400">No events scheduled for this day.</p>
          <button className="mt-4 text-sm font-medium text-brand-dark hover:underline" onClick={onAddEvent}>
            Add your first event
          </button>
        </div>
      )}
    </div>
  )
}

function EventFormModal({ initialDate, onClose, onSave }) {
  const [form, setForm] = useState({
    title: '',
    start: initialDate,
    end: initialDate,
    time: '10:00',
    color: 'teal',
    description: '',
    location: '',
  })

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      return
    }

    const startDate = parseDateKey(form.start)
    const endDate = parseDateKey(form.end)
    if (endDate < startDate) {
      return
    }

    onSave({
      title: form.title.trim(),
      start: form.start,
      end: form.end,
      time: form.time,
      color: form.color,
      description: form.description.trim(),
      location: form.location.trim(),
    })
  }

  return (
    <Modal title="Add Event" onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField label="Event title">
          <input
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            className="h-11 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
            placeholder="Meeting with team"
            required
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Start date">
            <input
              type="date"
              value={form.start}
              onChange={(event) => updateField('start', event.target.value)}
              className="h-11 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
              required
            />
          </FormField>
          <FormField label="End date">
            <input
              type="date"
              value={form.end}
              min={form.start}
              onChange={(event) => updateField('end', event.target.value)}
              className="h-11 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
              required
            />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Time">
            <input
              type="time"
              value={form.time}
              onChange={(event) => updateField('time', event.target.value)}
              className="h-11 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
              required
            />
          </FormField>
          <FormField label="Color">
            <select
              value={form.color}
              onChange={(event) => updateField('color', event.target.value)}
              className="h-11 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
            >
              {COLOR_OPTIONS.map((color) => (
                <option key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Location">
          <input
            value={form.location}
            onChange={(event) => updateField('location', event.target.value)}
            className="h-11 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-700 outline-none focus:border-brand-dark"
            placeholder="Conference room A"
          />
        </FormField>

        <FormField label="Description">
          <textarea
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
            className="min-h-[96px] w-full rounded-xl border border-ink-100 px-4 py-3 text-sm text-ink-700 outline-none focus:border-brand-dark"
            placeholder="Add notes about this event"
          />
        </FormField>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="h-11 rounded-xl border border-ink-100 px-5 text-sm font-medium text-ink-500 hover:bg-ink-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-11 rounded-xl bg-brand-dark px-6 text-sm font-medium text-white hover:bg-brand-green"
          >
            Save Event
          </button>
        </div>
      </form>
    </Modal>
  )
}

function EventDetailModal({ event, onClose, onDelete }) {
  return (
    <Modal title="Event Details" onClose={onClose}>
      <div className="space-y-4">
        <div className={`rounded-xl border-l-4 p-4 ${EVENT_COLORS[event.color].bar}`}>
          <h3 className="text-lg font-semibold text-ink-900">{event.title}</h3>
          <p className="mt-1 text-sm text-ink-500">{formatEventRange(event)}</p>
        </div>

        <div className="space-y-3 text-sm text-ink-600">
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-ink-400" />
            <span>{event.time}</span>
          </div>
          {event.location ? (
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-ink-400" />
              <span>{event.location}</span>
            </div>
          ) : null}
        </div>

        {event.description ? (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">Description</p>
            <p className="text-sm leading-6 text-ink-600">{event.description}</p>
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
          <button
            type="button"
            className="h-11 rounded-xl border border-red-200 px-5 text-sm font-medium text-red-600 hover:bg-red-50"
            onClick={() => onDelete(event.id)}
          >
            Delete Event
          </button>
          <button
            type="button"
            className="h-11 rounded-xl bg-brand-dark px-6 text-sm font-medium text-white hover:bg-brand-green"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-ink-900/40" aria-label="Close dialog" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl2 bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-ink-900">{title}</h2>
          <button className="rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-ink-700" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink-500">{label}</span>
      {children}
    </label>
  )
}

function IconButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 text-ink-500 hover:bg-ink-50"
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  )
}

function formatEventRange(event) {
  const start = parseDateKey(event.start)
  const end = parseDateKey(event.end)
  const startLabel = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const endLabel = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return isSameDay(start, end) ? startLabel : `${startLabel} – ${endLabel}`
}
