import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface CalendarData {
  year: number
  month: number
  days: number
}

export default function CircularCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null)

  useEffect(() => {
    fetchCalendarData(currentDate.getFullYear(), currentDate.getMonth() + 1)
  }, [currentDate])

  const fetchCalendarData = (year: number, month: number) => {
    // Simulating an API call with local JSON data
    const daysInMonth = new Date(year, month, 0).getDate()
    const data: CalendarData = {
      year: year,
      month: month,
      days: daysInMonth
    }
    setCalendarData(data)
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const renderCalendar = () => {
    if (!calendarData) return null

    const firstDayOfMonth = new Date(calendarData.year, calendarData.month - 1, 1).getDay()
    const days = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>)
    }

    for (let i = 1; i <= calendarData.days; i++) {
      days.push(
        <div
          key={i}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            i === currentDate.getDate() && calendarData.month === currentDate.getMonth() + 1
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-secondary'
          }`}
        >
          {i}
        </div>
      )
    }

    return days
  }

  return (
    <div className="w-80 bg-background text-foreground rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>
    </div>
  )
}
