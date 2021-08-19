import { ReactElement, cloneElement } from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { AppBar, Container, Toolbar, Box, Button } from '@material-ui/core';
import Logo from '@/components/general/Logo';
import Link from '@/components/general/Link';

interface Props {
  children: ReactElement;
}

const ElevationScroll = ({ children }: Props) =>
  cloneElement(children, {
    elevation: useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    })
      ? 4
      : 0,
  });

const NavigationBar = (): ReactElement => {
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" sx={{ bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Toolbar
              sx={{ justifyContent: 'space-between', height: '64px' }}
              disableGutters
            >
              <Logo expanded sx={{ pl: 1, py: 0.5, height: 1 }} />
              <Box>
                <Button
                  component={Link}
                  href="/login"
                  sx={{ mr: 2 }}
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/signup"
                  color="primary"
                  variant="contained"
                >
                  Sign up
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default NavigationBar;
