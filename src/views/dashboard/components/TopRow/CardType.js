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
import styles from "./Style.module.css";
import DomainSharpIcon from "@mui/icons-material/DomainSharp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import useContactList from "./QuickContact/ContactList.hook";
import { useMemo } from "react";
import { Padding } from "@mui/icons-material";
function CardType({ handleBusinessToggle, options }) {
  const [selectedOption, setSelectedOption] = useState("Business");
  // onClick={()=>handleBusinessToggle('business')}
  // const {showBusiness,setShowBusiness,handleBusinessToggle} =useContactList({});
  console.log(selectedOption); //logutils.log
  const handleRadioChange = (event) => {
    console.log(event);
    console.log("Helloradio");
    console.log("cardType");
    setSelectedOption(event.target.value);
  };
  const list = useMemo(() => {
    return options?.map(
      (
        item,index
      ) => (
        <Card key={`CardType${item?.key}`}
          className={
            selectedOption === item?.title //item.key
              ? styles.cardSelected
              : styles.cardNotSelected
          }
        >
          <div>
            <CardContent
              className={
                selectedOption === item?.title
                  ? styles.custom_option
                  : styles.custom_opon1
              }
              // onClick={() => setSelectedOption('Business')}
              onClick={() => {
                setSelectedOption(() => item?.title);
                handleBusinessToggle(item?.title);
              }}
            >
              <Typography> {item?.avatar}</Typography>
              <Typography
                component="p"
                variant="subtitle3"
                color="text.secondary"
              >
                {" "}
                {item?.title}{" "}
              </Typography>
              {/* <Typography>
      {" "}
      Cake sugar plum fruitcake I love sweet roll jelly-o.
    </Typography> */}
              {/* <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={ selectedOption}
        onChange={(event)=>handleRadioChange(event)}
        name="radio-buttons-group"
      >
        <FormControlLabel
       className={styles.nosideMargin}
          value={'Business'}
          control={<Radio size="small" sx={{padding:"0"}}/>}
          label=""
        />
      </RadioGroup>
    </FormControl> */}
              <Radio
              
                className={styles.noPadding}
                checked={selectedOption === item?.title}
                onChange={(e) => handleRadioChange(e)}
                value={item?.title}
                name="radio-buttons"
                size="small"
                // inputProps={{ 'aria-label': 'A' }}
              />
            </CardContent>
          </div>
        </Card>
      )
    );
  },[options,selectedOption,setSelectedOption,handleBusinessToggle]);
  return list;
}
export default CardType;
