import * as bs from "reactstrap";
import * as cpx from "../../components";
import { Link } from "react-router-dom";
import { ComponentsLayout } from "./ComponentsLayout";
import { useState } from "react";
import classNames from "classnames";

export const ComponentsTabsView = () => {
  const [activeTab, setActiveTab] = useState(1);
  const toggleTabs = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // const toggleItemsClasses = (item: number) =>
  // classNames("accordion-button", activeTab !== item ? "" : "active");
  return (
    <>
      <cpx.Layout>
        <bs.Row className="justify-content-between align-items-center">
          <bs.Col>
            <h1 className="display-2 text-right text-secondary">Tabs</h1>
          </bs.Col>
        </bs.Row>
        <ComponentsLayout>
          <p className="lead">
            Looking to take over the app store or simply engage your users? We can help your app{" "}
            <span className="font-weight-bold">stand out from the crowd</span>.
          </p>
          <bs.Nav tabs>
            <bs.NavItem>
              <bs.Button
                className="nav-link"
                onClick={() => toggleTabs(1)}
                active={activeTab === 1}
              >
                Tab 1
              </bs.Button>
            </bs.NavItem>
            <bs.NavItem>
              <bs.Button
                className="nav-link"
                onClick={() => toggleTabs(2)}
                active={activeTab === 2}
              >
                Tab 2
              </bs.Button>
            </bs.NavItem>
          </bs.Nav>
          <bs.TabContent activeTab={activeTab}>
            <bs.TabPane tabId={1}>
              <p>test 1</p>
            </bs.TabPane>
            <bs.TabPane tabId={2}>
              <p>test 2</p>
            </bs.TabPane>
          </bs.TabContent>
        </ComponentsLayout>
      </cpx.Layout>
    </>
  );
};
