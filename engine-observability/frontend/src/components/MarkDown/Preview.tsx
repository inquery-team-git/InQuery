/* eslint-disable tailwindcss/no-custom-classname */
import 'highlight.js/styles/default.css';

import React from 'react';

export default function Preview(props: any) {
  return (
    <div className="markdown-previw hljs-keyword ql-snow">
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: props.value }}
      />
    </div>
  );
}
