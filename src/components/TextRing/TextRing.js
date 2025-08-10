import React from 'react';
import styles from './TextRing.module.scss';

const TextRing = ({text, targetLength, spacing, rotationSpeed, initialRotation, direction}) => {
    if (targetLength) {
        if (text.length < targetLength) {
            let newText = '';
            while(newText.length < targetLength) {
                newText += ' ' + text;
            }
            text = newText;
        }
    }
    const CHARS = text.split('')
    const INNER_ANGLE = 360 / CHARS.length
    return (
        <span
            className={styles.TextRing}
            style={{
                '--total': CHARS.length,
                '--spacing': spacing,
                '--radius': 1 / Math.sin(INNER_ANGLE / (180 / Math.PI)),
                '--rotationSpeed': rotationSpeed,
                '--direction': direction,
                '--initialRotation': initialRotation,
            }}
        >
      {CHARS.map((char, index) => (
          <span key={char + index} style={{'--index': index }}>
          {char}
        </span>
      ))}
    </span>
    )
}

export default TextRing;
