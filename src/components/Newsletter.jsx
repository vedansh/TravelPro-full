import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const ref = useReveal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
      }
    } catch {
      setError('Could not connect. Please try again.');
    }
  };

  return (
    <section className={styles.section} id="newsletter">
      <div className={styles.inner} ref={ref}>
        <h2>Get <em>Inspired</em> Weekly</h2>
        <p>Fresh destinations, seasonal picks, and hidden gems delivered to your inbox every Friday morning.</p>
        {sent ? (
          <div className={styles.thanks}>You're in! Check your inbox Friday. ✦</div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        )}
        {error && <p style={{ color: 'var(--accent)', marginTop: 12, fontSize: 13 }}>{error}</p>}
      </div>
    </section>
  );
}
