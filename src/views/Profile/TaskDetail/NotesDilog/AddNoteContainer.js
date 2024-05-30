import { ButtonBase, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { memo } from "react";
import NotesDilog from "./NotesDilog";
import useNotesDilogHook from "./NotesDilogHook";
import NoteItem from "./NoteItems";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import {
  ArrowPrimaryButton,
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
              <Typography variant={"h5"}>Add Note</Typography>
             
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

        {noteDetails?.length > 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default memo(AddNoteContainer);
