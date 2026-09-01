import React from 'react';
import { ShieldCheck, CalendarCheck, Check } from 'lucide-react';
import { VerificationStatus } from '../types';

interface VerifiedBadgeProps {
  status?: VerificationStatus;
  variant?: 'compact' | 'detailed' | 'minimal';
  lastVerifiedAt?: string;
  verifiedBy?: string;
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  status = 'verified',
  variant = 'compact',
  lastVerifiedAt,
  verifiedBy = 'Discover Clare Editorial Team',
  className = ''
}) => {
  // Only display badge for verified places
  if (status !== 'verified') {
    return null;
  }

  if (variant === 'minimal') {
    return (
      <span 
        title={`Verified by ${verifiedBy}${lastVerifiedAt ? ` (${lastVerifiedAt})` : ''}`}
        className={`inline-flex items-center gap-1 text-[11px] font-medium text-[#1B4B66] bg-[#F0F4F8] px-2 py-0.5 rounded-full border border-[#D0DFE8] ${className}`}
      >
        <Check className="w-3 h-3 text-[#1B4B66]" />
        <span>Verified</span>
      </span>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`p-4 rounded-2xl bg-[#F4F6F8] border border-[#DCE4EC] text-[#2C3333] space-y-2 ${className}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1B4B66] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4B66] block font-sans">
                Verified by Discover Clare
              </span>
              <span className="text-xs text-[#5A6363] font-light">
                Independently researched & fact-checked
              </span>
            </div>
          </div>
          {lastVerifiedAt && (
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#5A6363] bg-white px-2.5 py-1 rounded-full border border-[#E8E4DB]">
              <CalendarCheck className="w-3 h-3 text-[#1B4B66]" />
              <span>Reviewed: {lastVerifiedAt}</span>
            </div>
          )}
        </div>
        <p className="text-xs text-[#4A5555] leading-relaxed font-light pl-9">
          Independently reviewed by Discover Clare. We check that this listing is genuine and that key factual information is accurate to the best of our knowledge at the time of verification.
        </p>
        {lastVerifiedAt && (
          <div className="sm:hidden flex items-center gap-1 text-[10px] text-[#5A6363] pl-9 pt-0.5">
            <CalendarCheck className="w-3 h-3 text-[#1B4B66]" />
            <span>Reviewed: {lastVerifiedAt}</span>
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
