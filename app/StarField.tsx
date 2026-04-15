// Adapted from https://codepen.io/sarazond/pen/LYGbwj
import styles from './StarField.module.css'

const FIELD_WIDTH = 4000
const FIELD_HEIGHT = 2000

function generateStars(n: number) {
  return Array.from({ length: n }, () =>
    `${Math.floor(Math.random() * FIELD_WIDTH)}px ${Math.floor(Math.random() * FIELD_HEIGHT)}px #FFF`
  ).join(', ')
}

export default function StarField() {
  const small = generateStars(1400)
  const medium = generateStars(400)
  const big = generateStars(200)

  return (
    <>
      <style>{`
        #stars  { box-shadow: ${small}; }
        #stars::after { box-shadow: ${small}; }
        #stars2 { box-shadow: ${medium}; }
        #stars2::after { box-shadow: ${medium}; }
        #stars3 { box-shadow: ${big}; }
        #stars3::after { box-shadow: ${big}; }
      `}</style>
      <div id="stars" className={styles.stars} />
      <div id="stars2" className={styles.stars2} />
      <div id="stars3" className={styles.stars3} />
    </>
  )
}