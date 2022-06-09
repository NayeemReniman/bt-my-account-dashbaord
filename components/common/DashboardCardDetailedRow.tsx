import { Heading, Rule } from "@arc-ui/components";
import { FunctionComponent } from "react";
import DashbaordLabel from "./DashbaordLabel";

interface DashboardCardDetailedRowProps {
  title: string;
  label: string;
  children: React.ReactNode;
}

const DashboardCardDetailedRow: FunctionComponent<
  DashboardCardDetailedRowProps
> = ({ title, label, children }) => {
  return (
    <div className="dashbaord__card__row__container">
      <div>
        <DashbaordLabel color="success" text={label}></DashbaordLabel>
      </div>
      <div>
        <Heading size="s"># {title}</Heading>
      </div>
      <Rule />
      <div>{children}</div>
    </div>
  );
};

export default DashboardCardDetailedRow;
