import * as bs from "reactstrap";
import * as cpx from "../../components";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { ComponentsLayout } from "./ComponentsLayout";

export const ComponentsView = (props: RouteComponentProps) => {
  // const navigateToPath = (id: string) => (evt: any) => {
  //   evt.preventDefault();
  //   evt.stopPropagation();
  //   props.history.push(id);
  // };

  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">Components</h1>
          </bs.Col>
        </bs.Row>
        <ComponentsLayout>
          <p className="lead">
            We offer a wide variety of digital services to meet all of your needs and we also offer
            a range of maintenance and partnership contracts to help you either manage the delivered
            products or we can provide you with a dedicated team for your company.
          </p>
          <p className="lead">
            All of our products are built using HTML5, CSS3 and JS and are built to support all
            screen sizes and device types. We also make an effort to ensure that all our products
            are AA compliant by default.
          </p>
        </ComponentsLayout>
      </cpx.Layout>
    </>
  );
};
