import React, { ReactNode } from 'react';
import NextLink from 'next/link';

interface Props {
  className?: string;
  href: string;
  hrefAs?: string;
  children: ReactNode;
}

const Link = React.forwardRef(
  ({ className, href, hrefAs, children }: Props, ref) => {
    return (
      <NextLink href={href} as={hrefAs}>
        <a className={className}>{children}</a>
      </NextLink>
    );
  }
);

export default Link;
