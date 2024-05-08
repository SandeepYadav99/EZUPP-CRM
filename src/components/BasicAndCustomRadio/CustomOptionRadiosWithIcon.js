import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import styles from "./Styles.module.css";

export function CustomOptionRadiosWithIcon({
  label,
  headerTitle,
  selectedOption,
  value,
  basicPara,
  price,
  handleRadioChange,
  setSelectedOption,
  headerImage,
}) {
 

  return (
    <div>
      <div className={styles.cardGrid1}>
        <Card className={styles.card}>
          <div>
            <CardContent
              className={
                selectedOption === value
                  ? styles.custom_option
                  : styles.custom_opon1
              }
              onClick={() => setSelectedOption("starter")}
            >
              <Typography> {headerImage}</Typography>
              <Typography variant="h5">{label}</Typography>
              <Typography> {basicPara}</Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedOption}
                  onChange={handleRadioChange}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={""}
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
