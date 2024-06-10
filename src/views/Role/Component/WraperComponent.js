import { Card, TableCell } from '@mui/material'
import { useTheme } from '@mui/styles'
import React from 'react'

const WraperComponentCheckBox = ({children, permission,  index}) => {
    const theme= useTheme()
  return (
    <TableCell sx={{
        [theme.breakpoints.down('sm')]: {
         display: 'block',
         width: '100%',
         marginBottom: theme.spacing(1),
       },
     }}>
       <Card
         sx={{
           textAlign: "center",
           width: "70%",
           [theme.breakpoints.down('sm')]: {
             width: '70%',
             margin:"auto"
           },
           border: permission
           ? `1px solid ${theme.palette.primary.ractange}`
           : `1px solid ${theme.palette.primary.ractangeborder}`,
           "& .MuiPaper-root-MuiCard-root": {
             backgroundColor: theme.palette.text.primary,
           },
         }}
       >
        {children}
        </Card>
        </TableCell>
  )
}

export default WraperComponentCheckBox