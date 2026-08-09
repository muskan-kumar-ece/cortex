"use client";

import { AvailabilityData, TrustSignalsData } from "@/config/contact.types";
import { Clock, MapPin, Mail, Calendar, ShieldCheck } from "lucide-react";

export function ContactInfo({ availability, trust }: { availability: AvailabilityData, trust: TrustSignalsData }) {
  return (
    <div className="h-full flex flex-col justify-between space-y-12 py-4">
      
      {/* Availability Section */}
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Response Expectations
          </h3>
          <p className="text-3xl font-bold text-foreground tracking-tight leading-tight mb-2">
            {availability.responseTime}
          </p>
          <p className="text-on-surface-muted text-sm">
            During standard business hours ({availability.businessHours} {availability.timezone})
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-border">
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-medium text-on-surface">
              <Mail className="w-4 h-4 text-on-surface-muted" />
              Direct Support
            </h4>
            <p className="text-foreground font-medium">{availability.supportEmail}</p>
          </div>
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-medium text-on-surface">
              <MapPin className="w-4 h-4 text-on-surface-muted" />
              Primary Hub
            </h4>
            <p className="text-foreground font-medium">{availability.location}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-info/10 border border-info/20 flex items-start gap-4">
          <div className="mt-1 w-8 h-8 rounded-full bg-info/20 flex items-center justify-center text-info shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <p className="text-sm text-info leading-relaxed">
            {availability.calendlyNote}
          </p>
        </div>
      </div>

      {/* Trust Signals Section */}
      <div className="pt-8 border-t border-border">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-on-surface-muted mb-6 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          {trust.title}
        </h3>
        <div className="space-y-4">
          {trust.signals.map(signal => (
            <div key={signal.id} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <span className="font-semibold text-foreground block">{signal.title}</span>
                <span className="text-sm text-on-surface-muted">{signal.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
