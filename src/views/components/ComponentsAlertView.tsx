import * as bs from "reactstrap";
import * as cpx from "../../components";
import { Link } from "react-router-dom";
import { ComponentsLayout } from "./ComponentsLayout";

export const ComponentsAlertView = () => {
  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">Alert</h1>
          </bs.Col>
        </bs.Row>
        <ComponentsLayout>
          <p className="lead">
            Looking to take over the app store or simply engage your users? We can help your app{" "}
            <span className="font-weight-bold">stand out from the crowd</span>.
          </p>

          <bs.Alert color="primary">A simple primary alert—check it out!</bs.Alert>
          <bs.Alert color="secondary">A simple secondary alert—check it out!</bs.Alert>
          <bs.Alert color="success">A simple success alert—check it out!</bs.Alert>
          <bs.Alert color="danger">A simple danger alert—check it out!</bs.Alert>
          <bs.Alert color="warning">A simple warning alert—check it out!</bs.Alert>
          <bs.Alert color="info">A simple info alert—check it out!</bs.Alert>
          <bs.Alert color="light">A simple light alert—check it out!</bs.Alert>
          <bs.Alert color="dark">A simple dark alert—check it out!</bs.Alert>
        </ComponentsLayout>
      </cpx.Layout>
    </>
  );
};
