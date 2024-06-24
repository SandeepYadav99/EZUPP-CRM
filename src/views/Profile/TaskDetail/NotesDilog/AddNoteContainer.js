import {  Typography } from "@mui/material";

import React, { memo, useMemo } from "react";
import NotesDilog from "./NotesDilog";
import useNotesDilogHook from "./NotesDilogHook";
import NoteItem from "./NoteItems";
import {
 
  PrimaryButton,
} from "../../../../components/Buttons/PrimaryButton";

const AddNoteContainer = ({ details, styles, classes }) => {
  const {
    form,
    toggleAcceptDialog,
    isAcceptPopUp,
    changeTextData,
    handleSubmit,
    noteDetails,
    errorData,
    isSubmitting,
  } = useNotesDilogHook();

  const noteLists =useMemo(()=>{
if(noteDetails?.length > 0){
  return noteDetails?.map((note, index) => (
    <NoteItem
      key={index}
      note={note}
      styles={styles}
      classes={classes}
    />
  ))
}
  },[noteDetails])

  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.notesContainer}>
          <Typography variant="h4" >Notes</Typography>
          <div>
            <PrimaryButton
              // className={styles.addTask}
              onClick={toggleAcceptDialog}
              // icon={<Add fontSize={"small"} />}
              paddingLR={2}
            >
              <Typography variant={"h6"} fontWeight={'600'} color={"#FFFFFF"}>ADD NOTES</Typography>
            </PrimaryButton>
          </div>
        </div>
        <div className={styles.gaps} />
        <NotesDilog
          isOpen={isAcceptPopUp}
          handleToggle={toggleAcceptDialog}
          form={form}
          isSubmitting={isSubmitting}
          changeTextData={changeTextData}
          handleSubmit={handleSubmit}
          errorData={errorData}
          onBlurHandler
        />

        {/* {noteDetails?.length > 0 ? (
          noteDetails?.map((note, index) => (
            <NoteItem
              key={index}
              note={note}
              styles={styles}
              classes={classes}
            />
          ))
        ) : (
          <div className={styles.notFound}>Notes not available!</div>
        )} */}
        {noteLists}
      </div>
    </div>
  );
};

export default memo(AddNoteContainer);
