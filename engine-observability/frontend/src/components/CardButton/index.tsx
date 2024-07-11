import cn from 'classnames';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

type CardItem = {
  type: string;
  title: string;
  text: string;
};
interface CardButtonProps {
  items: CardItem[];
  currentState: any;
  onChange: any;
}
function CardButton({ items = [], currentState, onChange }: CardButtonProps) {
  const [selected, setSelected] = useState(currentState);

  const onClick = (type: string) => {
    setSelected(type);
    return onChange && onChange(type);
  };

  return (
    <div className="d-flex align-items-center card-button-container mb-4">
      {items.map((b, index) => (
        <Button
          onClick={() => onClick(b.type)}
          className={cn('button', {
            selected: selected === b.type,
          })}
          key={index}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="title">{b.title}</div>
            <p>{b.text}</p>
          </div>
        </Button>
      ))}
    </div>
  );
}

export default CardButton;
