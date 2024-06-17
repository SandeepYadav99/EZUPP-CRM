import { Card, TableCell } from '@mui/material'
import { useTheme } from '@mui/styles'
import React from 'react'

const WraperComponentCheckBox = ({children, permission,  index, module}) => {
    const theme= useTheme()
  return (
    <TableCell sx={{
      borderBottom:module ? "": "none", 
        [theme.breakpoints.down('sm')]: {
         display: 'block',
         width: '100%',
         
         marginBottom: theme.spacing(1),
         borderBottom:"none", 
       
       },
     }}>
       <Card
         sx={{
           
           display:"inline-block",
           boxShadow:"none",
           paddingLeft:theme.spacing(1.3),
           paddingRight:theme.spacing(2),
           [theme.breakpoints.down('sm')]: {
             width: '100%',
             textAlign:"center"
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