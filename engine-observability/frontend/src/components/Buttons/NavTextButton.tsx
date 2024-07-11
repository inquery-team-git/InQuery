import Link from 'next/link';

interface NavTextLinkProps {
  description: string;
  linkText: string;
  path: string;
  className?: string;
  float?: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end';
}

const NavTextLink = ({
  description,
  linkText,
  path,
  float = 'right',
  className,
}: NavTextLinkProps) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        float,
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '15px',
        lineHeight: '18px',
        textAlign: 'center',
        letterSpacing: '-0.21px',
        color: '#939FAD',
        padding: '10px',
      }}
    >
      {description}
      <Link href={path}>
        <span
          style={{
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '17px',
            letterSpacing: '-0.21px',
            color: '#2BAE66FF',
            padding: 0,
            marginLeft: '5px',
            cursor: 'pointer',
          }}
        >
          {linkText}
        </span>
      </Link>
    </div>
  );
};

export default NavTextLink;
