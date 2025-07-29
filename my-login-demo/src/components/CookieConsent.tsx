// src/components/CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './CookieConsent.module.css';

const COOKIE_NAME = 'site_cookie_consent';
const COOKIE_OPTIONS = {
  expires: 365,
  sameSite: 'strict',
} as const;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = Cookies.get(COOKIE_NAME);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    Cookies.set(
      COOKIE_NAME,
      JSON.stringify({ analytics: true, ads: true }),
      COOKIE_OPTIONS
    );
    setVisible(false);
    // initialize analytics, ads, etc.
  }

  function denyAll() {
    Cookies.set(
      COOKIE_NAME,
      JSON.stringify({ analytics: false, ads: false }),
      COOKIE_OPTIONS
    );
    setVisible(false);
  }

  function customize() {
    // open a preferences modal here; for now, just deny
    denyAll();
  }

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h2>This website uses cookies</h2>
        <p>
          We use cookies to personalise content and ads, to provide social media
          features and to analyse our traffic. We also share information about
          your use of our site with our social media, advertising and analytics
          partners.
        </p>
        <div className={styles.buttons}>
          <button className={styles.deny} onClick={denyAll}>Deny</button>
          <button className={styles.customize} onClick={customize}>Customize</button>
          <button className={styles.allow} onClick={acceptAll}>Allow all</button>
        </div>
      </div>
    </div>
  );
}
