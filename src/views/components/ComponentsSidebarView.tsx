import React, { useState } from "react";
import * as bs from "reactstrap";
import * as cpx from "../../components";
import * as hook from "../../hooks";
import { Link } from "react-router-dom";
import classNames from "classnames";

export const ComponentsSidebarView = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClasses, setMenuClasses] = useState("");

  const servicesSidebarToggle = () => {
    if (menuVisible) {
      setMenuVisible(false);
      setMenuClasses("");
    }
    if (!menuVisible) {
      setMenuVisible(true);
      setMenuClasses("show");
    }
  };

  const getServicesPages = hook.getServicesList();
  const pathname = window.location.pathname;
  const servicesSidebarItems = getServicesPages?.map((page, index) => {
    const itemClasses = classNames({
      active: pathname === page.url,
    });

    return (
      <bs.Col sm="12" key={`sidebaritem___${index}`}>
        <Link to={page.url} className="card-link">
          <bs.Card className={`card-tile mb-2 view-list icon-${page.theme} ${itemClasses}`}>
            <bs.CardBody>
              <div>
                <h2 className="card-title">{page.title}</h2>
              </div>
            </bs.CardBody>
          </bs.Card>
        </Link>
      </bs.Col>
    );
  });

  return (
    <>
      <bs.Button
        className="services-sidebar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarList"
        aria-controls="navbarList"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={servicesSidebarToggle}
      >
        All services <cpx.LineAwesome icon="las la-bars" />
      </bs.Button>
      <div className={`services-sidebar collapse ${menuClasses}`}>
        <bs.Row>{servicesSidebarItems}</bs.Row>
      </div>
    </>
  );
};
