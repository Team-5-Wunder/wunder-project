import Image from "next/image";
import style from "./heroBanner.module.scss";
import { max } from "cypress/types/lodash";

const HeroBanner = () => {
  return (
    <div className={style.heroBox}>
      <div className={style.leftPart}>
        <div className={style.titleAndShapes}>
          <div className={style.square}></div>
          <div className={style.longball}></div>
          <div className={style.ball}></div>
          <div className={style.redball}></div>
          <div className={style.halfball}></div>
          <div className={style.corner}></div>
          <div className={style.triangle}></div>
          <h1 className={`${style.title} font-overpass`}>
            Shaping the <br /> Digital Experience
          </h1>
          {/* <button className={style.worksButton}>View our work</button> */}
        </div>
      </div>
      <div className={style.rightPart}>
        <Image
          width={900}
          height={900}
          priority={true}
          className={style.heroPeople}
          src="/assets/heroPeople.png"
          alt="Man and woman"
          style={{ maxHeight: "90%", width: "auto" }}
        />
      </div>
    </div>
  );
};

export default HeroBanner;
