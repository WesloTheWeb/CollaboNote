import React from 'react';
import Link from 'next/link';
import classes from './Footer.module.scss';
import { GITHUB_URL } from '@/config';

const Footer = () => {
  const {
    footer,
    container,
    main,
    brand,
    brandName,
    links,
    linkGroup,
    divider,
    bottom,
    copyright,
    social,
    socialLink,
    icon
  } = classes;

  const startYear = 2025;
  const currentYear = new Date().getFullYear();

  const displayYear = startYear === currentYear
    ? startYear
    : `${startYear} - ${currentYear}`;

  return (
    <footer className={footer}>
      <div className={container}>
        <section className={main}>
          <div className={brand}>
            <h3 className={brandName}>CollaboNote</h3>
            <p>A collaborative journaling and accountability platform.</p>
          </div>
          <nav className={links}>
            <div className={linkGroup}>
              <h4>Explore</h4>
              <Link href="/features">Patch Notes</Link>
            </div>
          </nav>
        </section>
        <hr className={divider} />
        <section className={bottom}>
          <div className={copyright}>
            <p>&copy; {displayYear} CollaboNote. All rights reserved.</p>
            <p>A portfolio project by <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">Wesley Webster</a></p>
          </div>
          <div className={social}>
            <a href={GITHUB_URL}
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={icon}
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;