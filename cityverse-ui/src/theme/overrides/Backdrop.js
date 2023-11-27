

// ----------------------------------------------------------------------

export default function Backdrop(theme) {
  // const varLow = alpha(theme.palette.grey[900], 0.48);
  // const varHigh = alpha(theme.palette.grey[900], 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: [
            
          ],
          '&.MuiBackdrop-invisible': {
            background: 'transparent'
          }
        }
      }
    }
  };
}
