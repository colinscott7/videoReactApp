import * as bs from "reactstrap";
import * as cpx from "../../components";
import { Link } from "react-router-dom";
import { ComponentsLayout } from "./ComponentsLayout";

export const ComponentsButtonView = () => {
  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">Button</h1>
          </bs.Col>
        </bs.Row>
        <ComponentsLayout>
          <p className="lead">
            Looking to take over the app store or simply engage your users? We can help your app{" "}
            <span className="font-weight-bold">stand out from the crowd</span>.
          </p>

          <bs.Button color="primary">Primary</bs.Button>
          <bs.Button color="secondary">Secondary</bs.Button>
          <bs.Button color="success">Success</bs.Button>
          <bs.Button color="danger">Danger</bs.Button>
          <bs.Button color="warning">Warning</bs.Button>
          <bs.Button color="info">Info</bs.Button>
          <bs.Button color="light">Light</bs.Button>
          <bs.Button color="dark">Dark</bs.Button>

          <bs.Button color="link">Link</bs.Button>
        </ComponentsLayout>
      </cpx.Layout>
    </>
  );
};
