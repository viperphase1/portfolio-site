import styles from './Title.module.scss';

const Title = ({text}) => {
  return (
    <div className={styles.Title}>
      <div className={styles.circleInner}></div>
      <div className={styles.circleOuter}>
        <div className={styles.outline}></div>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
      </div>
      <div className={styles.capsule}>{text}</div>
    </div>
  )
}

export default Title;
