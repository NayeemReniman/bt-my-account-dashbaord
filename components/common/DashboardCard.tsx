import { Rule, VerticalSpace } from "@arc-ui/components";
import { FunctionComponent } from "react";

interface DashbaordCardProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const DashbaordCard: FunctionComponent<DashbaordCardProps> = ({
  header,
  children,
}) => {
  return (
    <div className="dashboard__card__container">
      <div className="dashboard__card__header">{header}</div>
      <Rule/>
      <VerticalSpace size="8"/>
      {children}
    </div>
  );
};

export default DashbaordCard;
