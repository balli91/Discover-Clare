import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CalendarCheck, Check, ArrowRight, Info } from 'lucide-react';
import { VerificationStatus, PlaceVerification } from '../types';
import { formatVerificationDate } from '../utils/verificationEngine';

interface VerifiedBadgeProps {
  status?: VerificationStatus;
  verification?: PlaceVerification;
  variant?: 'compact' | 'detailed' | 'minimal' | 'inline';
  lastVerifiedAt?: string;
  verifiedBy?: string;
  className?: string;
  showHowWeVerifyLink?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  status = 'verified',
  verification,
  variant = 'compact',
  lastVerifiedAt,
  verifiedBy = 'Discover Clare Editorial Team',
  className = '',
  showHowWeVerifyLink = true
}) => {
  // Determine effective status & verified date from props or verification object
  const effectiveStatus = verification ? verification.status : status;
  
  // Only display badge for strictly verified places
  if (effectiveStatus !== 'verified') {
    return null;
  }

  const effectiveDate = verification 
    ? (verification.lastVerifiedDisplay || formatVerificationDate(verification.lastVerified))
    : (lastVerifiedAt ? formatVerificationDate(lastVerifiedAt) : undefined);

  const effectiveReviewer = verification?.reviewedBy || verifiedBy;

  if (variant === 'minimal') {
    return (
      <span 
        title={`Verified by ${effectiveReviewer}${effectiveDate ? ` (${effectiveDate})` : ''}`}
        className={`inline-flex items-center gap-1 text-[11px] font-medium text-[#1B4B66] bg-[#F0F4F8] px-2 py-0.5 rounded-full border border-[#D0DFE8] ${className}`}
      >
        <Check className="w-3 h-3 text-[#1B4B66]" />
        <span>Verified</span>
      </span>
    );
  }

  if (variant === 'inline') {
    return (
      <span 
        title="Information independently checked by Discover Clare"
        className={`inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B4B66] ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[#1B4B66]" />
        <span>Verified by Discover Clare</span>
        {effectiveDate && (
          <span className="text-[#5A6363] font-normal text-[11px]">({effectiveDate})</span>
        )}
      </span>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`p-5 rounded-2xl bg-[#F4F6F8] border border-[#DCE4EC] text-[#2C3333] space-y-3 ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1B4B66] text-white flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4B66] block font-sans">
                Verified by Discover Clare
              </span>
              <span className="text-xs text-[#5A6363] font-light">
                Information independently checked by Discover Clare
              </span>
            </div>
          </div>
          {effectiveDate && (
            <div className="flex items-center gap-1 text-[11px] text-[#5A6363] bg-white px-3 py-1 rounded-full border border-[#E8E4DB] shadow-xs">
              <CalendarCheck className="w-3.5 h-3.5 text-[#1B4B66]" />
              <span>Last verified: {effectiveDate}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-[#4A5555] leading-relaxed font-light pl-0 sm:pl-10">
          This listing has been independently reviewed by Discover Clare. We check that the place is genuine and that primary details (location, access, contact, and category) are accurate to the best of our knowledge at the time of verification.
        </p>

        {showHowWeVerifyLink && (
          <div className="pl-0 sm:pl-10 pt-1 flex items-center justify-between gap-4 border-t border-[#E2EAF0] text-xs">
            <Link 
              to="/how-we-verify"
              className="inline-flex items-center gap-1.5 text-[#1B4B66] hover:text-[#123447] font-medium transition-colors group"
            >
              <Info className="w-3.5 h-3.5 text-[#1B4B66]" />
              <span>Learn how we independently verify listings</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="text-[11px] text-[#5A6363] hover:text-[#1B4B66] transition-colors hidden md:inline"
            >
              Report an update
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Default: Compact Pill for Cards and Previews
  return (
    <span 
      title="Information reviewed and independently verified by Discover Clare"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2C3333]/90 text-stone-100 border border-stone-600 backdrop-blur-sm shadow-xs ${className}`}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-[#DCD6C8]" />
      <span>Verified</span>
    </span>
  );
};

