import React from 'react';
import Header from './Header'
import PokeSearch from './PokeSearch'
import Footer from './Footer'

export default function Home() {
  return (
    <div className='site-container'>
      <Header />
      <PokeSearch />
      <Footer />
    </div>
  );
}
