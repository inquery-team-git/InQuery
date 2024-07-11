import type { FormConfig } from '@/types';

import Action from './Action';
import CheckboxGroup from './Checbox';
import LabelButtonGroup from './LabelButton';
import RadioButtonGroup from './RadioButton';

interface FormGroupsProps {
  formConfigs: FormConfig[];
  onClickLabelButton?: (items: string[]) => void;
  onClickRadioButton?: (item: string) => void;
  onClickCheckbox?: (items: string[]) => void;
  onClickAction?: () => void;
}

function FormGroups(props: FormGroupsProps) {
  const { formConfigs } = props;
  return (
    <div className="filterSections">
      {formConfigs &&
        formConfigs.map((config, index) => {
          switch (config.type) {
            case 'checkbox':
              return <CheckboxGroup config={config} key={index} />;
            case 'radio':
              return <RadioButtonGroup config={config} key={index} />;
            case 'label':
              return <LabelButtonGroup config={config} key={index} />;
            case 'action':
              return <Action config={config} key={index} />;
            default:
              return null;
          }
        })}
    </div>
  );
}

export default FormGroups;
