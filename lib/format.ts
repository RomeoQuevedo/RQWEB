const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatPrice(cents: number): string {
  return currency.format(cents / 100);
}

/** Parse "YYYY-MM-DD" as a calendar date (UTC) so it never shifts a day across time zones. */
function parseDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function formatDateParts(iso: string) {
  const d = parseDate(iso);
  return {
    month: d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
    day: d.toLocaleString("en-US", { day: "numeric", timeZone: "UTC" }),
    year: d.toLocaleString("en-US", { year: "numeric", timeZone: "UTC" }),
    weekday: d.toLocaleString("en-US", { weekday: "long", timeZone: "UTC" }),
  };
}

export function formatLongDate(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
