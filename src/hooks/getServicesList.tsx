import { PagesData } from "../Data";
export const getServicesList = () => {
  const servicesList = PagesData.filter((page) => page.id.includes("2-"));
  return servicesList;
};
