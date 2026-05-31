import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import HowItWorks from './components/HowItWorks';
import Featured from './components/Featured';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Navbar />
      <Hero onSearch={setSearchQuery} />
      <Destinations searchQuery={searchQuery} />
      <HowItWorks />
      <Featured />
      <Newsletter />
      <Footer />
    </>
  );
}
