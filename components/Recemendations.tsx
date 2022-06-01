import {
  Columns,
  Heading,
  Image,
  Text,
  VerticalSpace,
} from "@arc-ui/components";
import { FunctionComponent } from "react";
import { UserDetails } from "../types/type.auth";
import RecommendationsCard from "./common/RecommendationsCard";

interface RecemendationsProps {
  userDetails: UserDetails["result"];
}

const Recemendations: FunctionComponent<RecemendationsProps> = ({
  userDetails = { FirstName: "" },
}) => {
  return (
    <>
      <RecommendationsCard
        bannerBody="You no longer need that landline. Cloud Voice brings your voice, video, meeting and messaging tools together under a single, intuitive and flexible online portal."
        bannerLinktext="Find out more about Cloud Voice Express>"
        bannerTitle="Decrease your phone costs "
        bannerhref="#"
        cardTitle=""
        contentSize="100%"
      >
        <>
          <Heading size="m">Yearly spend</Heading>
          <VerticalSpace size="24"/>
          <Columns>
            <Columns.Col span={6}>
              <Text size="s">Broadband</Text>
              <Heading size="l">£1344.00</Heading>
              <Text size="xs">0%</Text>
            </Columns.Col>
            <Columns.Col span={6}>
              <Text size="s">Phone line</Text>
              <Heading size="l">£420.99</Heading>
              <Text size="xs">+12%</Text>
            </Columns.Col>
          </Columns>
        </>
      </RecommendationsCard>
      <VerticalSpace size="64" />
      <RecommendationsCard
        cardTitle={`${userDetails.FirstName}, take secure payments and manage your business online`}
        bannerBody="Build customised point-of-sale experiences and unify both online and offline sales. Make selling coffees as good as having one!"
        bannerLinktext="Get stripe>"
        bannerTitle="Stripe terminal"
        bannerhref="#"
        contentSize="auto"
      >
        <Columns>
          <Columns.Col span={12}>
            <Image alt="stripe-terminal" src="/stripe-terminal.png" />
          </Columns.Col>
        </Columns>
      </RecommendationsCard>
    </>
  );
};

export default Recemendations;
