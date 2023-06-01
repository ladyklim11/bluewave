
// Libraries
import React from 'react';

// Styles
import styles from './style.module.scss';


const DIVIDERS = [
  {
    id: '#0',
    content: () => (
      <div className={styles.Divider} />
    )
  },
  {
    id: '#1',
    content: backgroundColor => (
      <div className={styles.Divider}>
        <div className={styles.Line1} style={{backgroundColor}} />
        <div className={styles.Icon}>
          <div className={styles.Circle} style={{backgroundColor}} />
        </div>
        <div className={styles.Line1} style={{backgroundColor}} />
      </div>
    )
  },
  {
    id: '#2',
    content: backgroundColor => (
      <div className={styles.Divider}>
        <div className={styles.Line1} style={{backgroundColor}} />
        <div className={styles.Icon}>
          <div className={styles.Squ} style={{backgroundColor}} />
        </div>
        <div className={styles.Line1} style={{backgroundColor}} />
      </div>
    )
  },
  {
    id: '#3',
    content: backgroundColor => (
      <div className={styles.Divider}>
        <div className={styles.Line1} style={{backgroundColor}} />
        <div className={styles.Icon}>
          <svg width='10' height='11' viewBox='0 0 10 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1 6.24268L5.24264 2.00004V9.77821L9.13173 5.88912' stroke={backgroundColor} />
          </svg>
        </div>
        <div className={styles.Line1} style={{backgroundColor}} />
      </div>
    )
  },
  {
    id: '#4',
    content: backgroundColor => (
      <div className={styles.Divider}>
        <div className={styles.Line1} style={{backgroundColor}} />
        <div className={styles.Icon}>
          <svg width='28' height='27' viewBox='0 0 28 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M15.4266 9.53647L14 5.1459L12.5734 9.53647L11.7876 11.9549H9.24472H4.62819L8.36304 14.6684L10.4203 16.1631L9.63449 18.5816L8.2079 22.9721L11.9428 20.2586L14 18.7639L16.0572 20.2586L19.7921 22.9721L18.3655 18.5816L17.5797 16.1631L19.637 14.6684L23.3718 11.9549H18.7553H16.2124L15.4266 9.53647Z' fill={backgroundColor} stroke='white' stroke-width='3'/>
          </svg>
        </div>
        <div className={styles.Line1} style={{backgroundColor}} />
      </div>
    )
  },
  {
    id: '#5',
    content: backgroundColor => (
      <div className={styles.Divider}>
        <div className={styles.Line1} style={{backgroundColor}} />
        <div className={styles.Icon}>
          <svg width='28' height='27' viewBox='0 0 28 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M15.4266 9.53647L14 5.1459L12.5734 9.53647L11.7876 11.9549H9.24472H4.62819L8.36304 14.6684L10.4203 16.1631L9.63449 18.5816L8.2079 22.9721L11.9428 20.2586L14 18.7639L16.0572 20.2586L19.7921 22.9721L18.3655 18.5816L17.5797 16.1631L19.637 14.6684L23.3718 11.9549H18.7553H16.2124L15.4266 9.53647Z' fill={backgroundColor} stroke='white' stroke-width='3'/>
          </svg>
        </div>
        <div className={styles.Line1} style={{backgroundColor}} />
      </div>
    )
  },
  {
    id: '#6',
    content: backgroundColor => (
      <div className={styles.Divider}>
        <div className={styles.Line1} style={{backgroundColor}} />
        <div className={styles.Icon}>
          <svg width='28' height='27' viewBox='0 0 28 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M15.4266 9.53647L14 5.1459L12.5734 9.53647L11.7876 11.9549H9.24472H4.62819L8.36304 14.6684L10.4203 16.1631L9.63449 18.5816L8.2079 22.9721L11.9428 20.2586L14 18.7639L16.0572 20.2586L19.7921 22.9721L18.3655 18.5816L17.5797 16.1631L19.637 14.6684L23.3718 11.9549H18.7553H16.2124L15.4266 9.53647Z' fill={backgroundColor} stroke='white' stroke-width='3'/>
          </svg>
        </div>
        <div className={styles.Line1} style={{backgroundColor}} />
      </div>
    )
  },
  {
    id: '#7',
    content: backgroundColor => (
      <div className={styles.Divider}>
        <div className={styles.Line2} style={{backgroundColor}} />
        <div className={styles.Icon}>
          <svg width='15' height='11' viewBox='0 0 15 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M7.5 9.5H7.52066L7.54131 9.49943C8.07285 9.48479 8.61179 9.28301 9.03556 8.85218L12.8769 5.06004C13.2703 4.67665 13.5 4.1558 13.5 3.58219C13.5 2.39627 12.5296 1.5 11.4014 1.5C10.8502 1.5 10.3197 1.71457 9.92382 2.09639L9.9164 2.10354L9.90908 2.11079L7.50353 4.49519L5.08935 2.10925L5.07097 2.09108L5.05197 2.07356C4.69296 1.7424 4.18767 1.5 3.59865 1.5C2.4704 1.5 1.5 2.39628 1.5 3.58219C1.5 4.15605 1.72993 4.6771 2.12356 5.06053L5.97727 8.85984C6.35733 9.23781 6.8767 9.5 7.5 9.5Z' fill={backgroundColor} stroke='white' stroke-width='3'/>
          </svg>
        </div>
        <div className={styles.Line2} style={{backgroundColor}} />
      </div>
    )
  },
  {
    id: '#8',
    content: backgroundColor => (
      <div className={styles.Divider}>
        <div className={styles.Line2} style={{backgroundColor}} />
        <div className={styles.Icon}>
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M2.10978 8.6561L2.1158 8.66192L2.12188 8.66768L5.55368 11.9178L5.55968 11.9235L5.56574 11.9291C5.92915 12.2658 6.41821 12.5 7 12.5C7.5497 12.5 8.06705 12.2883 8.46143 11.9036L11.8745 8.66692C12.2555 8.30997 12.5 7.80534 12.5 7.23185C12.5 6.39275 12.0078 5.74224 11.3526 5.43135L11.8788 4.93228L11.8846 4.92686L11.8902 4.92137C12.2438 4.57895 12.5 4.09041 12.5 3.49713C12.5 2.2908 11.4924 1.5 10.4679 1.5C9.95313 1.5 9.4472 1.69193 9.06067 2.04999L9.05313 2.05698L9.04568 2.06407L7.003 4.00907L4.95273 2.06256L4.93404 2.04482L4.91475 2.02772C4.5651 1.7179 4.08379 1.5 3.53213 1.5C2.50759 1.5 1.5 2.2908 1.5 3.49713C1.5 4.09041 1.75621 4.57895 2.10978 4.92137L2.1158 4.9272L2.12188 4.93296L2.6479 5.43113C1.99242 5.74193 1.5 6.39255 1.5 7.23185C1.5 7.81399 1.75067 8.3083 2.10978 8.6561Z' fill={backgroundColor} stroke='white' stroke-width='3'/>
          </svg>
        </div>
        <div className={styles.Line2} style={{backgroundColor}} />
      </div>
    )
  },
  {
    id: '#9',
    content: backgroundColor => (
      <div className={styles.Divider}>
        <div className={styles.Line2} style={{backgroundColor}} />
        <div className={styles.Icon}>
          <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1 1V3C1 4.10457 1.89543 5 3 5V5C4.10457 5 5 4.10457 5 3V3C5 1.89543 5.89543 1 7 1V1C8.10457 1 9 1.89543 9 3V5' stroke={backgroundColor} />
          </svg>
        </div>
        <div className={styles.Line2} style={{backgroundColor}} />
      </div>
    )
  },
];

export const getDivider = id => DIVIDERS.find(divider => divider.id === id);

export const getDividers = () => DIVIDERS;