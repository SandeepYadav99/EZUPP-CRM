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
import { EngineeringTwoTone, Person, RocketLaunch } from "@mui/icons-material";

export function CustomOptionRadiosWithIcon({ avatars, title }) {
  const [selectedOption, setSelectedOption] = useState("basic");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(selectedOption, "Options");

  return (
    <div>
      <Typography gutterBottom variant="h5">
        Custom Option Radios With Icons
      </Typography>
      <div className={styles.cardGrid1}>
        <Card className={styles.card}>
          <div>
            <CardContent
              className={
                selectedOption === "starter"
                  ? styles.custom_option
                  : styles.custom_opon
              }
              onClick={() => setSelectedOption("starter")}
            >
              <Typography>
                {" "}
                <RocketLaunch fontSize="large" />
              </Typography>
              <Typography variant="h5">Starter</Typography>
              <Typography>
                {" "}
                Cake sugar plum fruitcake I love sweet roll jelly-o.
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedOption}
                  onChange={handleRadioChange}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="starter"
                    control={<Radio />}
                    label=""
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </div>
        </Card>
        <Card className={styles.card}>
          <div>
            <CardContent
              className={
                selectedOption === "personal"
                  ? styles.custom_option
                  : styles.custom_opon
              }
              onClick={() => setSelectedOption("personal")}
            >
              <Typography>
                {" "}
                <Person fontSize="large" />
              </Typography>
              <Typography variant="h5">Personal</Typography>
              <Typography>
                {" "}
                Cake sugar plum fruitcake I love sweet roll jelly-o.
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedOption}
                  onChange={handleRadioChange}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="personal"
                    control={<Radio />}
                    label=""
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </div>
        </Card>
        <Card className={styles.card}>
          <div>
            <CardContent
              className={
                selectedOption === "enterprise"
                  ? styles.custom_option
                  : styles.custom_opon
              }
              onClick={() => setSelectedOption("enterprise")}
            >
              <Typography>
                {" "}
                <EngineeringTwoTone fontSize="large" />
              </Typography>
              <Typography variant="h5"> Enterprise </Typography>
              <Typography>
                {" "}
                Cake sugar plum fruitcake I love sweet roll jelly-o.
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedOption}
                  onChange={handleRadioChange}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="enterprise"
                    control={<Radio />}
                    label=""
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
