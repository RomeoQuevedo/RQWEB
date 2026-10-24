import { stats } from "@/lib/site";

export function StatStrip() {
  return (
    <section className="stats" aria-label="Career stats">
      <div className="container">
        <ul className="stats__list">
          {stats.map((s) => (
            <li key={s.label} className="stats__item">
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
