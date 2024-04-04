import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import styles from "./Styles.module.css";
import { useState } from "react";

export function UserCountRadioLables({ avatars, title }) {
  const [selectedOption, setSelectedOption] = useState("basic");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(selectedOption, "Options")
  return (
    <div>
      <Typography gutterBottom variant="h5">
        Basic Radio
      </Typography>
      <div className={styles.cardGrid}>
        <Card>
          <div>
            <CardContent
             className={selectedOption === "basic" ? styles.custom_option : styles.custom_opon}
              onClick={() => setSelectedOption("basic")}
            >
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="basic"
                  value={selectedOption}
                  onChange={handleRadioChange}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="basic"
                    control={<Radio />}
                    label="Basic"
                  />
                </RadioGroup>
                <div>Get 1 project with 1 teams members.</div>
              </FormControl>
              <div className={styles.flexBox}>Free</div>
            </CardContent>
          </div>
        </Card>
        <Card>
          <div>
            <CardContent  className={selectedOption === "premium" ? styles.custom_option : styles.custom_opon} onClick={() => setSelectedOption('premium')}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedOption}
                  onChange={handleRadioChange}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="premium"
                    control={<Radio />}
                    label="Premium"
                  />
                </RadioGroup>
                <div>Get 5 projects with 5 team members.</div>
              </FormControl>
              <div className={styles.flexBox}>$ 5.00</div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
