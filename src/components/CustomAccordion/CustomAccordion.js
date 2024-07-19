import React, { useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import styles from "./Style.module.css";
import ShadowBox from "../ShadowBox/ShadowBox";

function CustomAccordion({ data, draggable = false, handleDrag }) {
  const [expanded, setExpanded] = useState(0);
  const draggedItem = useRef();
  const draggedOverItem = useRef();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <ShadowBox className={styles.notBox}>
      {data?.map((group, groupIndex) => (
        <Accordion
          key={`acc_${groupIndex}`}
          className={styles.AccordianWrap}
          expanded={expanded === groupIndex}
          onChange={handleChange(groupIndex)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${groupIndex}-content`}
            id={`panel${groupIndex}-header`}
          >
            <Box className={styles.BoxWrap}>
              <Typography variant="subtitle1">{group?.title}</Typography>
              <Box>
                <Button variant="outlined" sx={{ mr: 1 }}>
                  Edit Group
                </Button>
                <Button variant="contained">Add Service</Button>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails className={styles.detailWrap}>
            <Divider />
            {group?.services?.map((service, serviceIndex) => (
              <Box
                id={service?.id}
                key={serviceIndex}
                className={styles.desBox}
                sx={{
                  borderBottom:
                    serviceIndex < group.services.length - 1 ? 1 : 0,
                  borderColor: "divider",
                }}
                draggable={draggable}
                onDragStart={(e) => {
                  console.log("onDragStart", e.target?.id);
                  draggedItem.current = e.target.id;
                }}
                onDragOver={(e) => {
                  // e.stopPropagation();
                  e.preventDefault();
                  draggedOverItem.current = e.currentTarget.id;
                  if (draggedItem.current && draggedOverItem.current) {
                    handleDrag &&
                      handleDrag(draggedItem.current, draggedOverItem.current);
                  }
                  // console.log('onDragOver', e.currentTarget.id)
                }}
                onDragEnd={(e) => {
                  if (draggedItem.current && draggedOverItem.current) {
                    handleDrag &&
                      handleDrag(draggedItem.current, draggedOverItem.current);
                  }
                  draggedOverItem.current = null;
                  draggedItem.current = null;
                }}
              >
                <Typography className={styles.formFlex}>
                  {service.name}
                </Typography>
                <Typography className={styles.formFlex1}>
                  {service.duration}
                </Typography>
                <Typography className={styles.formFlex2}>
                  {service.price}
                </Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </ShadowBox>
  );
}

export default CustomAccordion;
