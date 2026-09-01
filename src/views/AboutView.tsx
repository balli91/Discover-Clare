import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Send,
  CalendarCheck,
  Flag,
  Info,
  Check,
  X
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { VerifiedBadge } from '../components/VerifiedBadge';

export const AboutView: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('food');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [town, setTown] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName && contactName && email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
      <SEO
        title="About Discover Clare | Editorial Standards & Verification"
        description="Learn about Discover Clare's editorial standards, how our independent verification badge works, and our mission to highlight the best of County Clare."
        canonical="/about"
      />

      {/* 1. MISSION & EDITORIAL IDENTITY BANNER */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-12 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Curated Local Guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            About Discover Clare
          </h1>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            Discover Clare is a curated, independently verified guide to County Clare. We exist to help visitors and locals experience the Banner County with depth, nuance, and factual trustworthiness.
          </p>
        </div>
      </div>

      {/* 2. VERIFIED BADGE & EDITORIAL STANDARDS (DEDICATED SECTION) */}
      <section id="verification-standard" className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E8E4DB] shadow-sm space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-[#1B4B66]">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Editorial Integrity & Verification
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3333]">
              What "Verified by Discover Clare" Means
            </h2>
            <Link
              to="/how-we-verify"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1B4B66] text-white hover:bg-[#153a4f] text-xs font-semibold shrink-0 transition-colors shadow-xs"
            >
              <span>Full Verification Policy</span>
              <span>→</span>
            </Link>
          </div>
          <p className="text-[#5A6363] text-sm sm:text-base leading-relaxed font-light">
            When you see the <span className="font-semibold text-[#1B4B66]">Verified</span> badge beside a listing or natural spot on Discover Clare, here is what it communicates:
          </p>
        </div>

        {/* Live Visual Badge Demonstration */}
        <div className="p-6 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <VerifiedBadge status="verified" variant="compact" />
              <span className="text-xs font-serif font-bold text-[#2C3333]">
                Discover Clare Verification Guarantee of Review
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#5A6363] bg-white px-3 py-1 rounded-full border border-[#E8E4DB]">
              <CalendarCheck className="w-3.5 h-3.5 text-[#1B4B66]" />
              <span>Time-stamped editorial fact-check</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#2C3333] leading-relaxed font-light italic bg-white p-4 rounded-xl border border-[#E8E4DB]">
            "This place or experience has been independently reviewed by Discover Clare. We check that the listing is genuine and that the key information we publish is accurate to the best of our knowledge at the time of verification."
          </p>
        </div>

        {/* Verification Definition Matrix (What It Is vs What It Is Not) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#F4F8F6] border border-[#D1E6DC] space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Check className="w-5 h-5 text-emerald-700" />
              <h3 className="font-serif text-base text-[#2C3333]">What Verification IS</h3>
            </div>
            <ul className="space-y-3 text-xs text-[#4A5555] leading-relaxed font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>Factual Fact-Check:</strong> We verify the physical location, public access, parking feasibility, terrain, and primary operational details.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>Independent Research:</strong> Curated by local researchers who know Clare’s roads, tides, and heritage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>Time-Stamped:</strong> Every review reflects the state of the listing when last audited.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>Open to Community Corrections:</strong> Readers and operators can submit corrections anytime.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF6F4] border border-[#EEDCD3] space-y-4">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <X className="w-5 h-5 text-rose-700" />
              <h3 className="font-serif text-base text-[#2C3333]">What Verification IS NOT</h3>
            </div>
            <ul className="space-y-3 text-xs text-[#5A6363] leading-relaxed font-light">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span><strong>Not a Commercial Endorsement:</strong> We do not sell verification or guarantee personal tastes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span><strong>Not Permanent Accuracy:</strong> Businesses change hours, trails suffer weather events, and seasons shift.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span><strong>Not Pay-to-Play:</strong> No venue can pay to receive verification or suppress honest editorial tips.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span><strong>Not Automatic Publication:</strong> Being published is separate from being verified. All live listings must meet our publication baseline.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Reader Corrections Callout */}
        <div className="p-6 rounded-2xl bg-[#F2EFE9] border border-[#E8E4DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-[#1B4B66] flex items-center justify-center shrink-0 border border-[#E8E4DB]">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#2C3333] text-sm">
                Help Keep Discover Clare Accurate
              </h4>
              <p className="text-xs text-[#5A6363] font-light leading-relaxed">
                Notice a closed trail, changed opening time, or outdated detail? Our editorial desk reviews every reader submission.
              </p>
            </div>
          </div>
          <Link
            to="/contact?category=report-error"
            className="px-5 py-2.5 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white text-xs font-semibold shrink-0 transition-colors shadow-sm"
          >
            Submit an Editorial Correction →
          </Link>
        </div>
      </section>

      {/* 3. OUR VALUES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E4DB] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F2EFE9] text-[#1B4B66] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2C3333]">
            Independent Local Curation
          </h3>
          <p className="text-[#5A6363] text-sm leading-relaxed font-light">
            We are not a generic web directory or scraped database. Every attraction, restaurant, and hidden gem is curated based on genuine quality, local distinctiveness, and authentic heritage.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E4DB] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F2EFE9] text-[#1B4B66] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2C3333]">
            Beyond the Coach Tours
          </h3>
          <p className="text-[#5A6363] text-sm leading-relaxed font-light">
            While we celebrate iconic world wonders like the Cliffs of Moher, our passion is illuminating the quiet limestone boreens, sacred wells, and family smokehouses that reward curious travelers.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E4DB] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F2EFE9] text-[#1B4B66] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2C3333]">
            Supporting Clare Communities
          </h3>
          <p className="text-[#5A6363] text-sm leading-relaxed font-light">
            Tourism should enrich local communities and protect delicate ecosystems. We champion local food provenance, Leave No Trace conservation, and independent Banner County businesses.
          </p>
        </div>
      </div>

      {/* 4. EDITORIAL TRUST PRINCIPLE: VERIFIED != SPOTLIGHT */}
      <section className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E8E4DB] shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-[#1B4B66]">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Core Trust Guarantee
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3333]">
            Verified ≠ Spotlight
          </h2>
          <p className="text-[#5A6363] text-sm sm:text-base leading-relaxed font-light">
            Discover Clare maintains a strict, non-negotiable separation between editorial fact-checking and commercial visibility.
          </p>
        </div>

        {/* The Golden Rule Quote Box */}
        <div className="p-6 rounded-2xl bg-[#1B4B66] text-white border border-[#123447] text-center space-y-2">
          <p className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#DCD6C8]">
            "Businesses can pay for visibility. They cannot pay for trust."
          </p>
          <p className="text-xs sm:text-sm text-stone-200 font-light max-w-2xl mx-auto">
            Payment never influences verification status, editorial rankings, inclusion decisions, or factual accuracy on Discover Clare.
          </p>
        </div>

        {/* Two-Column Comparison: Verified vs Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Column 1: Verified by Discover Clare */}
          <div className="p-6 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1B4B66] text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
                <h3 className="font-serif text-lg font-bold text-[#2C3333]">
                  Verified by Discover Clare
                </h3>
              </div>
              <p className="text-xs text-[#5A6363] leading-relaxed font-light">
                An independent editorial review. We check that the listing is genuine and that key published details (access, terrain, coordinates, opening facts) are accurate to the best of our knowledge.
              </p>
              <ul className="space-y-2 text-xs text-[#4A5555] font-light">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Cannot be bought, sponsored, or upgraded for a fee</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Independent of commercial partnerships</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Time-stamped and subject to periodic re-review</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-[#E8E4DB] text-[11px] text-[#5A6363]">
              Purpose: <strong>Editorial Accuracy & Reader Trust</strong>
            </div>
          </div>

          {/* Column 2: Spotlight Partner */}
          <div className="p-6 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCD6C8] text-[#2C3333] border border-[#CBC4B4]">
                  <Sparkles className="w-3.5 h-3.5 text-[#1B4B66]" />
                  Spotlight
                </span>
                <h3 className="font-serif text-lg font-bold text-[#2C3333]">
                  Spotlight Partner
                </h3>
              </div>
              <p className="text-xs text-[#5A6363] leading-relaxed font-light">
                A commercial visibility opportunity for businesses seeking enhanced exposure, prominent placement, and custom itineraries across our discovery platform.
              </p>
              <ul className="space-y-2 text-xs text-[#4A5555] font-light">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1B4B66] shrink-0" />
                  <span>Enhanced visual presentation & booking button placement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1B4B66] shrink-0" />
                  <span>Does NOT automatically grant the Verified badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1B4B66] shrink-0" />
                  <span>Does NOT alter editorial tips or factual reporting</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-[#E8E4DB] text-[11px] text-[#5A6363]">
              Purpose: <strong>Commercial Business Visibility</strong>
            </div>
          </div>
        </div>

        {/* 4 Permutation Combinations Explainer */}
        <div className="p-4 rounded-xl bg-[#F2EFE9] border border-[#E8E4DB] text-xs text-[#5A6363] space-y-1.5 font-light">
          <span className="font-bold text-[#2C3333] block">Clear Independence Matrix:</span>
          <p>
            A business on Discover Clare may be: (1) <strong>Verified but not a Spotlight Partner</strong> (most listings); (2) <strong>A Spotlight Partner but not yet Verified</strong>; (3) <strong>Both Verified and a Spotlight Partner</strong>; or (4) <strong>Neither</strong>. The two systems remain completely independent.
          </p>
        </div>
      </section>

      {/* 5. BUSINESS PARTNERSHIP & ONBOARDING SECTION */}
      <div id="for-businesses" className="bg-[#F2EFE9] rounded-3xl p-6 sm:p-12 border border-[#E8E4DB] space-y-12">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
            For Local Operators & Artisans
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3333]">
            Partner with Discover Clare
          </h2>
          <p className="text-[#5A6363] text-sm sm:text-base leading-relaxed font-light">
            Are you running a hotel, B&B, seafood restaurant, activity centre, guided tour, craft workshop, or festival in County Clare? Reach thousands of discerning travelers seeking authentic experiences.
          </p>
        </div>

        {/* Partnership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E4DB] flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#5A6363] uppercase tracking-wider block">Community</span>
              <h4 className="text-lg font-serif font-bold text-[#2C3333]">Basic Directory Listing</h4>
              <p className="text-xs text-[#5A6363] font-light">Free forever for verified independent Clare operators.</p>
              <div className="text-2xl font-serif font-bold text-[#2C3333] pt-2">Free</div>
              <ul className="space-y-2 text-xs text-[#5A6363] pt-4 border-t border-[#E8E4DB] font-light">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#1B4B66]" /> Standard listing with location & category</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#1B4B66]" /> Inclusion in geographic directory search</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#1B4B66]" /> Basic contact & website link</li>
              </ul>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="bg-[#1B4B66] text-white p-6 rounded-2xl border border-[#123447] shadow-xl flex flex-col justify-between space-y-4 relative">
            <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#DCD6C8] text-[#2C3333] uppercase tracking-wider">
              Most Popular
            </span>
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#DCD6C8] uppercase tracking-wider block">Spotlight</span>
              <h4 className="text-lg font-serif font-bold text-white">Featured Business Listing</h4>
              <p className="text-xs text-stone-200 font-light">Enhanced visibility with photography & direct booking links.</p>
              <div className="text-2xl font-serif font-bold text-white pt-2">Local Partner</div>
              <ul className="space-y-2 text-xs text-stone-200 pt-4 border-t border-white/20 font-light">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#DCD6C8]" /> High-res photo gallery & dedicated badge</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#DCD6C8]" /> "Discover Clare Local Tip" callout box</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#DCD6C8]" /> Direct booking link (0% commissions)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#DCD6C8]" /> Inclusion in "What Can I Do Today?" widget</li>
              </ul>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E4DB] flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#5A6363] uppercase tracking-wider block">Signature</span>
              <h4 className="text-lg font-serif font-bold text-[#2C3333]">Destination Partner</h4>
              <p className="text-xs text-[#5A6363] font-light">Comprehensive editorial features, custom itineraries, & social features.</p>
              <div className="text-2xl font-serif font-bold text-[#2C3333] pt-2">Custom</div>
              <ul className="space-y-2 text-xs text-[#5A6363] pt-4 border-t border-[#E8E4DB] font-light">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#1B4B66]" /> Homepage spotlight & banner placement</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#1B4B66]" /> Inclusion in custom curated itineraries</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#1B4B66]" /> Dedicated editorial story feature</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Business Inquiry Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] max-w-2xl mx-auto shadow-sm">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#1B4B66] mx-auto" />
              <h3 className="text-2xl font-serif font-bold text-[#2C3333]">
                Inquiry Received
              </h3>
              <p className="text-[#5A6363] text-sm font-light">
                Thank you, {contactName}! Our County Clare partnership coordinator will review {businessName} and respond to {email} within 24–48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block mb-1">
                  Partner With Us
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                  Register Your Clare Business
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="partner-business-name" className="block font-semibold text-[#2C3333] mb-1">Business Name</label>
                  <input
                    id="partner-business-name"
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Burren Wild Tours"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                  />
                </div>
                <div>
                  <label htmlFor="partner-category" className="block font-semibold text-[#2C3333] mb-1">Category</label>
                  <select
                    id="partner-category"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] text-[#2C3333] focus:outline-none focus:border-[#1B4B66] bg-white"
                  >
                    <option value="food">Food & Drink / Pub</option>
                    <option value="stay">Accommodation (Hotel / B&B / Glamping)</option>
                    <option value="activity">Activities / Surf / Guided Tours</option>
                    <option value="attraction">Attraction / Museum / Farm</option>
                    <option value="event">Festival / Event Organizer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="partner-contact-name" className="block font-semibold text-[#2C3333] mb-1">Contact Person</label>
                  <input
                    id="partner-contact-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Sean Kelly"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                  />
                </div>
                <div>
                  <label htmlFor="partner-email" className="block font-semibold text-[#2C3333] mb-1">Email Address</label>
                  <input
                    id="partner-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@business.ie"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="partner-town" className="block font-semibold text-[#2C3333] mb-1">Town / Location in Clare</label>
                  <input
                    id="partner-town"
                    type="text"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    placeholder="e.g. Ennistymon / Doolin"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                  />
                </div>
                <div>
                  <label htmlFor="partner-website" className="block font-semibold text-[#2C3333] mb-1">Website or Social URL</label>
                  <input
                    id="partner-website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="partner-message" className="block font-semibold text-[#2C3333] mb-1">Tell Us About Your Business</label>
                <textarea
                  id="partner-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide details about your opening hours, specialties, or what makes your offering unique in Clare..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DB] bg-white text-[#2C3333] focus:outline-none focus:border-[#1B4B66]"
                />
              </div>

              <button
                type="submit"
                id="partner-form-submit-btn"
                className="w-full py-3.5 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Business Registration Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
