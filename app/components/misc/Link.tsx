import { ReactNode, forwardRef } from 'react';
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';

interface Props {
  href: string;
  hrefAs?: string;
  children: ReactNode;
  passHref?: boolean;
  underline?: any;
  sx?: any;
}

const Link = forwardRef(
  ({ href, hrefAs, children, passHref, underline, sx }: Props, _) => {
    return (
      <NextLink href={href} as={hrefAs} passHref={passHref}>
        <MUILink underline={underline} sx={sx}>
          {children}
        </MUILink>
      </NextLink>
    );
  }
);

export default Link;
