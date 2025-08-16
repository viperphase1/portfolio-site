import React, { useEffect, useRef } from 'react';
import styles from './Portfolio.module.scss';
import Section from "../Section/Section";

const projects = [
  {
    title: '3D Model CMS',
    images: ['/images/cms-assets.png', '/images/cms-xp.png'],
    subtitle: 'The culmination of several years of work',
    paragraphs: ['For the past 8 years I\'ve been working for essentially the same company. After pivoting a few times we settled on being a 3D/AR for ecommerce SAAS platform. I led a team to create a sizable Angular app clients can use to host 3D models, edit them, and publish them on the web in a variety of ways.',
      'During this time I became very familiar with THREE.js and 3D modeling in general. I had to learn so many things on the job like Django, Docker, Blender, shader code, Linux, the list goes on. After all that I\'m feeling pretty confident in my ability to pick things up.',
      'I don\'t have a demo for this because it\'s proprietary but if you have a product and you\'re interested in increasing customer engagement I\'d be happy to connect you to our sales people!']
  },
  {
    title: '3D/AR Visualization SDK',
    subtitle: 'A library of special extended html tags that can be used to integrate 3D models into your website',
    paragraphs: ['I designed my own component system using custom html tags with extra lifecycle hooks. I made the components as granular as possible for maximum flexibility and extensibility.',
      'I used class inheritance heavily and figured out a way to mimic python-style multi parent inheritance.',
      'Pro tip: Elements will stay in memory if another element references it even if both elements have been removed from the DOM!'],
    links: [
      {text: 'Documentation', url: 'https://typedoc.staging.loft3di.com/'}
    ]
  },
  {
    title: '3D Model Inspector',
    images: ['/images/inspector.png', '/images/inspector-complex.png'],
    subtitle: 'View glTF models on your browser and prepare them for web consumption',
    paragraphs: ['I was asked to create a light weight 3D model editor for clients to use to optimize/fix their models.',
      'As we continued adding features to keep up with client demands it turned into a highly sophisticated tool for making interactive 3D models. Interactivity is added to the model via custom metadata. Interactive models created in Loft3Di Portal will only work with our 3D Visualization SDK.',
      'I often find myself using the public version to inspect and clean up models for my own projects.'],
    links: [
      { text: 'Demo', url: 'https://view.loft3di.com/inspector' }
    ]
  },
  {
    title: '3D Configurator',
    images: ['/images/configurator1.png', '/images/configurator2.png'],
    subtitle: 'A 3D model configurator for browsers built with Three.js',
    paragraphs: ['Baker Furniture wanted a 3D sectional configurator. The configurator they wanted was much too big and complex for browsers but it pushed me to develop a highly versatile configurator system.',
    'There were significant obstacles along the way like supporting arbitrary if/then logic, managing hundreds of model files, and detecting infinite loops caused by an option excluding another option that then excludes the first option.'],
    links: [
      { text: 'Demo 1', url: 'https://view.loft3di.com/nespresso/pop-color-configurator' },
      { text: 'Demo 2', url: 'https://view.loft3di.com/whalen/modular-console' }
    ]
  },
  {
    title: 'Composer',
    images: ['/images/composer.png', "/images/composer2.png"],
    subtitle: 'A tool for creating 3D configurators',
    paragraphs: ['As part of the push to create a zero touch configurator SAAS product I created a tool within Loft3Di Portal for setting up special glTF models that work with my configurator system.',
    'I built it on top of my 3D Model Inspector to leverage existing functionality and simplify workflows for our internal team.'],
    links: [
      { text: 'Demo', url: 'https://view.loft3di.com/composer' }
    ]
  },
  {
    title: 'Disco Defense VR',
    images: ['/images/disco-defense.png'],
    subtitle: 'The world\'s first 360 degree reverse tower defense game',
    paragraphs: [
      'With my math background and 3D experience I thought I would try my hand at developing a highly engaging musical VR game. I decided to build it in Unity for Quest devices.',
      'I wanted to create something totally unique and what I came up with is first person reverse tower defense with arm swinging locomotion.',
      'I\'m currently working on adding it to the meta store. You can grab the meta apk (for Quest 2+) from the link below and install it with SideQuest. It will be free anyway!'
    ],
    links: [
      { text: 'APK', url: 'https://drive.google.com/file/d/1obzOcvWQ6BVnMqiPhhOM5OgIpchHT3zl/view?usp=drive_link' },
      { text: 'Mock Site', url: 'https://disco-defense.com' }
    ]
  },
  // {
  //   title: 'AR Social Media Platform',
  //   images: ['/images/seek-studio.png', '/images/seek-studio2.png'],
  //   subtitle: 'A place for users to share and consume AR experiences (inactive)',
  //   paragraphs: [
  //     'In a previous iteration, the company I was working for was trying to become a social media hub for mixed reality. We created a web app for publishing mixed reality experiences and created a companion mobile app for users to try those experiences.',
  //     'I created several easy to use templates for things like AR cardboard cutouts, AR fireworks, and virtual try ons (mostly head wear).'
  //   ]
  // },
  {
    title: 'EP #3: From Concentrate',
    images: ['/images/from-concentrate.webp'],
    subtitle: 'Added three more songs to the Overjuiced discography',
    paragraphs: [
      'I made 3 more tracks to use in Disco Defense. Yea Diggity is the main theme.',
      'My favorite genre is glitch hop. I tried doing some of my own glitching in human paradox. The result was interesting to say the least. Still got a ways to go before I can confidently make great sounding glitch hop myself.'
    ],
    links: [
      { text: 'Spotify', url: 'https://open.spotify.com/album/5LYRZjZQ2m28rvwLLmbytM?si=gHq1w3yTSmyjTbwvIbGFnw' },]
  },
  {
    title: 'EP #2: Second Gulp',
    images: ['/images/second-gulp.webp'],
    subtitle: 'My second batch of original tracks. Features quite a bit more singing',
    paragraphs: ['Building on the momentum of my first album I kept writing and producing music and challenging myself to use new more advanced techniques.',
    'I even bought myself a Schecter C-1 Platinum Guitar to use in my songs. In the end I only used it in CCS.',
    'Chronophobia seems to be most people\'s favorite but I think Flying Sidekick is my best work. I might be biased because I got my brother to do some metal vocal parts.'],
    links: [
      { text: 'Spotify', url: 'https://open.spotify.com/album/6l625naeVvXe720n2k8tci?si=Pi9re87jRgW8NpnlU7dbfA' },
    ]
  },
  {
    title: 'EP #1: The Juiceman Cometh',
    images: ['/images/juiceman-cometh.webp'],
    subtitle: 'My debut as an amateur digital music producer. 8 original tracks',
    paragraphs: ['When COVID hit I decided to try making music. I learned music theory and synthesis before working on my first song: Whambulance. It\'s a pretty solid first song if I do say so myself!',
    'I don\'t want to get locked into making one kind of music so I experimented with a few different genres. There\'s some electronic, Electro Swing, EDM, and even Epic music.',
    'For Cold Pursuit I challenged myself to make music using only instruments I synthesized myself. The songs are hit and miss but I wanted to put them all on Spotify anyway.'],
    links: [
      { text: 'Spotify', url: 'https://open.spotify.com/album/69I3H5ZhsTlc8N1JRtyP3m?si=6JvPaKoASwKJt62B2jbv7g' },]
  },
  {
    title: 'Half Marathon',
    images: ['/images/marathon.jpg'],
    subtitle: 'Beat 1:50 despite several setbacks',
    paragraphs: ['I\'m not a runner but I am fairly athletic. When I moved to Virginia I decided I would run a half marathon. I had never run any kind of marathon but after several months I finally ran 13.1 miles in one go.',
      'It took me so long because I got sick multiple times during training, sometimes for several weeks straight. Something about the Virginia air did not agree with me. Each time I got close to breaking the 10 mile wall I got sick and it wiped out my progress. At one point I gave up, thinking that it just wasn\'t meant to be, but after recovering I kept running until one day I felt really good and randomly ran the distance of a half marathon.']
  },
  {
    title: 'Math Degree From BYU',
    images: ['/images/byu-medallion.png'],
    subtitle: '4 grueling years of pure math studies',
    paragraphs: ['I did pretty well at math pre-college so I figured I would just keep doing math and see where it takes me. It was difficult but fun. I seemed to have a particular skill for linear algebra.',
    'I value the general education portion of a Bachelor\'s degree and did my best to excel in all areas. I ended up with a 3.8 GPA overall.']
  },
  {
    title: 'Web Comics',
    images: ['/images/comic.jpg'],
    subtitle: 'An outlet for my whacky sense of humor!',
    paragraphs: [
      'It all started with drawing funny comics on paper for my mother\'s birthday. Later I got myself a drawing tablet and made a collection of digital web comics to amuse the masses.',
      'I don\'t have any artistic ability when it comes to drawing but you can do a whole lot just with stick figures!'
    ],
    links: [
      { text: 'See More', url: 'https://www.facebook.com/media/set/?set=a.3092521580839555&type=3' }
    ]
  }
];

const Portfolio = () => {
  return (
    <div className={styles.Portfolio}>
      <div className={styles.background}></div>
      <div className="scroll-area">
        <div className={styles.title}>
          <img src="/images/portfolio-graphic.png" />
          <h1>Portfolio</h1>
          <p>Here are just a few samples of my work along with some personal projects and accomplishments. I'm a full stack developer by trade with an emphasis in 3D systems but that's just a small part of what makes me me!</p>
        </div>
        {projects.map((project, index) => <div className={styles.Section}><Section className={styles.Section} key={index} images={project.images} title={project.title} subtitle={project.subtitle} paragraphs={project.paragraphs} links={project.links}></Section></div>)}
      </div>
    </div>
  );
};

export default Portfolio;
