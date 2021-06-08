import React, { useEffect, useState } from 'react';
import Divider from './Divider';
import Footer from './Footer';
import Navbar from './Navbar';
import Top from './Top';

export default function Layout({ children }) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(
    function mount() {
      function onScroll() {
        if (!showScroll && window.pageYOffset > 400) {
          setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
          setShowScroll(false);
        }
      }
      window.addEventListener('scroll', onScroll);

      return function unMount() {
        window.removeEventListener('scroll', onScroll);
      };
    },
    [showScroll]
  );
  return (
    <>
      <Navbar />
      <Divider color="#e0e0e0" />
      <div id="top"></div>
      {children}
      <Top showScroll={showScroll} />
      <Footer />
    </>
  );
}
