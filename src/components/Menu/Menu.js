import React, {useState} from 'react';
import styles from './Menu.module.scss';
import TextRing from "../TextRing/TextRing";
import {ListIcon} from "@phosphor-icons/react";

const Menu = () => {
    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    }

    return (
      <div className={`${styles.Menu}${active ? ' ' + styles.active : ''}`}>
          <div className={styles.inner}>
              <div className={`${styles.circle} ${styles.trigger}`} onClick={toggleActive} onMouseEnter={() => setActive(true)}>
                  <ListIcon size={36}></ListIcon>
              </div>
              <div className={`${styles.circle} ${styles.circle1}`} onMouseEnter={() => setActive(true)}></div>
              <div className={`${styles.circle} ${styles.circle2}`} onMouseEnter={() => setActive(true)}></div>
              <div className={`${styles.circle} ${styles.circle3}`} onMouseEnter={() => setActive(true)}></div>
              <div className={`${styles.circle} ${styles.circle4}`} onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}></div>
              <div>
                  <TextRing text="Home" key="menu-item-home" targetLength={12} spacing="1.35ch" rotationSpeed="16s" direction={-1} initialRotation="54deg"></TextRing>
                  <TextRing text="Pictures" key="menu-item-pics" targetLength={42} spacing="0.95ch" rotationSpeed="18s" direction={1} initialRotation="-24deg"></TextRing>
                  <TextRing text="Portfolio" key="menu-item-portfolio" targetLength={54} spacing="1.07ch" rotationSpeed="24s" direction={-1} initialRotation="254deg"></TextRing>
                  <TextRing text="Contact Info •" key="menu-item-contact" targetLength={64} spacing="1.14ch" rotationSpeed="24s" direction={1} initialRotation="-100deg"></TextRing>
              </div>
          </div>
      </div>
    );
};

export default Menu;
