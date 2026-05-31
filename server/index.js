import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const destinations = [
  {
    id: 1,
    name: 'Santorini',
    country: 'Greece',
    flag: '🇬🇷',
    region: 'europe',
    days: 2,
    tags: ['Romance', 'Views'],
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=85',
    featured: true,
  },
  {
    id: 2,
    name: 'Kyoto',
    country: 'Japan',
    flag: '🇯🇵',
    region: 'asia',
    days: 2,
    tags: ['Culture', 'Food'],
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 3,
    name: 'Marrakech',
    country: 'Morocco',
    flag: '🇲🇦',
    region: 'africa',
    days: 2,
    tags: ['Markets', 'Culture'],
    img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 4,
    name: 'Amalfi Coast',
    country: 'Italy',
    flag: '🇮🇹',
    region: 'europe',
    days: 2,
    tags: ['Coastal', 'Scenic'],
    img: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 5,
    name: 'Bali',
    country: 'Indonesia',
    flag: '🇮🇩',
    region: 'asia',
    days: 2,
    tags: ['Adventure', 'Wellness'],
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=85',
  },
];

const subscribers = [];

// GET all destinations, with optional ?region= and ?q= filters
app.get('/api/destinations', (req, res) => {
  const { region, q } = req.query;
  let result = destinations;

  if (region && region !== 'all') {
    result = result.filter(d => d.region === region);
  }
  if (q) {
    const query = q.toLowerCase();
    result = result.filter(
      d =>
        d.name.toLowerCase().includes(query) ||
        d.country.toLowerCase().includes(query) ||
        d.tags.some(t => t.toLowerCase().includes(query))
    );
  }

  res.json(result);
});

// POST subscribe to newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (subscribers.includes(email)) {
    return res.status(409).json({ error: 'Already subscribed' });
  }
  subscribers.push(email);
  console.log(`New subscriber: ${email} (total: ${subscribers.length})`);
  res.json({ message: 'Subscribed successfully' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`TravelPro API running at http://127.0.0.1:${PORT}`);
});
