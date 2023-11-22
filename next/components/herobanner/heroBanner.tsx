import style from './heroBanner.module.scss';
import { overpass } from "@/styles/fonts";


const HeroBanner = () => {
  return (
    <div className={style.heroBox}>
      <div className={style.leftPart}>
        <div className={style.titleAndButton}>
          <div className={style.square}></div>
          <div className={style.longball}></div>
          <div className={style.ball}></div>
          <div className={style.redball}></div>
          <div className={style.halfball}></div>
          <div className={style.corner}></div>
          <h1 className={`${style.title} overpass`}>Shaping the <br /> Digital Experience</h1>
          <button className={style.worksButton}>View our work</button>
          <div className={style.triangle}></div>
        </div>
      </div>
      <div className={style.rightPart}>
        <img className={style.heroPeople} src="/heroPeople.png" alt="Man and woman" />
      </div>
    </div>
  );
};

export default HeroBanner;