import * as bs from "reactstrap";
import * as cpx from "../../components";
import { Link } from "react-router-dom";
import { ComponentsLayout } from "./ComponentsLayout";

export const ComponentsVideoView = () => {
  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">Video</h1>
          </bs.Col>
        </bs.Row>
        <ComponentsLayout>
          <p className="lead">
            Looking to take over the app store or simply engage your users? We can help your app{" "}
            <span className="font-weight-bold">stand out from the crowd</span>.
          </p>
          <p>
            All of our applications are built using the latest technologies and are built to support
            all screen sizes and device types unless requirements do not permit. We also make an
            effort to ensure that all our products are AA compliant by default.
          </p>
          <cpx.VideoPlayer
            src="/videos/demo.mp4"
            captions="/videos/captions/en/demo.vtt"
            allowFullscreen={true}
            color={"light"}
          />
        </ComponentsLayout>
      </cpx.Layout>
    </>
  );
};
