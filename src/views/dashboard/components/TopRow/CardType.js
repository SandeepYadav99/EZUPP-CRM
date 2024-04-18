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
  import DomainSharpIcon from '@mui/icons-material/DomainSharp';
  import { useState } from "react";
  import useContactList from "./QuickContact/ContactList.hook";
function CardType({showBusiness,setShowBusiness,handleBusinessToggle}){
  const [selectedOption, setSelectedOption] = useState("Business");
  // onClick={()=>handleBusinessToggle('business')}
  // const {showBusiness,setShowBusiness,handleBusinessToggle} =useContactList({});

  const handleRadioChange = (event) => {
    
    console.log(event.target.value);
    console.log("cardType")
    setSelectedOption(event.target.value);
  };
 
    return(   <div className={styles.cardGrid1}>
       <Card className={styles.card}>
        <div style={{width:"11rem"}}>
          <CardContent
            className={
              selectedOption === 'Business'
                ? styles.custom_option
                : styles.custom_opon1
            }
            // onClick={() => setSelectedOption('Business')}
              onClick={()=>{setSelectedOption('Business')
                handleBusinessToggle('business')}}
          >
            <Typography>
              {" "}
              <  DomainSharpIcon fontSize="large" />
            </Typography>
            <Typography variant="subtitle1"> Business </Typography>
            {/* <Typography>
              {" "}
              Cake sugar plum fruitcake I love sweet roll jelly-o.
            </Typography> */}
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={ selectedOption}
                onChange={(event)=>handleRadioChange(event)}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value={'Business'}
                  control={<Radio />}
                  label=""
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </div>
      </Card>
      <Card className={styles.card}>
        <div style={{width:"11rem"}}>
          <CardContent
            className={
              selectedOption === 'Individual'
                ? styles.custom_option
                : styles.custom_opon1
            }
            // onClick={() => setSelectedOption('Individual')}
            onClick={()=>{setSelectedOption('Individual')
              handleBusinessToggle('individual')}}
          >
            <Typography>
              {" "}
              <  DomainSharpIcon  fontSize="large" />
            </Typography>
            <Typography variant="subtitle1">Individual </Typography>
            {/* <Typography>
              {" "}
              Cake sugar plum fruitcake I love sweet roll jelly-o.
            </Typography> */}
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={ selectedOption}
                onChange={handleRadioChange}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value={'Individual'}
                  control={<Radio />}
                  label=""
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </div>
      </Card>
      </div>)
}
export default CardType;