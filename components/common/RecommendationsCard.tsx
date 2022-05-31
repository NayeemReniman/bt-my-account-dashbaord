import { Heading } from "@arc-ui/components";
import { FunctionComponent } from "react";
import DashbaordCard from "./DashboardCard";
import DashboardBanners from "./DashboardBanners";

interface RecommendationsCardProps {
  children: React.ReactNode;
  cardTitle: string;
  bannerTitle: string;
  bannerBody: string;
  bannerhref: string;
  bannerLinktext: string;
  contentSize: string;
}

const RecommendationsCard: FunctionComponent<RecommendationsCardProps> = ({
  children,
  cardTitle,
  bannerTitle,
  bannerBody,
  bannerLinktext,
  bannerhref,
  contentSize,
}) => {
  return (
    <>
      <DashbaordCard header={<Heading size="m">{cardTitle}</Heading>}>
        <div className="recomendationcard__container">
          <div style={{ width: contentSize }}>{children}</div>
          <div>
            <DashboardBanners
              body={bannerBody}
              href={bannerhref}
              linktext={bannerLinktext}
              title={bannerTitle}
            ></DashboardBanners>
          </div>
        </div>
      </DashbaordCard>
    </>
  );
};

export default RecommendationsCard;
