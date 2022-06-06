import { Text } from "@arc-ui/components";
import { FunctionComponent } from "react";
import ColorText, { ColorTypes, getColor } from "./ColorText";

interface DashbaordLabelProps {
  text: string;
  // type: LabelTypes;
  color: ColorTypes;
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
      style={{ border: `1px solid ${getColor(color)}` }}
    >
      <ColorText size="xs" color={color}>
        {text}
      </ColorText>
    </div>
  );
};

export default DashbaordLabel;
