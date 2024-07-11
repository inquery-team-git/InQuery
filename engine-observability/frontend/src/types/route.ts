export type Route = {
  id: string;
  path: string;
  name: string;
  layout: string;
  icon?: JSX.Element;
};

export type DropDownRoute = {
  path?: string;
  text: string;
  icon?: JSX.Element;
  showActive?: boolean;
  onClick?: () => void;
};
