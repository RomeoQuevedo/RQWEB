import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getPastEvents, getUpcomingEvents } from "@/lib/events";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events",
  description: `Upcoming and past events for ${site.name} — dates, promotions, venues and tickets.`,
  alternates: { canonical: "/events" },
  openGraph: { title: `Events · ${site.name}`, url: "/events" },
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Events</h1>
          <p>Where to see Romeo next. Ticket links go straight to the promotion.</p>
        </div>
      </header>

      <section className="section" aria-labelledby="upcoming-title">
        <div className="container">
          <SectionTitle id="upcoming-title" title="Upcoming" />
          {upcoming.length > 0 ? (
            <ul className="events">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </ul>
          ) : (
            <p className="muted">No dates announced yet — join the newsletter to hear first.</p>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="section section--panel" aria-labelledby="past-title">
          <div className="container">
            <SectionTitle id="past-title" title="Past events" />
            <ul className="events">
              {past.map((e) => (
                <EventCard key={e.id} event={e} past />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
