import hljs from 'highlight.js';
import dynamic from 'next/dynamic';
import React from 'react';

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust'],
});
const ReactQuill = dynamic(
  () => import('react-quill').then((mod) => mod.default),
  { ssr: false }
);

interface EditorProps {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

export default function Editor(props: EditorProps) {
  const onChange = (content: string) => {
    if (props.onChange) {
      props.onChange(content);
    }
  };

  const modules = {
    syntax: false,
    toolbar: [
      [
        { header: [2, 3, 4, 5, 6, false] },
        // { size: ['small', false, 'large', 'huge'] },
        // { font: [] },
      ],
      [
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        // 'code',
        'code-block',
      ],
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        // { align: 'justify' },
      ],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      [
        { color: ['red', 'green', 'blue', 'orange', 'violet', '#d0d1d2'] },
        { background: ['red', 'green', 'blue', 'orange', 'violet', '#d0d1d2'] },
      ],
      // ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code',
    'code-block',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'color',
    'background',
    'align',
  ];

  return (
    <div className="markdown-editor">
      <ReactQuill
        theme="snow"
        placeholder={props.placeholder}
        defaultValue={props.value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
