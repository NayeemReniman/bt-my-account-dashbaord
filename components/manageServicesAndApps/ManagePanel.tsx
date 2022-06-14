import { Columns, Heading, VerticalSpace, Text } from "@arc-ui/components";

import { DashboardCard } from "@nayeemreniman/bt-my-account-react-components";
import { FunctionComponent } from "react";
import { Service } from "../../redux/profileAndProductsSlice";
import styles from "./managePanel.module.css";

interface ManagePanelProps {
  tilesConfig: Service;
  title: string;
}

const ManagePanel: FunctionComponent<ManagePanelProps> = ({
  tilesConfig,
  title,
}) => {
  return (
    <section>
      <Heading size="m">{title}</Heading>
      <VerticalSpace size="24" />
      <Columns>
        {Object.keys(tilesConfig).map((serviceCode) => (
          <Columns.Col span={4} key={serviceCode}>
            <DashboardCard
              key={serviceCode}
              buttonAction={() =>
                window.open(tilesConfig[serviceCode].externalLink, "_blank")
              }
              buttonText={tilesConfig[serviceCode].buttonText}
              headerText={tilesConfig[serviceCode].serviceName}
              icon={tilesConfig[serviceCode].icon}
              headingSize="s"
              iconSize={28}
            >
              <div className={styles.manage__tilesConfig__description__container}>
                <Text size="s">{tilesConfig[serviceCode].serviceDescription}</Text>
              </div>
            </DashboardCard>
          </Columns.Col>
        ))}
      </Columns>
    </section>
  );
};

export default ManagePanel;
