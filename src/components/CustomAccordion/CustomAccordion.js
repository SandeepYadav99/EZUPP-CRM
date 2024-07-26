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
import { getCurrencySymbol } from "../../helper/Helper";
import StatusPill from "../Status/StatusPill.component";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {  OutlineButton, PrimaryButton } from "../Buttons/PrimaryButton";

function CustomAccordion({
  data,
  draggable = false,
  handleDrag,
  handleSideToggle,
  handleCreate,
  handleUpdate
}) {
  const [expanded, setExpanded] = useState(0);
  const draggedItem = useRef();
  const draggedOverItem = useRef();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.notBox}>
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
              <Typography variant="subtitle1">{group?.title}{` (${group?.products?.length || 0})`}</Typography>
              <Box>
                <OutlineButton
                  variant="outlined"
                  sx={{ mr: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSideToggle(group);
                  }}
                >
                  Edit Group
                </OutlineButton>
                <PrimaryButton
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreate(group?.id);
                  }}
                >
                  Add Service
                </PrimaryButton>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails className={styles.detailWrap}>
            <Divider />
            {group?.products?.map((service, serviceIndex) => (
              <Box
                id={service?.id}
                key={serviceIndex}
                className={styles.desBox}
                sx={{
                  borderBottom:
                    serviceIndex < group?.products?.length - 1 ? 1 : 0,
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
                <Typography className={styles.formFlex}>
                  {`${service.duration} mins`}
                </Typography>
                <Typography className={styles.formFlex}>
                  {getCurrencySymbol(service?.currency)}
                  {service.full_price}
                </Typography>
                <div className={styles.formFlex}>
                  <StatusPill
                    status={service?.status}
                    color={service?.status}
                  />
                </div>
                <div className={styles.formFlex2}>
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUpdate(service?.id);
                  }}
                >
                  <Edit fontSize={"small"} />
                </IconButton>
                </div>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default CustomAccordion;
