export type FormAction = {
  icon: JSX.Element;
  url: string;
};

export type FormItem = {
  value: any;
  text: string;
};

export type FormConfig = {
  type: string;
  title: string;
  items?: FormItem[];
  action?: string | FormAction;
  value?: any;
  onChange?: ((data: any) => void) | ((event: any, data: any) => void);
};

export type FormProps = {
  title: string;
  items?: FormItem[];
  action?: string | FormAction;
  value?: any;
  error?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (event: any, data?: any) => void;
};
