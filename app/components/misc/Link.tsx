import { ReactNode, forwardRef } from 'react';
import NextLink from 'next/link';
import { Link as MUILink, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

interface Props {
  href: string;
  hrefAs?: string;
  children: ReactNode;
  passHref?: boolean;
  underline?: 'none' | 'hover' | 'always';
  sx?: SxProps<Theme>;
}

// eslint-disable-next-line react/display-name
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
