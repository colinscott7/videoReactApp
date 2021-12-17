import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import * as bs from "reactstrap";
import * as cpx from "../../components";

import { BreadcrumbProps } from "../../interfaces/BreadcrumbProps";
import { PagesDataProps } from "../../interfaces/PagesDataProps";

export const Breadcrumb = (props: BreadcrumbProps) => {
  // const history = useHistory();
  const { pathname } = useLocation();
  const data = props.data.find((item: PagesDataProps) => item.url === pathname);

  return (
    <bs.Breadcrumb className={`bg-${props.color}`}>
      <bs.BreadcrumbItem>
        <Link to="/">Home</Link>
      </bs.BreadcrumbItem>
      {data && data.id.includes("2-") && (
        <bs.BreadcrumbItem>
          <Link to="/components">Components</Link>
        </bs.BreadcrumbItem>
      )}
      {data && data.id !== "1" && <bs.BreadcrumbItem active>{data.title}</bs.BreadcrumbItem>}
    </bs.Breadcrumb>
  );
};
