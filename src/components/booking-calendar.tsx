"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Clock, Video, MapPin, ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay, startOfWeek, endOfWeek } from "date-fns"
import { fr } from "date-fns/locale/fr"

interface BookingCalendarProps {
  profileImage?: string
  name?: string
  consultationType?: string
  description?: string
  duration?: string
  meetingType?: string
  timezone?: string
  availableSlots?: string[]
}

export function BookingCalendar({
  profileImage = "/images/diallo.png",
  name = "Tidiane Diallo",
  consultationType = "Consultation de 30 Min",
  description = "Parlons de la façon dont nous pouvons aider votre entreprise.",
  duration = "30min",
  meetingType = "Google Meet",
  timezone = "Europe/Paris",
  availableSlots = ["12:00", "12:30", "13:00", "13:30"]
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Générer les jours du mois
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  const daysInMonth = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  // Jours de la semaine en français
  const weekDays = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"]

  // Dates disponibles (exemple : tous les jours sauf les weekends)
  const isDateAvailable = (date: Date) => {
    const day = getDay(date)
    // Disponible du lundi au vendredi (1-5)
    return day >= 1 && day <= 5 && isSameMonth(date, currentMonth)
  }

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date)
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
    setSelectedDate(null)
  }

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTime(time)
    setShowForm(true)
    setSubmitSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
          timezone: timezone,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "" })
        // Optionnel: ouvrir Google Calendar dans un nouvel onglet
        if (data.googleCalendarLink) {
          window.open(data.googleCalendarLink, "_blank")
        }
        // Fermer le formulaire après 3 secondes
        setTimeout(() => {
          setShowForm(false)
          setSelectedTime(null)
          setSubmitSuccess(false)
        }, 3000)
      } else {
        alert(data.error || "Erreur lors de l'envoi de la réservation")
      }
    } catch (error) {
      console.error("Erreur:", error)
      alert("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left: Consultant Information */}
      <div className="space-y-6">
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-[#2563EB]/20 via-background to-[#3B82F6]/10 p-1.5 shadow-lg">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-muted/50">
                <Image
                  src={profileImage}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-foreground">{name}</h3>
          <h4 className="text-xl font-semibold text-[#2563EB] mb-4">{consultationType}</h4>
          <p className="text-muted-foreground text-center lg:text-left mb-6">
            {description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="h-5 w-5 text-[#2563EB] flex-shrink-0" />
            <span className="text-muted-foreground">Nécessite une confirmation</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-5 w-5 text-[#2563EB] flex-shrink-0" />
            <span className="text-muted-foreground">{duration}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Video className="h-5 w-5 text-[#2563EB] flex-shrink-0" />
            <span className="text-muted-foreground">{meetingType}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-5 w-5 text-[#2563EB] flex-shrink-0" />
            <span className="text-muted-foreground">{timezone}</span>
          </div>
        </div>
      </div>

      {/* Right: Calendar and Time Slots */}
      <div className="space-y-6">
        {/* Calendar */}
        <div>
          {/* Month Navigation */}
          <div className="mb-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handlePrevMonth}
              className="hover:bg-[#2563EB]/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold text-foreground capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: fr })}
            </h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleNextMonth}
              className="hover:bg-[#2563EB]/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div 
                key={day} 
                className="text-center text-xs font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day, index) => {
              const isAvailable = isDateAvailable(day)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isCurrentMonth = isSameMonth(day, currentMonth)

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day)}
                  disabled={!isAvailable}
                  className={`
                    aspect-square rounded-md text-sm transition-all font-medium
                    ${isSelected
                      ? "bg-[#2563EB] text-white font-semibold shadow-md scale-105"
                      : isAvailable
                        ? "bg-muted hover:bg-[#2563EB]/10 hover:text-[#2563EB] cursor-pointer text-foreground hover:scale-105"
                        : "text-muted-foreground/30 cursor-not-allowed bg-transparent"
                    }
                    ${!isCurrentMonth ? "opacity-40" : ""}
                  `}
                >
                  {format(day, "d")}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Date and Time Slots */}
        {selectedDate && !showForm && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground lowercase">
              {format(selectedDate, "EEE. dd", { locale: fr })}
            </h3>
            <div className="space-y-2">
              {availableSlots.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className="w-full justify-start hover:bg-[#2563EB]/10 hover:border-[#2563EB] hover:text-[#2563EB] bg-muted/50 transition-all"
                  onClick={() => handleTimeSlotSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="text-xs text-muted-foreground">
                Les créneaux horaires sont affichés dans votre fuseau horaire ({timezone})
              </p>
            </div>
          </div>
        )}

        {/* Booking Form */}
        {showForm && selectedDate && selectedTime && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-[#3B82F6]/5 border-2 border-[#2563EB]/20">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Réserver votre créneau
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {format(selectedDate, "EEEE dd MMMM yyyy", { locale: fr })} à {selectedTime}
              </p>

              {submitSuccess ? (
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                    ✅ Réservation envoyée avec succès! Un email de confirmation a été envoyé.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Confirmer la réservation
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false)
                        setSelectedTime(null)
                        setSubmitSuccess(false)
                      }}
                      disabled={isSubmitting}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {!selectedDate && (
          <div className="p-4 rounded-lg bg-muted/50 border text-center">
            <p className="text-sm text-muted-foreground">
              Sélectionnez une date pour voir les créneaux disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

