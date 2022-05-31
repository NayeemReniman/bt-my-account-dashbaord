import { Heading, Rule } from "@arc-ui/components";
import { FunctionComponent } from "react";
import DashbaordLabel from "./DashbaordLabel";

interface DashboardCardRowProps {
  title: string;
  label: string;
  children: React.ReactNode;
}

const DashboardCardRow: FunctionComponent<DashboardCardRowProps> = ({
  title,
  label,
  children,
}) => {
  return (
    <div className="dashbaord__card__row__container">
      <div>
        <DashbaordLabel color="#DA020F" text={label}></DashbaordLabel>
      </div>
      <div>
        <Heading size="s"># {title}</Heading>
      </div>
      <Rule />
      <div>{children}</div>
    </div>
  );
};

export default DashboardCardRow;
