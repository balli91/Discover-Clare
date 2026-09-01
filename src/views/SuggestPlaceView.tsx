import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Compass,
  Footprints,
  Waves,
  Building2,
  CalendarCheck
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { CLARE_REGIONS } from '../data/clareData';
import { ContentType, RegionId } from '../types';

export const SuggestPlaceView: React.FC = () => {
  const [placeName, setPlaceName] = useState('');
  const [contentType, setContentType] = useState<ContentType>('natural_place');
  const [town, setTown] = useState('');
  const [region, setRegion] = useState<RegionId>('north-clare');
  const [description, setDescription] = useState('');
  const [whySpecial, setWhySpecial] = useState('');
  const [addressOrDirections, setAddressOrDirections] = useState('');
  const [website, setWebsite] = useState('');
  const [seasonalNotes, setSeasonalNotes] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (placeName && town && description && submitterName && submitterEmail) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      <SEO
        title="Suggest a Place or Experience | Discover Clare"
        description="Know a special limestone boreen, quiet Atlantic cove, or authentic family business in County Clare? Suggest a place for independent review by Discover Clare."
        canonical="/suggest-a-place"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-12 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Sparkles className="w-3.5 h-3.5 text-[#DCD6C8]" />
            Community & Local Knowledge
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Suggest a Place or Experience
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            County Clare is rich in quiet treasures that generic travel portals miss. If you know a remarkable spot, heritage site, coastal trail, or independent artisan that deserves independent review, tell us about it.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E4DB] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#EBF3F5] text-[#1B4B66] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2C3333]">
                Suggestion Submitted!
              </h2>
              <p className="text-[#5A6363] text-sm sm:text-base max-w-md mx-auto leading-relaxed font-light">
                Go raibh maith agat, <strong className="font-semibold text-[#2C3333]">{submitterName}</strong>! Our editorial team will independently review <strong className="font-semibold text-[#2C3333]">{placeName}</strong> in {town}. If it meets our standards for genuine quality, safety, and local value, we will curate and publish it.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setPlaceName('');
                    setTown('');
                    setDescription('');
                    setWhySpecial('');
                    setAddressOrDirections('');
                    setWebsite('');
                    setSeasonalNotes('');
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#E8E4DB] hover:bg-[#F2EFE9] text-[#2C3333] text-xs font-semibold transition-colors"
                >
                  Suggest Another Place
                </button>
                <Link
                  to="/explore"
                  className="px-6 py-2.5 rounded-full bg-[#1B4B66] text-white text-xs font-semibold transition-colors hover:bg-[#123447]"
                >
                  Explore Current Directory
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#2C3333]">
                  Place or Experience Details
                </h2>
                <p className="text-[#5A6363] text-xs sm:text-sm mt-1 font-light">
                  Tell us what kind of location this is and why it deserves independent recognition.
                </p>
              </div>

              {/* Content Type Selector */}
              <div>
                <label htmlFor="suggest-content-type" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-2">
                  What type of place is this? <span className="text-rose-600">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setContentType('natural_place')}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      contentType === 'natural_place' || contentType === 'viewpoint'
                        ? 'border-[#1B4B66] bg-[#F0F5F8] text-[#1B4B66] font-bold shadow-xs'
                        : 'border-[#E8E4DB] bg-white text-[#5A6363] hover:border-stone-400'
                    }`}
                  >
                    <Compass className="w-4 h-4 mb-1" />
                    <span>Natural Spot</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentType('walk')}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      contentType === 'walk' || contentType === 'scenic_route'
                        ? 'border-[#1B4B66] bg-[#F0F5F8] text-[#1B4B66] font-bold shadow-xs'
                        : 'border-[#E8E4DB] bg-white text-[#5A6363] hover:border-stone-400'
                    }`}
                  >
                    <Footprints className="w-4 h-4 mb-1" />
                    <span>Walk / Trail</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentType('venue')}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      contentType === 'venue'
                        ? 'border-[#1B4B66] bg-[#F0F5F8] text-[#1B4B66] font-bold shadow-xs'
                        : 'border-[#E8E4DB] bg-white text-[#5A6363] hover:border-stone-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1" />
                    <span>Venue / Pub / Eatery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentType('beach')}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      contentType === 'beach'
                        ? 'border-[#1B4B66] bg-[#F0F5F8] text-[#1B4B66] font-bold shadow-xs'
                        : 'border-[#E8E4DB] bg-white text-[#5A6363] hover:border-stone-400'
                    }`}
                  >
                    <Waves className="w-4 h-4 mb-1" />
                    <span>Beach / Cove</span>
                  </button>
                </div>
              </div>

              {/* Place Name & Nearest Town */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="suggest-place-name" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                    Name of Place or Spot <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="suggest-place-name"
                    type="text"
                    required
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    placeholder="e.g. Fanore Beach, Roadside Tavern"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="suggest-place-town" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                    Nearest Town / Village <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="suggest-place-town"
                    type="text"
                    required
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    placeholder="e.g. Ballyvaughan, Kilkee, Ennis"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                  />
                </div>
              </div>

              {/* Area Region Selection */}
              <div>
                <label htmlFor="suggest-place-region" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                  County Clare Area <span className="text-rose-600">*</span>
                </label>
                <select
                  id="suggest-place-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value as RegionId)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                >
                  {CLARE_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Directions / Location Coordinates */}
              <div>
                <label htmlFor="suggest-place-directions" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                  {contentType === 'venue' ? 'Street Address or Location Notes' : 'How to Reach It / Trailhead / Parking Notes'} (Optional)
                </label>
                <input
                  id="suggest-place-directions"
                  type="text"
                  value={addressOrDirections}
                  onChange={(e) => setAddressOrDirections(e.target.value)}
                  placeholder={
                    contentType === 'venue'
                      ? 'e.g. Main Street, Lisdoonvarna'
                      : 'e.g. Park at the lay-by 2km past the pier, follow the marked green trail'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                />
              </div>

              {/* Website or Online Reference */}
              <div>
                <label htmlFor="suggest-place-url" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                  Website, Social Link, or Maps URL (Optional)
                </label>
                <input
                  id="suggest-place-url"
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                />
              </div>

              {/* Description & Why It's Special */}
              <div>
                <label htmlFor="suggest-place-reason" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                  Why is this place special? What should travelers know? <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="suggest-place-reason"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the atmosphere, standout specialty, unique landscape, or practical tip (e.g. best at low tide, quietest before 10am)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white leading-relaxed"
                />
              </div>

              {/* Seasonal notes */}
              <div>
                <label htmlFor="suggest-seasonal-notes" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                  Seasonal Notes or Opening Period (Optional)
                </label>
                <input
                  id="suggest-seasonal-notes"
                  type="text"
                  value={seasonalNotes}
                  onChange={(e) => setSeasonalNotes(e.target.value)}
                  placeholder="e.g. April to October, or Accessible year-round"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                />
              </div>

              {/* Submitter details */}
              <div className="pt-4 border-t border-[#E8E4DB]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2C3333] mb-3">
                  Your Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="suggest-user-name" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="suggest-user-name"
                      type="text"
                      required
                      value={submitterName}
                      onChange={(e) => setSubmitterName(e.target.value)}
                      placeholder="e.g. Niall O'Halloran"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="suggest-user-email" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                      Your Email <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="suggest-user-email"
                      type="email"
                      required
                      value={submitterEmail}
                      onChange={(e) => setSubmitterEmail(e.target.value)}
                      placeholder="e.g. niall@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="suggest-place-submit-btn"
                className="w-full py-3.5 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit for Editorial Fact-Check</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Editorial Standards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F2EFE9] rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] space-y-4">
            <div className="flex items-center gap-2 text-[#1B4B66]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Independent Editorial Standard
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2C3333]">
              How We Review Suggestions
            </h3>
            <ul className="space-y-3 text-xs text-[#5A6363] leading-relaxed font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B4B66] mt-1.5 shrink-0" />
                <span><strong>Independent Fact-Checking:</strong> We verify the legal public access, physical parking feasibility, and terrain before listing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B4B66] mt-1.5 shrink-0" />
                <span><strong>Leave No Trace & Conservation:</strong> We ensure sensitive geological and ecological spots are treated with appropriate care and guidance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B4B66] mt-1.5 shrink-0" />
                <span><strong>No Pay-to-Play:</strong> Discover Clare verification is earned through genuine merit and accuracy, never purchased.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-3 text-xs text-[#5A6363]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#1B4B66] block">
              Are you a business owner?
            </span>
            <h4 className="text-base font-serif font-bold text-[#2C3333]">
              Register Your Clare Business
            </h4>
            <p className="font-light leading-relaxed">
              If you operate a licensed restaurant, accommodation, or guided experience in Clare, you can also register via our Business Partnership program.
            </p>
            <Link
              to="/about#for-businesses"
              className="inline-flex items-center gap-1 font-semibold text-[#1B4B66] hover:underline pt-1"
            >
              <span>Visit Business Registration Portal</span>
              <Compass className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
