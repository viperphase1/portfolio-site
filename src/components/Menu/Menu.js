import React, {useEffect, useRef, useState} from 'react';
import styles from './Menu.module.scss';
import TextRing from "../TextRing/TextRing";
import {ListIcon} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";

const Menu = () => {
  const menuRef = useRef(null);
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const toggleActive = () => {
        setActive(!active);
    }

    useEffect(() => {
      window.addEventListener('click', e => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setActive(false);
        }
      })
    })

    return (
      <div ref={menuRef} className={`${styles.Menu}${active ? ' ' + styles.active : ''}`}>
          <div className={styles.inner} onClick={toggleActive}>
              <div className={`${styles.circle} ${styles.trigger}`}>
                  <ListIcon size={36}></ListIcon>
              </div>
              <div onClick={() => navigate('/')} className={`${styles.circle} ${styles.circle1}`}></div>
              <div onClick={() => navigate('/pics')} className={`${styles.circle} ${styles.circle2}`}></div>
              <div onClick={() => navigate('/portfolio')} className={`${styles.circle} ${styles.circle3}`}></div>
              <div onClick={() => navigate('/contact')} className={`${styles.circle} ${styles.circle4}`}></div>
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
