import { Icon, SiteFooter } from "@arc-ui/components";
import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <SiteFooter
      main={
        <>
          <SiteFooter.ItemGroup title="Find your business">
            <SiteFooter.Item href="#">0-5 employees</SiteFooter.Item>
            <SiteFooter.Item href="#">6-249 employees</SiteFooter.Item>
            <SiteFooter.Item href="#">250+ employees</SiteFooter.Item>
            <SiteFooter.Item href="#">Public sector</SiteFooter.Item>
          </SiteFooter.ItemGroup>
          <SiteFooter.ItemGroup title="Products">
            <SiteFooter.Item href="#">BT Halo for business</SiteFooter.Item>
            <SiteFooter.Item href="#">Broadband deals</SiteFooter.Item>
            <SiteFooter.Item href="#">Business mobile</SiteFooter.Item>
            <SiteFooter.Item href="#">Voice and collaboration</SiteFooter.Item>
            <SiteFooter.Item href="#">BTnet leased line</SiteFooter.Item>
            <SiteFooter.Item href="#">Business phone lines</SiteFooter.Item>
            <SiteFooter.Item href="#">Corporate IP solutions</SiteFooter.Item>
            <SiteFooter.Item href="#">Corporate networking</SiteFooter.Item>
            <SiteFooter.Item href="#">Corporate security</SiteFooter.Item>
          </SiteFooter.ItemGroup>
          <SiteFooter.ItemGroup title="Useful links">
            <SiteFooter.Item href="#">Contact BT</SiteFooter.Item>
            <SiteFooter.Item href="#">Make a complaint</SiteFooter.Item>
            <SiteFooter.Item href="#">Help & support</SiteFooter.Item>
            <SiteFooter.Item href="#">Case studies</SiteFooter.Item>
            <SiteFooter.Item href="#">Performance results</SiteFooter.Item>
            <SiteFooter.Item href="#">Why choose BT?</SiteFooter.Item>
          </SiteFooter.ItemGroup>
          <SiteFooter.ItemGroup title="Explore more on BT">
            <SiteFooter.Item href="#">For the home</SiteFooter.Item>
            <SiteFooter.Item href="#">
              For business and public sector
            </SiteFooter.Item>
            <SiteFooter.Item href="#">For wholesale</SiteFooter.Item>
            <SiteFooter.Item href="#">BT Group</SiteFooter.Item>
            <SiteFooter.Item href="#">
              <Icon icon="arcSocialLinkedin" size={16} /> Linkedin
            </SiteFooter.Item>
            <SiteFooter.Item href="#">
              <Icon icon="arcSocialTwitter" size={16} /> Twitter
            </SiteFooter.Item>
            <SiteFooter.Item href="#">
              <Icon icon="arcSocialYouTube" size={16} /> YouTube
            </SiteFooter.Item>
          </SiteFooter.ItemGroup>
        </>
      }
      siteName="All business. No drama."
    >
      <SiteFooter.Item href="#">Cookies</SiteFooter.Item>
      <SiteFooter.Item href="#">Terms of use</SiteFooter.Item>
      <SiteFooter.Item href="#">Code of practice</SiteFooter.Item>
      <SiteFooter.Item href="#">Privacy policy</SiteFooter.Item>
      <SiteFooter.Item href="#">Accessibility</SiteFooter.Item>
    </SiteFooter>
  );
};

export default Footer;
