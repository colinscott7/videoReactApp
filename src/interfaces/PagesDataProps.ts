export interface PagesDataProps {
  id: string;
  url: string;
  title: string;
  hideNav?: boolean;
  theme?: string;
  content: any;
  children?: PagesDataProps;
}
