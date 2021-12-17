import * as bs from "reactstrap";
import * as cpx from "../../components";
import { Link } from "react-router-dom";

export const AboutView = () => {
  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">About</h1>
          </bs.Col>
        </bs.Row>
        <bs.Row>
          <bs.Col>
            <p className="lead text-light-rgba">
              Outkast Design are based in Glasgow and we are a design studio specialising in a wide
              variety of digital services. We like to form close working relationships with our
              clients and work mainly with small and medium sized companies.
            </p>
            <h2 className="text-light-rgba">Meet the team</h2>
            <bs.Row>
              <bs.Col xl="4">
                <img className="img-avatar" src="./images/colin.jpg" />
              </bs.Col>
              <bs.Col xl="4">
                <img className="img-avatar" src="./images/holly.jpg" />
              </bs.Col>
            </bs.Row>
          </bs.Col>
          <bs.Col>
            <div className="polaroid">
              <img src="./images/cone.jpg" className="img-polaroid" />
              <div className="label-polaroid">Duke of Wellington Statue, Glasgow &#128513;</div>
            </div>
          </bs.Col>
        </bs.Row>
      </cpx.Layout>
    </>
  );
};
