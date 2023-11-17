import style from './heroBanner.module.scss';
import { inter, overpass } from "@/styles/fonts";


const HeroBanner = () => {
  return (
    <div className={style.heroBox}>
      <div className={style.leftPart}>
        <h1 className={`${style.title} ${inter.variable} ${overpass.variable} font-overpass antialiased`}>Shaping the Digital Experience</h1>
      </div>
      <div className={style.rightPart}>
        <img className={style.heroPeople} src="/heroPeople.png" alt="Man and woman" />
      </div>
    </div>
  );
};

export default HeroBanner;