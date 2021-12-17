import * as cpx from "../components";
import { LayoutProps } from "../interfaces/LayoutProps";
import { PagesData } from "../Data";

export const Layout = (props: LayoutProps) => {
  return (
    <>
      <div className="breadcrumb-wrapper bg-light">
        <div className="container">
          <cpx.Breadcrumb data={PagesData} />
        </div>
      </div>
      <div className="container">{props.children}</div>
    </>
  );
};
