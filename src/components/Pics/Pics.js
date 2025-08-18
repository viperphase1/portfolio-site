import React, {useMemo, useRef, useState} from 'react';
import styles from './Pics.module.scss';

// Helper to title-case from file slug
function toTitleCase(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\.[^/.]+$/, '')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const Pics = () => {
  // Since we cannot read directory contents at runtime in the browser, list files here.
  // const photos = useMemo(() => {
  //   const files = [
  //     'tom-bathroom.jpg',
  //     'tom-chin-fuzz.jpg',
  //     'tom-dishes.jpg',
  //     'tom-dj.jpg',
  //     'tom-golf.jpg',
  //     'tom-long-hair.jpg',
  //     'tom-mall.jpg',
  //     'tom-sand-dunes.jpg',
  //     'tom-smash-bros.jpg',
  //     'tom-swashbuckler.jpg',
  //     'tom-temple.jpg',
  //     'tom-tennis.jpg',
  //   ];
  //   return files.map(name => ({ url: `/images/photos/${name}`, title: toTitleCase(name) }));
  // }, []);

  const photos = useRef([
    {url: '/images/photos/tom-bathroom.jpg', title: 'Felt cute, might delete later'},
    {url: '/images/photos/tom-chin-fuzz.jpg', title: 'By the hair on my chinny chin chin'},
    {url: '/images/photos/tom-dishes.jpg', title: 'About to wash the dishes'},
    {url: '/images/photos/tom-dj.jpg', title: 'Halloween 2018'},
    {url: '/images/photos/tom-golf.jpg', title: 'I missed 20 times in a row'},
    {url: '/images/photos/tom-long-hair.jpg', title: 'Tried to grow out my hair'},
    {url: '/images/photos/tom-mall.jpg', title: 'The mall was almost empty'},
    {url: '/images/photos/tom-sand-dunes.jpg', title: '25 MPH winds'},
    {url: '/images/photos/tom-smash-bros.jpg', title: 'Nothing can match the mirth of playing Smash Bros'},
    {url: '/images/photos/tom-swashbuckler.jpg', title: 'All dressed up for my sister\'s fantasy themed wedding'},
    {url: '/images/photos/tom-temple.jpg', title: 'Good Christian boy'},
    {url: '/images/photos/tom-tennis.jpg', title: 'Racket sports are my favorite'},
  ]);

  const [active, setActive] = useState(null); // { url, title } | null

  const open = (photo) => setActive(photo);
  const close = () => setActive(null);

  return (
    <div className={styles.Pics}>
      <div className={styles.background}></div>
      <div className="scroll-area">
        <div className={styles.page}>
          <div className={styles.title}>
            <h1>Pictures</h1>
            <p>A personal gallery with a masonry layout. Click any tile to view the full image.</p>
          </div>

          <div className={styles.grid}>
            {photos.current.map((p, idx) => (
              <div key={idx} className={styles.tile} onClick={() => open(p)} role="button" tabIndex={0}
                   onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open(p)}>
                <div className={styles.inner}>
                  <img src={p.url} alt={p.title} loading="lazy" />
                  <div className={styles.caption}>{p.title}</div>
                </div>
              </div>
            ))}
          </div>

          {active && (
            <div className={styles.overlay} onClick={close}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <span className={styles.closeBtn} onClick={close} aria-label="Close">×</span>
                <img src={active.url} alt={active.title} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pics;
