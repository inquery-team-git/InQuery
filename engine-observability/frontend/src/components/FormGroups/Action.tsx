import type { FormProps } from '@/types';

interface ActionProps {
  config: FormProps;
}
function Action(props: ActionProps) {
  const { title, onChange } = props.config;
  return (
    <div className="actionLink" onClick={onChange}>
      {title}
    </div>
  );
}

export default Action;
