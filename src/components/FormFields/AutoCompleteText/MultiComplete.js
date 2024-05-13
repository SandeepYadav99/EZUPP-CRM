import React, { useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Chip)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  backgroundColor: theme.palette.grey[200],
  border: 0,
  color: theme.palette.common.black,
  borderRadius: "20px",
  fontWeight: "530",
  // fontSize: ".775rem",
  fontSize:"0.8rem",
  // "&:hover": {
  //   backgroundColor: theme.palette.error.light,
  //   border: 0,
  // },
  "&:disabled": {
    backgroundColor: "transparent",
  },
  "& .MuiChip-deleteIcon": {
    backgroundColor: "transparent",
  },
  // "&:hover .MuiChip-deleteIcon": {
  //   color: "#FF0000",
  // },
}));

const StyledOption = styled("div")(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#2063CE",
  },
}));

const CustomMultiComplete = ({
  AutoCompleteList = [],
  value = null,
  isError,
  errorText,
  label,
  onChange,
  onTextChange,
  enableField = [],
  showImage = false,
  multiple = false,
  ...rest
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e);
    },
    [onChange, onTextChange, value]
  );
  return (
    <>
      {multiple ? (
        <Autocomplete
          multiple
          id="user-autocomplete-new-Auto"
          options={AutoCompleteList}
          onChange={(event, newValue) => {
            handleChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              error={isError}
              helperText={errorText}
              label={label}
              {...params}
              variant="outlined"
              color={"primary"}
              size={"small"}
              fullWidth
              {...rest}
            />
          )}
          renderOption={(props, option) => (
            <StyledOption {...props}>
              {showImage && <Avatar src={option?.image} alt={"Image"} />}
              <div>
                {enableField?.length > 0 &&
                  enableField?.map((field, index) => (
                    <div key={`enable_${index}`} className="option_auto_class">
                      {option[field]}
                    </div>
                  ))}
              </div>
            </StyledOption>
          )}
          value={value}
          renderTags={(value, getTagProps) =>
            value?.map((option, index) => (
              <StyledChip
                {...getTagProps({ index })}
                avatar={
                  showImage ? <Avatar src={option?.image} alt={"Image"} /> : ""
                }
                label={option?.label}
              />
            ))
          }
        />
      ) : (
        <>
          <Autocomplete
            id="tags-outlined"
            options={AutoCompleteList ? AutoCompleteList : []}
            renderInput={(params) => (
              <TextField
                error={isError}
                helperText={errorText}
                label={label}
                {...params}
                variant="outlined"
                color={"primary"}
                size={"small"}
                fullWidth
                {...rest}
              />
            )}
            onChange={(event, newValue) => {
              handleChange(newValue);
            }}
            variant="outlined"
            color={"primary"}
            size={"small"}
            value={value ? value : null}
            {...rest}
          />
        </>
      )}
    </>
  );
};

export default CustomMultiComplete;
