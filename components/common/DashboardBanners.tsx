import { Columns, Heading, Icon, Text } from "@arc-ui/components";
import Column from "@arc-ui/components/dist/types/components/SiteHeader/components/Column";
import { FunctionComponent } from "react";

interface DashboardBannersProps {
  title: string;
  body: string;
  linktext: string;
  href: string;
}

const DashboardBanners: FunctionComponent<DashboardBannersProps> = ({
  title,
  body,
  linktext,
  href,
}) => {
  return (
    <div className="dashbaord__banners__container">
      <div className="dashbaord__banners__body__container">
        <div>
          <Heading size="s">{title}</Heading>
        </div>
        <div>
          <Text size="xs">{body}</Text>
        </div>
        <div>
          <a href={href}>{linktext}</a>
        </div>
      </div>
      <div className="dashbaord__banners__control__container">
        <Icon color="brand" icon="btCross" size={22} />
      </div>
    </div>
  );
};

export default DashboardBanners;
