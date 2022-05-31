import { Icon, SiteFooter } from "@arc-ui/components";
import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <SiteFooter
      curve={false}
      main={
        <>
          <SiteFooter.ItemGroup title="">
            <SiteFooter.Item href="#">For the home</SiteFooter.Item>
          </SiteFooter.ItemGroup>
          <SiteFooter.ItemGroup title="">
            <SiteFooter.Item href="#">For business and public sector</SiteFooter.Item>
          </SiteFooter.ItemGroup>
          <SiteFooter.ItemGroup title="">
            <SiteFooter.Item href="#">For global business</SiteFooter.Item>
          </SiteFooter.ItemGroup>
          <SiteFooter.ItemGroup title="">
            <SiteFooter.Item href="#">BT Group</SiteFooter.Item>
          </SiteFooter.ItemGroup>
        </>
      }
    >
      <SiteFooter.Item href="#">Contact BT</SiteFooter.Item>
      <SiteFooter.Item href="#">Sitemap</SiteFooter.Item>
      <SiteFooter.Item href="#">Terms of use</SiteFooter.Item>
      <SiteFooter.Item href="#">Code of practice</SiteFooter.Item>
      <SiteFooter.Item href="#">Privacy policy</SiteFooter.Item>
      <SiteFooter.Item href="#">Accessibility</SiteFooter.Item>
      <SiteFooter.Item href="#">Customer complaint code</SiteFooter.Item>
      <SiteFooter.Item href="#">Cookie preferences</SiteFooter.Item>
    </SiteFooter>
  );
};

export default Footer;
