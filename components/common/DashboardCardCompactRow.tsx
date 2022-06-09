import { FunctionComponent } from "react";
import { Heading, Text } from "@arc-ui/components";
import { ColorText } from "@nayeemreniman/bt-my-account-react-components";


interface DashbaordCardCompactRowProps {
  labels: { title: string; color: string; helperText: string }[];
  data: any[];
  labelKey: string;
}

const DashbaordCardCompactRow: FunctionComponent<
  DashbaordCardCompactRowProps
> = ({ labels, data, labelKey }) => {
  return (
    <div className="compact__row_wrapper">
      {labels.map((label) => (
        <div className="compact__row_container" key={label.title}>
          <div className="compact__row__color_container">
            <ColorText color="success" size="l">
              {
                data.filter(
                  (item) =>
                    item[labelKey].toLowerCase() === label.title.toLowerCase()
                ).length
              }
            </ColorText>
          </div>
          <div className="compact__row__text__container">
            <Heading size="xs">
              {label.title}{" "}
              <Text size="xs" isInline>
                - {label.helperText}
              </Text>
            </Heading>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashbaordCardCompactRow;
