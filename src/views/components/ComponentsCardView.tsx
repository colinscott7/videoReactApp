import * as bs from "reactstrap";
import * as cpx from "../../components";
import { Link } from "react-router-dom";
import { ComponentsLayout } from "./ComponentsLayout";

export const ComponentsCardView = () => {
  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">Card</h1>
          </bs.Col>
        </bs.Row>
        <ComponentsLayout>
          <p className="lead">
            Looking to take over the app store or simply engage your users? We can help your app{" "}
            <span className="font-weight-bold">stand out from the crowd</span>.
          </p>
          <bs.Card style={{ width: "18rem" }}>
            <img src="/logo192.png" className="card-img-top" alt="..." />
            <bs.CardBody>
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </p>
              <bs.Button color="primary">Go somewhere</bs.Button>
            </bs.CardBody>
          </bs.Card>
        </ComponentsLayout>
      </cpx.Layout>
    </>
  );
};
