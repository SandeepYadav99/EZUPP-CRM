// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
    const disabledStyle = {
        '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[200]
        }
    };

    return {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    paddingLeft: theme.spacing(4),
                    paddingRight: theme.spacing(4),
                },
              sizeSmall: {
                  paddingTop: theme.spacing(0.2),
                paddingBottom: theme.spacing(0.2),
              },
                contained: {
                    ...disabledStyle
                },
                outlined: {
                    ...disabledStyle
                }
            }
        }
    };
}
