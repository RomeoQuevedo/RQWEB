// Events calendar. Dates are ISO "YYYY-MM-DD" (local event date).
// Upcoming vs. past is computed from today's date.
// TODO: replace with real events — every entry below is a placeholder.

export type WrestlingEvent = {
  id: string;
  date: string;
  title: string;
  promotion: string;
  venue: string;
  city: string;
  /** Ticket URL; leave undefined to show "Tickets TBA" */
  ticketUrl?: string;
};

export const events: WrestlingEvent[] = [
  {
    id: "e-101",
    date: "2026-11-14",
    title: "Event title TBA",
    promotion: "Promotion TBA",
    venue: "Venue TBA",
    city: "City, Country",
    ticketUrl: "https://example.com/tickets",
  },
  {
    id: "e-102",
    date: "2026-12-05",
    title: "Event title TBA",
    promotion: "Promotion TBA",
    venue: "Venue TBA",
    city: "City, Country",
    ticketUrl: "https://example.com/tickets",
  },
  {
    id: "e-103",
    date: "2027-01-23",
    title: "Event title TBA",
    promotion: "Promotion TBA",
    venue: "Venue TBA",
    city: "City, Country",
  },
  {
    id: "e-104",
    date: "2027-02-20",
    title: "Event title TBA",
    promotion: "Promotion TBA",
    venue: "Venue TBA",
    city: "City, Country",
  },
  {
    id: "e-001",
    date: "2026-09-12",
    title: "Past event (placeholder)",
    promotion: "Promotion TBA",
    venue: "Venue TBA",
    city: "City, Country",
  },
  {
    id: "e-002",
    date: "2026-07-25",
    title: "Past event (placeholder)",
    promotion: "Promotion TBA",
    venue: "Venue TBA",
    city: "City, Country",
  },
];

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getUpcomingEvents(limit?: number): WrestlingEvent[] {
  const today = todayISO();
  const upcoming = events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getPastEvents(): WrestlingEvent[] {
  const today = todayISO();
  return events.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));
}
