import { useState, useEffect } from 'react';
import { filters } from '../data';
import { useReveal } from '../hooks/useReveal';
import styles from './Destinations.module.css';

function DestinationCard({ dest, featured }) {
  return (
    <div className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <img src={dest.img} alt={dest.name} loading="lazy" className={styles.img} />
      <div className={styles.cardOverlay} />
      <button className={styles.cardBtn}>View Itinerary →</button>
      <div className={styles.cardBody}>
        <div className={styles.chips}>
          {dest.tags.map(t => <span key={t} className={styles.chip}>{t}</span>)}
        </div>
        <div className={styles.name}>{dest.name}</div>
        <div className={styles.foot}>
          <span className={styles.country}>{dest.flag} {dest.country}</span>
          <span className={styles.dur}>{dest.days} days</span>
        </div>
      </div>
    </div>
  );
}

export default function Destinations({ searchQuery }) {
  const [active, setActive] = useState('all');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useReveal();
  const filtersRef = useReveal();
  const gridRef = useReveal();

  useEffect(() => {
    const params = new URLSearchParams();
    if (active !== 'all') params.set('region', active);
    if (searchQuery) params.set('q', searchQuery);

    setLoading(true);
    fetch(`/api/destinations?${params}`)
      .then(r => r.json())
      .then(data => { setDestinations(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [active, searchQuery]);

  return (
    <section className={styles.section} id="destinations">
      <div className={styles.header} ref={headerRef}>
        <span className={styles.tag}>Trending Now</span>
        <h2 className={styles.title}>Curated <em>Destinations</em></h2>
        <p className={styles.sub}>Each itinerary is built from thousands of traveler reviews, local expert insights, and real-time data.</p>
      </div>

      <div className={styles.pills} ref={filtersRef}>
        {filters.map(f => (
          <button
            key={f.value}
            className={`${styles.pill} ${active === f.value ? styles.pillActive : ''}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.grid} ref={gridRef}>
        {loading ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--mid)' }}>Loading…</p>
        ) : destinations.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--mid)' }}>No destinations found.</p>
        ) : (
          destinations.map((dest, i) => (
            <div
              key={dest.id}
              className={styles.cardWrap}
              style={{ gridRow: i === 0 ? 'span 2' : undefined }}
            >
              <DestinationCard dest={dest} featured={i === 0} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
