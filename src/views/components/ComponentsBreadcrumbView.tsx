import * as bs from "reactstrap";
import * as cpx from "../../components";
import { Link } from "react-router-dom";
import { ComponentsLayout } from "./ComponentsLayout";
import { PagesData } from "../../Data";

export const ComponentsBreadcrumbView = () => {
  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">Breadcrumb</h1>
          </bs.Col>
        </bs.Row>
        <ComponentsLayout>
          <p className="lead">
            Looking to take over the app store or simply engage your users? We can help your app{" "}
            <span className="font-weight-bold">stand out from the crowd</span>.
          </p>

          <cpx.Breadcrumb data={PagesData} />
        </ComponentsLayout>
      </cpx.Layout>
    </>
  );
};
