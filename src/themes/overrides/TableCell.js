// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          padding: 12,
          borderColor: theme.palette.divider
        },
        head: {
          fontWeight: 600,
          paddingTop: 10,
          paddingBottom: 10,
          background:theme.palette.tableHeadColor,
          borderRadus:"6px",
        }
      }
    }
  };
}
