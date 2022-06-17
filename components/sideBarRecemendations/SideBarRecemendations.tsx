import Image from "next/image";
import { FunctionComponent } from "react";
import styles from "./sideBarRecemendations.module.css";

interface SideBarRecemendationsProps {}

const SideBarRecemendations: FunctionComponent<
  SideBarRecemendationsProps
> = () => {
  return (
    <div>
      <Image
        src="/ad-banner.png"
        alt="side-nav-ad-banner"
        width="241px"
        height="363px"
        layout="responsive"
      />
    </div>
  );
};

export default SideBarRecemendations;
