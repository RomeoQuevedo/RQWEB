import { formatDateParts, formatLongDate } from "@/lib/format";
import type { WrestlingEvent } from "@/lib/events";

export function EventCard({ event, past = false }: { event: WrestlingEvent; past?: boolean }) {
  const { month, day, year } = formatDateParts(event.date);
  return (
    <li className={`event-card ${past ? "event-card--past" : ""}`}>
      <time className="event-card__date" dateTime={event.date}>
        <span className="visually-hidden">{formatLongDate(event.date)}</span>
        <span className="event-card__month" aria-hidden="true">
          {month.toUpperCase()}
        </span>
        <span className="event-card__day" aria-hidden="true">
          {day}
        </span>
        <span className="event-card__year" aria-hidden="true">
          {year}
        </span>
      </time>
      <div className="event-card__info">
        <span className="event-card__promo">{event.promotion}</span>
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__meta">
          {event.venue} · {event.city}
        </p>
      </div>
      <div className="event-card__cta">
        {past ? (
          <span className="muted">Completed</span>
        ) : event.ticketUrl ? (
          <a className="btn btn--red btn--sm" href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
            Tickets<span className="visually-hidden"> for {event.title}, {formatLongDate(event.date)} (opens in new tab)</span>
          </a>
        ) : (
          <span className="muted">Tickets TBA</span>
        )}
      </div>
    </li>
  );
}
