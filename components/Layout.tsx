import {
  Align,
  Clock,
  Group,
  Surface,
  VerticalSpace,
} from "@arc-ui/components";
import { FunctionComponent } from "react";
import BillingSummaryCard from "./BillingSummaryCard";
import ClientDetailsCard from "./ClientDetailsCard";
import FakeAuthorization from "./FakeAuthorization";

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = () => {
  return (
    <Surface background="lighter">
      <Group grow growEqual>
        <Group.Item>
          <FakeAuthorization />
        </Group.Item>
        <Group.Item>
          <Clock />
        </Group.Item>
      </Group>
      <VerticalSpace />
      <Group grow growEqual>
        <Group.Item>
          <ClientDetailsCard />
        </Group.Item>
        <Group.Item>
          <BillingSummaryCard />
        </Group.Item>
      </Group>
    </Surface>
  );
};

export default Layout;
