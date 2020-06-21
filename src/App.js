import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import GameSection from './components/GameSection';

function App() {
  return (
    <>
      <Header
        text="Rock Paper Scissors"
      />
      <GameSection />
      <Footer />
    </>
  );
}

export default App;
