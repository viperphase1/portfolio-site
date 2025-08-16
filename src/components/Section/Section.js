import React from 'react';
import styles from './Section.module.scss';

const Section = ({images, title, subtitle, paragraphs, links}) => (
  <div className={styles.Section}>
    <div className={styles.inner}>
      {images ? (
        <div className={styles.images}>
          {images.map(image => <div className={styles.mainImage}><img src={image} /></div>)}
        </div>
      ) : ''}
      <div className={styles.textContent}>
        <h1>{title}</h1>
        <div className="divider"></div>
        <h3>{subtitle}</h3>
        <div className={styles.paragraphs}>
          {paragraphs.map(paragraph => <p>{paragraph}</p>)}
        </div>
        {links ? (
          <div className={styles.links}>
            {links.map(link => <a href={link.url} className={styles.link}>{link.text}</a>)}
          </div>
        ) : ''}
      </div>
    </div>
  </div>
);

export default Section;
