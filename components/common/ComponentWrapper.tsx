import { Children, Fragment, FunctionComponent } from "react";

interface ComponentWrapperProps {
  height?: number;
  children: React.ReactNode;
}

const ComponentWrapper: FunctionComponent<ComponentWrapperProps> = ({
  height = `0`,
  children,
}) => {
  return <div style={{ height }}>{children}</div>;
};

export default ComponentWrapper;
