import * as bs from "reactstrap";
import * as cpx from "../../components";
import { LayoutProps } from "../../interfaces/LayoutProps";
import { ComponentsSidebarView } from "./ComponentsSidebarView";

export const ComponentsLayout = (props: LayoutProps) => {
  return (
    <>
      <bs.Row>
        <bs.Col>
          <bs.Row>
            <bs.Col sm={12}>{props.children}</bs.Col>
          </bs.Row>
        </bs.Col>
        <bs.Col xl={3}>
          <ComponentsSidebarView />
        </bs.Col>
      </bs.Row>
    </>
  );
};
