import * as bs from "reactstrap";
import * as cpx from "../../components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentsLayout } from "./ComponentsLayout";
import classNames from "classnames";

export const ComponentsAccordionView = () => {
  const [activeItem, setActiveItem] = useState(0);

  const toggleItems = (item: number) => () => {
    if (activeItem !== item) {
      setActiveItem(item);
    } else {
      setActiveItem(0);
    }
  };
  const toggleItemsClasses = (item: number) =>
    classNames("accordion-button", activeItem !== item ? "collapsed" : "");

  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">Accordion</h1>
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
          <div className="accordion">
            <bs.AccordionItem className="">
              <h2 className="accordion-header">
                <bs.Button
                  aria-expanded={activeItem === 1}
                  onClick={toggleItems(1)}
                  className={toggleItemsClasses(1)}
                  active={activeItem === 1}
                >
                  Item 1
                </bs.Button>
              </h2>
              <bs.Collapse className="accordion-collapse" isOpen={activeItem === 1}>
                <div className="accordion-body">Item 1 Content</div>
              </bs.Collapse>
            </bs.AccordionItem>
            <bs.AccordionItem className="">
              <h2 className="accordion-header">
                <bs.Button
                  aria-expanded={activeItem === 2}
                  onClick={toggleItems(2)}
                  className={toggleItemsClasses(2)}
                  active={activeItem === 2}
                >
                  Item 2
                </bs.Button>
              </h2>
              <bs.Collapse className="accordion-collapse" isOpen={activeItem === 2}>
                <div className="accordion-body">Item 2 Content</div>
              </bs.Collapse>
            </bs.AccordionItem>
          </div>
        </ComponentsLayout>
      </cpx.Layout>
    </>
  );
};
