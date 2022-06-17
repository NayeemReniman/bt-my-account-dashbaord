import Image from "next/image";
import { FunctionComponent } from "react";
import styles from "./appLoader.module.css";

export interface AppLoaderProps {}

const AppLoader: FunctionComponent<AppLoaderProps> = () => {
  return (
    <>
      <div className={styles.loader__container}>
        <Image
          src="/fb-loader.gif"
          alt="app-loader"
          width="200px"
          height="100px"
          layout="responsive"
        ></Image>
      </div>
    </>
  );
};

export default AppLoader;
