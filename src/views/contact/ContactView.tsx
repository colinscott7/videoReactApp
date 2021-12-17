import * as bs from "reactstrap";
import * as cpx from "../../components";
import { Link } from "react-router-dom";

export const ContactView = () => {
  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">Contact</h1>
          </bs.Col>
        </bs.Row>
        <bs.Row>
          <bs.Col>
            <bs.Form>
              <bs.FormGroup>
                <bs.Label for="contactName">Name</bs.Label>
                <bs.Input type="email" name="text" id="contactName" placeholder="Enter name" />
              </bs.FormGroup>
              <bs.FormGroup>
                <bs.Label for="contactEmail">Email</bs.Label>
                <bs.Input type="email" name="email" id="contactEmail" placeholder="Enter email" />
              </bs.FormGroup>
              <bs.FormGroup>
                <bs.Label for="contactSubject">Subject</bs.Label>
                <bs.Input type="select" name="select" id="contactSubject">
                  <option>General</option>
                  <option>Websites</option>
                  <option>Applications</option>
                  <option>Digital Content</option>
                  <option>Multimedia</option>
                  <option>Hosting</option>
                  <option>Support</option>
                </bs.Input>
              </bs.FormGroup>
              <bs.FormGroup>
                <bs.Label for="contactMessage">Message</bs.Label>
                <bs.Input
                  type="textarea"
                  name="text"
                  id="contactMessage"
                  placeholder="Enter message"
                  rows={10}
                />
              </bs.FormGroup>
              <bs.Button color="outline-secondary display-btn">Submit</bs.Button>
            </bs.Form>
          </bs.Col>
        </bs.Row>
      </cpx.Layout>
    </>
  );
};
