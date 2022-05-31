import { Text } from "@arc-ui/components";
import { FunctionComponent } from "react";

interface DashbaordLabelProps {
  text: string;
  // type: LabelTypes;
  color: string;
}
export type LabelTypes =
  | "repair delayed"
  | "Fault reported"
  | "in progress"
  | "Fault resolved"
  | "overdue";

const DashbaordLabel: FunctionComponent<DashbaordLabelProps> = ({
  text,
  color,
}) => {
  return (
    <div
      className="label__container"
      style={{ border: `1px solid ${color}`, color }}
    >
      <Text size="xs">{text}</Text>
    </div>
  );
};

export default DashbaordLabel;
