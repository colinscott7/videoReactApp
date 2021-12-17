import * as bs from "reactstrap";
import * as cpx from "../../components";
import * as hook from "../../hooks";
import { RouteComponentProps } from "react-router-dom";

export const HomeView = (props: RouteComponentProps) => {
  const navigateToPath = (id: string) => (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    props.history.push(id);
  };

  const homePageList = hook.getServicesList()?.map((item, index) => {
    return (
      <bs.Col lg="4" key={`homepageitem___${index}`}>
        <bs.Card className={`card-tile icon-${item.theme}`} onClick={navigateToPath(`${item.url}`)}>
          <bs.CardBody>
            <div>
              <h2 className="card-title">{item.title}</h2>
            </div>
          </bs.CardBody>
        </bs.Card>
      </bs.Col>
    );
  });

  // console.log(homePageList);
  return (
    <>
      <cpx.Layout>
        <bs.Row className="mt-3 mb-4">
          <bs.Col xl="12" className="text-center mx-auto">
            <h1 className="display-1 text-dark">Get Started</h1>
            <p className="lead text-dark">
              This is a quick React/Typescript/Reacstrap/MobX starter app with some pre-made
              components and styles.
            </p>
          </bs.Col>
        </bs.Row>
        <bs.Row className="justify-content-center">{homePageList}</bs.Row>
        {/* <Row className="pt-3 pb-5">
          <Col sm="12" className="text-center">
            <Button
              color="outline-light-rgba display-btn"
              size="lg"
              onClick={navigateToPath("/contact")}
            >
              Get in touch
            </Button>
          </Col>
        </Row> */}
      </cpx.Layout>
    </>
  );
};
