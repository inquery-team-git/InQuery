import React, { useState } from 'react';

const defaultQuery = "Select\n\t*\n From 'cluster_metrics'";

export default function QueryEditor() {
  const [value, setValue] = useState(defaultQuery);

  // eslint-disable-next-line unused-imports/no-unused-vars
  const handleChange = (text: string) => {
    setValue(text);
  };

  return (
    <div
      style={{
        position: 'relative',
        fontSize: '1.2vw',
        letterSpacing: '0.1rem',
        gridColumn: '2 / 3',
        gridRow: '2 / 3',
        backgroundColor: 'white',
        textAlign: 'left',
        borderBottom: '2px solid #eeeff1',
        lineHeight: '3.3vh',
        minHeight: '300px',
        padding: '10px',
      }}
    >
      {value}
    </div>
  );
}
