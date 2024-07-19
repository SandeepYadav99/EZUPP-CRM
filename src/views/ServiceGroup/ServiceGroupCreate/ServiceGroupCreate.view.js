import React from "react";
import CustomAccordion from "../../../components/CustomAccordion/CustomAccordion";
import useServiceGroupCreate from "./ServiceGroupCreate.hook";
import styles from "./Style.module.css";

function ServiceGroupCreate() {
  const { serviceData, handleDrag } = useServiceGroupCreate();
  return (
    <div>
      <CustomAccordion data={serviceData} draggable handleDrag={handleDrag} />
    </div>
  );
}

export default ServiceGroupCreate;
