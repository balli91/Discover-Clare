import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Music, 
  ExternalLink, 
  PlusCircle, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { CLARE_EVENTS } from '../data/clareData';
import { SEO } from '../components/SEO';

export const EventsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form state
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');

  const filteredEvents = CLARE_EVENTS.filter((e) => {
    if (selectedCategory === 'all') return true;
    return e.category === selectedCategory;
  });

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventName && eventDate && eventLocation && organizerEmail) {
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setShowSubmitModal(false);
        setEventName('');
        setEventDate('');
        setEventLocation('');
        setEventDescription('');
        setOrganizerEmail('');
      }, 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <SEO
        title="Events & Festivals in County Clare | Music, Trad & Culture"
        description="Explore premier festivals and traditional Irish music gatherings in Clare: Willie Clancy Summer School, Fleadh Cheoil, Lisdoonvarna Matchmaking Festival, and Doolin Folk Festival."
        canonical="/events"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Calendar className="w-3.5 h-3.5" />
            Festivals & Trad Sessions
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            County Clare Events & Festivals
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            World-renowned traditional music gatherings, food festivals, folk concerts, and local community events across the Banner County.
          </p>
        </div>
        <button
          onClick={() => setShowSubmitModal(true)}
          id="open-event-submit-btn"
          className="px-5 py-3 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shrink-0 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit an Event</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Events' },
          { id: 'traditional-music', label: 'Traditional Music' },
          { id: 'festival', label: 'Festivals' },
          { id: 'food-drink', label: 'Food & Drink' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
              selectedCategory === cat.id
                ? 'bg-[#1B4B66] text-white border-[#1B4B66] shadow-sm'
                : 'bg-[#F2EFE9] text-[#2C3333] border-[#E8E4DB] hover:bg-[#E8E4DB]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            id={`event-card-${event.id}`}
            className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DB] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Event Image & Date Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#2C3333]">
                <img
                  src={event.heroImage}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3333]/80 via-transparent to-transparent"></div>

                {/* Floating Date Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-2 text-center shadow-md border border-[#E8E4DB] w-12 sm:w-14">
                  <span className="block text-[10px] font-bold text-[#1B4B66] uppercase tracking-wider">
                    {event.month}
                  </span>
                  <span className="block text-lg font-serif font-extrabold text-[#2C3333] leading-none">
                    {event.day}
                  </span>
                </div>

                {event.isAnnualFestival && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#DCD6C8] text-[#2C3333] shadow-sm">
                    Annual Signature Event
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-stone-100 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1 font-medium bg-[#2C3333]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#DCD6C8]" />
                    {event.location}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B4B66] block">
                  {event.dateDisplay}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C3333] group-hover:text-[#1B4B66] transition-colors">
                  {event.title}
                </h3>
                <p className="text-[#5A6363] text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-[#E8E4DB] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2C3333]">
                  {event.admission}
                </span>
                {event.ticketUrl && (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#1B4B66] hover:text-[#123447]"
                  >
                    <span>Tickets & Info</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Event Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2C3333]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="relative bg-[#F9F8F5] text-[#2C3333] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#E8E4DB] animate-in fade-in zoom-in-95 duration-200 p-6 sm:p-8">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#E8E4DB] text-[#5A6363]"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedSuccess ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#1B4B66] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                  Event Submitted for Review
                </h3>
                <p className="text-[#5A6363] text-xs sm:text-sm max-w-xs mx-auto font-light">
                  Thank you! Our editorial team will review your Clare event and publish it on the Discover Clare calendar within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block mb-1">
                  Community Calendar
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#2C3333] mb-2">
                  Submit a County Clare Event
                </h3>
                <p className="text-[#5A6363] text-xs mb-6 font-light">
                  Add your festival, traditional music session, market, or concert to the public Discover Clare guide.
                </p>

                <form onSubmit={handleSubmitEvent} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label htmlFor="event-name" className="block font-semibold text-[#2C3333] mb-1">Event Title</label>
                    <input
                      id="event-name"
                      type="text"
                      required
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="e.g. Ennistymon Summer Folk Session"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="event-date" className="block font-semibold text-[#2C3333] mb-1">Date & Time</label>
                      <input
                        id="event-date"
                        type="text"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        placeholder="e.g. Aug 15, 2026 (8 PM)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                      />
                    </div>
                    <div>
                      <label htmlFor="event-location" className="block font-semibold text-[#2C3333] mb-1">Location / Venue</label>
                      <input
                        id="event-location"
                        type="text"
                        required
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. Doolin / Lahinch"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="event-organizer-email" className="block font-semibold text-[#2C3333] mb-1">Organizer Email</label>
                    <input
                      id="event-organizer-email"
                      type="email"
                      required
                      value={organizerEmail}
                      onChange={(e) => setOrganizerEmail(e.target.value)}
                      placeholder="For listing confirmation"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                    />
                  </div>

                  <div>
                    <label htmlFor="event-description" className="block font-semibold text-[#2C3333] mb-1">Description & Details</label>
                    <textarea
                      id="event-description"
                      rows={3}
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Tell visitors what to expect, ticket costs, musicians performing..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-semibold text-sm transition-colors shadow-sm mt-2"
                  >
                    Submit Event for Free
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
