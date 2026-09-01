import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Flag, 
  Building2, 
  Sparkles, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { SEO } from '../components/SEO';

type ContactCategory = 'general' | 'report-error' | 'partner' | 'suggest-place' | 'feedback';

export const ContactView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as ContactCategory) || 'general';
  const initialSubject = searchParams.get('subject') || '';

  const [category, setCategory] = useState<ContactCategory>(initialCategory);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [placeRef, setPlaceRef] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync category & subject if query parameters change
  useEffect(() => {
    const catParam = searchParams.get('category') as ContactCategory;
    if (catParam) {
      setCategory(catParam);
    }
    const subjParam = searchParams.get('subject');
    if (subjParam) {
      setSubject(subjParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      <SEO
        title="Contact Discover Clare | Editorial Corrections & Inquiries"
        description="Get in touch with Discover Clare's independent editorial team. Report factual corrections, ask questions, or connect with our County Clare researchers."
        canonical="/contact"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-12 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Mail className="w-3.5 h-3.5" />
            Editorial Communications
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Contact Discover Clare
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            We are an independent, community-driven guide dedicated to County Clare. Whether you have noticed an outdated schedule, want to submit a correction, or have a question, our editorial team is here to help.
          </p>
        </div>
      </div>

      {/* Main Grid: Form + Quick Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E4DB] shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#EBF3F5] text-[#1B4B66] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2C3333]">
                Message Received
              </h2>
              <p className="text-[#5A6363] text-sm sm:text-base max-w-md mx-auto leading-relaxed font-light">
                Thank you for contacting Discover Clare, <strong className="font-semibold text-[#2C3333]">{name}</strong>. Our editorial team will review your message regarding <span className="italic">"{subject || category}"</span> and follow up at <strong className="font-semibold text-[#2C3333]">{email}</strong> within 24–48 hours.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#E8E4DB] hover:bg-[#F2EFE9] text-[#2C3333] text-xs font-semibold transition-colors"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#2C3333]">
                  Send a Message
                </h2>
                <p className="text-[#5A6363] text-xs sm:text-sm mt-1 font-light">
                  Fill out the details below. For factual corrections, please include the place name or relevant links.
                </p>
              </div>

              {/* Inquiry Category */}
              <div>
                <label htmlFor="contact-category" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                  Reason for Contact
                </label>
                <select
                  id="contact-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ContactCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="report-error">Report Error / Outdated Information</option>
                  <option value="partner">Business Partnership & Directory Listing</option>
                  <option value="suggest-place">Suggest a Place / Hidden Gem</option>
                  <option value="feedback">Editorial Feedback & Suggestion</option>
                </select>
              </div>

              {/* Two-column: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                    Your Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aoife Ní Bhriain"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. aoife@example.ie"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                  Subject / Heading
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Correction for Doolin Ferry times"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                />
              </div>

              {/* Optional Place Reference */}
              {(category === 'report-error' || category === 'partner' || category === 'suggest-place') && (
                <div>
                  <label htmlFor="contact-place-ref" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                    Related Place or Town in Clare (Optional)
                  </label>
                  <input
                    id="contact-place-ref"
                    type="text"
                    value={placeRef}
                    onChange={(e) => setPlaceRef(e.target.value)}
                    placeholder="e.g. Poulnabrone Dolmen / Ennistymon"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-[#2C3333] mb-1.5">
                  Your Message <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, correction, or note for the editorial team..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-sm text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white leading-relaxed"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full py-3.5 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Editorial Team</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Editorial Standards & Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Channels Cards */}
          <div className="bg-[#F2EFE9] rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] space-y-6">
            <h3 className="text-lg font-serif font-bold text-[#2C3333]">
              Specialized Portals
            </h3>

            <div className="space-y-4">
              <Link
                to="/suggest-a-place"
                className="p-4 rounded-2xl bg-white border border-[#E8E4DB] hover:border-[#1B4B66] shadow-sm block transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBF3F5] text-[#1B4B66] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#2C3333] group-hover:text-[#1B4B66] transition-colors">
                      Suggest a Place or Hidden Gem →
                    </h4>
                    <p className="text-xs text-[#5A6363] mt-1 font-light leading-relaxed">
                      Know a limestone trail, sea arch, or local smokehouse that deserves inclusion?
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                to="/about#for-businesses"
                className="p-4 rounded-2xl bg-white border border-[#E8E4DB] hover:border-[#1B4B66] shadow-sm block transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBF3F5] text-[#1B4B66] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#2C3333] group-hover:text-[#1B4B66] transition-colors">
                      Clare Business Registration →
                    </h4>
                    <p className="text-xs text-[#5A6363] mt-1 font-light leading-relaxed">
                      Are you a Clare hospitality, food, or activity operator? Join the directory.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Editorial Integrity Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-3.5">
            <div className="flex items-center gap-2 text-[#1B4B66]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Independent Editorial Guarantee
              </span>
            </div>
            <h4 className="text-base font-serif font-bold text-[#2C3333]">
              How Corrections Are Handled
            </h4>
            <p className="text-[#5A6363] text-xs leading-relaxed font-light">
              We independently verify every piece of information published on Discover Clare. When an error is reported, our researchers verify the update directly with on-the-ground sources and amend listings within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
