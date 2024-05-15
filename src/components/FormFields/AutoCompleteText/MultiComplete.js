import React, { useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { InputAdornment, InputBase } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

const StyledChip = styled(Chip)(({ theme }) => ({
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(0),
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  // backgroundColor: theme.palette.grey[200],
  backgroundColor: theme.palette.primary,
  border: 0,
  color: theme.palette.common.black,
  borderRadius: "20px",
  fontWeight: "530",

  fontSize: "0.8rem",
  height: "1.5rem",

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
  isArray = false,
  ...rest
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e);
    },
    [onChange, onTextChange, value]
  );
  const theme = useTheme();

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
              InputProps={{
                ...params.InputProps,
                sx: {
                  paddingRight: `${theme?.spacing(0)} !important`,
                  position: "relative",
                },

                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ position: "absolute", right: "0", top: "50%" }}
                  >
                    <IconButton>
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <StyledOption {...props}>
              {showImage && <Avatar src={option?.image} alt={"Image"} />}
              <div>
                {isArray ? (
                  <div key={`enable_${option}`} className="option_auto_class">
                    {option}
                  </div>
                ) : (
                  enableField?.length > 0 &&
                  enableField?.map((field, index) => (
                    <div key={`enable_${index}`} className="option_auto_class">
                      {option[field]}
                    </div>
                  ))
                )}
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
                label={isArray ? option : option?.label}
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
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    paddingRight: `${theme?.spacing(0)} !important`,
                  },

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
