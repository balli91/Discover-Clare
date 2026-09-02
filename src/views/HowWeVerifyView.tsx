import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  CalendarCheck, 
  Flag, 
  ArrowRight, 
  MapPin, 
  Globe, 
  Phone, 
  Clock, 
  FileText, 
  Tag, 
  Camera, 
  Coins,
  Sparkles,
  HelpCircle,
  Award,
  Compass
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { VerifiedBadge } from '../components/VerifiedBadge';

export const HowWeVerifyView: React.FC = () => {
  const verificationChecksList = [
    {
      icon: MapPin,
      title: '1. Location & Access Verification',
      description: 'We verify the exact geographic coordinates, road access, parking feasibility, trailheads, and accessibility constraints across County Clare.'
    },
    {
      icon: Globe,
      title: '2. Official Digital Channels',
      description: 'We audit and link only genuine, operational websites, official booking portals, and authentic public information channels.'
    },
    {
      icon: Phone,
      title: '3. Contact & Operator Details',
      description: 'We verify direct phone numbers, email addresses, and official management bodies (OPW, Clare County Council, private operators).'
    },
    {
      icon: Clock,
      title: '4. Seasonality & Opening Patterns',
      description: 'We check seasonal operating windows (summer vs winter schedules, tide dependencies, daylight-only access, booking-required slots).'
    },
    {
      icon: FileText,
      title: '5. Original Editorial Description',
      description: 'Every description is independently researched and written by Discover Clare. We do not copy marketing blurbs or scrape generic directory copy.'
    },
    {
      icon: Coins,
      title: '6. Admission & Pricing Transparency',
      description: 'We clarify whether public access is entirely free, requires parking/amenity fees, or charges standard visitor admission.'
    },
    {
      icon: Camera,
      title: '7. Accurate Visual Representation',
      description: 'We source high-fidelity, representative photography that faithfully portrays the actual setting, terrain, and atmosphere.'
    },
    {
      icon: Tag,
      title: '8. Regional & Category Taxonomy',
      description: 'We assign each listing to one of the 5 canonical Clare regions and appropriate content types (physical venue, walk, natural landmark, scenic route).'
    }
  ];

  const statusDefinitions = [
    {
      status: 'verified',
      badgeLabel: 'Verified by Discover Clare',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      tagColor: 'bg-[#1B4B66] text-white',
      summary: 'Fully reviewed and fact-checked across all core editorial criteria.',
      publicVisibility: 'Displays the official "Verified by Discover Clare" badge on public guide pages.'
    },
    {
      status: 'partially_verified',
      badgeLabel: 'Partially Verified',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      tagColor: 'bg-amber-700 text-white',
      summary: 'Preliminary desk review completed; specific operational details (e.g. seasonal winter schedule) awaiting confirmation.',
      publicVisibility: 'Published if meeting editorial safety baselines, but does NOT display the verified trust badge.'
    },
    {
      status: 'needs_review',
      badgeLabel: 'Needs Review',
      color: 'bg-rose-50 text-rose-800 border-rose-200',
      tagColor: 'bg-rose-700 text-white',
      summary: 'Flagged for re-verification due to reader reports, seasonal shifts, ownership changes, or scheduled review dates.',
      publicVisibility: 'Badge is suppressed until an editor audits and confirms updated facts.'
    },
    {
      status: 'unverified',
      badgeLabel: 'Unverified / Researched',
      color: 'bg-stone-50 text-stone-700 border-stone-200',
      tagColor: 'bg-stone-600 text-white',
      summary: 'Cataloged in our regional research inventory, but has not yet undergone complete independent verification.',
      publicVisibility: 'Does not display any verified trust signals.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      <SEO
        title="How We Verify Listings | Editorial Standards & Fact-Checking | Discover Clare"
        description="Discover Clare's independent verification process. Learn how our editorial desk fact-checks locations, access, opening patterns, and practical details across County Clare."
        canonical="/how-we-verify"
      />

      {/* 1. HERO HEADER */}
      <section className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-12 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Editorial Trust System
            </span>
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">V1.0</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            How We Independently Verify Listings
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            Discover Clare is built on editorial trust. When you travel across the Burren, West Clare, or Lough Derg, you need reliable, fact-checked information. Here is how our verification standard works and why we never compromise on independence.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#DCD6C8]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Non-Commercial Verification
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Time-Stamped Fact Checks
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              County-Wide Coverage
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE CORE DISTINCTION: WHAT VERIFICATION IS VS WHAT IT IS NOT */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4B66] block">
            Core Principles
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3333]">
            What "Verified by Discover Clare" Means
          </h2>
          <p className="text-[#5A6363] text-sm sm:text-base leading-relaxed font-light">
            Verification is an editorial trust signal. It communicates that our team has independently reviewed the listing and checked key factual information to the best of our knowledge at the time of audit.
          </p>
        </div>

        {/* Live Badge Demonstration Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E4DB] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DB]">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A6363]">
                Live Component Preview
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C3333]">
                The Official Verification Trust Badge
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <VerifiedBadge status="verified" variant="compact" />
              <VerifiedBadge status="verified" variant="minimal" />
            </div>
          </div>

          <VerifiedBadge 
            status="verified" 
            variant="detailed" 
            showHowWeVerifyLink={false}
          />
        </div>

        {/* What It Is vs What It Is Not Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IS */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F8F6] border border-[#D1E6DC] space-y-5">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ✓
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C3333]">
                What Verification IS
              </h3>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#3E4949] leading-relaxed font-light">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Independent Factual Audit:</strong> We check that the physical spot exists, that public or commercial access is real, and that location data is accurate.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Local Context & Practical Tips:</strong> We assess terrain, parking, seasonal weather exposure, tidal timings, and visitor suitability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Time-Stamped & Reviewable:</strong> Every verified listing records when it was last audited and is subject to periodic re-verification.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Open to Community Corrections:</strong> Readers, locals, and operators can submit factual corrections anytime.</span>
              </li>
            </ul>
          </div>

          {/* IS NOT */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6F4] border border-[#EEDCD3] space-y-5">
            <div className="flex items-center gap-2.5 text-rose-800">
              <div className="w-8 h-8 rounded-full bg-rose-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ✕
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C3333]">
                What Verification IS NOT
              </h3>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#4E5656] leading-relaxed font-light">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>NEVER a Paid Badge:</strong> Businesses can never purchase verification. "Pay-to-verify" is strictly forbidden on Discover Clare.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>Not a Subjective Review Score:</strong> Verification does not rate whether food is tasty or a hotel bed is plush—it verifies factual existence and operational reality.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>Not Permanent Infallibility:</strong> Businesses change winter hours, coastal paths experience weather damage, and prices shift. We acknowledge reality and maintain active reviews.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>Separate from Commercial Visibility:</strong> Future promotional formats (like Spotlight placements) are strictly distinct from editorial verification.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. THE 8-POINT VERIFICATION CRITERIA */}
      <section className="space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4B66] block">
            Editorial Rigour
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3333]">
            The 8-Point Verification Checklist
          </h2>
          <p className="text-[#5A6363] text-sm sm:text-base leading-relaxed font-light">
            Before a place or experience receives the "Verified by Discover Clare" badge, our editorial desk must confirm all 8 essential facets:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {verificationChecksList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E8E4DB] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1B4B66]/30 transition-colors"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#1B4B66] flex items-center justify-center border border-[#DCE4EC]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#2C3333] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5A6363] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#F2EFE9] flex items-center gap-1.5 text-[11px] text-[#1B4B66] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mandatory Check</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. VERIFICATION STATUS TAXONOMY */}
      <section className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E8E4DB] shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4B66] block">
            Data Transparency
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3333]">
            Editorial Verification Statuses
          </h2>
          <p className="text-[#5A6363] text-sm sm:text-base leading-relaxed font-light">
            Our content repository categorises listings into 4 explicit statuses to ensure total data integrity:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statusDefinitions.map((item, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl border space-y-3 ${item.color}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider ${item.tagColor}`}>
                  {item.status}
                </span>
                <span className="text-xs font-serif font-semibold">
                  {item.badgeLabel}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {item.summary}
              </p>
              <p className="text-xs opacity-80 leading-relaxed font-light pt-2 border-t border-current/10">
                <strong>Public Display:</strong> {item.publicVisibility}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COMMERCIAL INDEPENDENCE & SPOTLIGHT PARTNERS */}
      <section className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-12 border border-[#3D4545] space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-[#DCD6C8]">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Commercial & Editorial Separation
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Editorial Verification vs Spotlight Visibility
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Discover Clare is designed to become a commercially viable digital publication without compromising editorial integrity. We maintain an absolute firewall between paid visibility and editorial fact-checking:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-[#3D4545]/70 border border-[#4E5858] space-y-3">
            <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified by Discover Clare
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              <strong>Purpose:</strong> Editorial trust signal.<br />
              <strong>Criteria:</strong> Independent factual fact-check by local researchers.<br />
              <strong>Cost:</strong> €0 (Free of charge). Never for sale.<br />
              <strong>Qualification:</strong> Open to any genuine place, trail, beach, or venue in County Clare.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#3D4545]/70 border border-[#4E5858] space-y-3">
            <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DCD6C8]" />
              Spotlight Partner (Commercial Placement)
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              <strong>Purpose:</strong> Promotional visibility and business discovery.<br />
              <strong>Criteria:</strong> Commercial partnership; clearly labelled as sponsored/spotlight.<br />
              <strong>Independence:</strong> A Spotlight Partner does NOT automatically receive verification, nor can payment bypass editorial review.
            </p>
          </div>
        </div>
      </section>

      {/* 6. READER CORRECTIONS & COMMUNITY INTEGRITY */}
      <section className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E8E4DB] shadow-sm space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-[#1B4B66]">
              <Flag className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Community Fact-Checking
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C3333]">
              Help Us Keep Discover Clare Accurate
            </h2>
            <p className="text-[#5A6363] text-sm sm:text-base leading-relaxed font-light">
              County Clare is dynamic: winter tides alter coastal trails, family-run cafés update opening hours, and seasonal ferry sailings shift. If you notice any outdated detail or closed access point, please let our editorial desk know.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B4B66] text-white hover:bg-[#153a4f] text-sm font-medium transition-colors shadow-sm"
              >
                <span>Report an Outdated Detail</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/suggest-a-place"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F0F4F8] text-[#2C3333] hover:bg-[#E2EAF1] text-sm font-medium transition-colors border border-[#E8E4DB]"
              >
                <span>Suggest a New Place</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-3 text-xs text-[#5A6363]">
            <h4 className="font-serif font-bold text-[#2C3333] text-sm">
              Our Response Commitment
            </h4>
            <p className="leading-relaxed font-light">
              Every reader submission is logged into our editorial desk. We aim to review reported updates within 48 business hours and update the public listing promptly.
            </p>
            <div className="pt-2 border-t border-[#E8E4DB] flex items-center gap-2 text-[#1B4B66] font-medium">
              <CalendarCheck className="w-4 h-4" />
              <span>Independent editorial desk: editorial@discoverclare.ie</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM EXPLORE NAVIGATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#F0F4F8] border border-[#DCE4EC] text-sm">
        <div className="flex items-center gap-3">
          <Compass className="w-5 h-5 text-[#1B4B66]" />
          <span className="font-serif font-bold text-[#2C3333]">
            Ready to explore verified County Clare places?
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/explore"
            className="text-xs sm:text-sm font-semibold text-[#1B4B66] hover:underline flex items-center gap-1"
          >
            <span>Browse All Places</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/about"
            className="text-xs sm:text-sm font-semibold text-[#5A6363] hover:text-[#2C3333] transition-colors"
          >
            About Discover Clare
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HowWeVerifyView;
