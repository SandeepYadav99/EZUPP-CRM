// ==============================|| OVERRIDES - INPUT LABEL ||============================== //

import { BackHand } from "@mui/icons-material";

export default function InputLabel(theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[500],
            // background: "transparent",
          },
        outlined: {
          lineHeight: '1rem',
          '&.MuiInputLabel-sizeSmall': {
            lineHeight: '1rem'
          },
          '&.MuiInputLabel-shrink': {
            // background: theme.palette.background.paper,
            padding: '0 0px',
            // marginLeft: -6,
            lineHeight: '1.4375em'
          }
        }
      }
    }
  };
}
