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
  import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
  import { useState } from "react";
  import useContactList from "./QuickContact/ContactList.hook";
function CardType({showBusiness,setShowBusiness,handleBusinessToggle}){
  const [selectedOption, setSelectedOption] = useState("Business");
  // onClick={()=>handleBusinessToggle('business')}
  // const {showBusiness,setShowBusiness,handleBusinessToggle} =useContactList({});
console.log(selectedOption)
  const handleRadioChange = (event) => {
    console.log(event)
    console.log('Helloradio');
    console.log("cardType")
    setSelectedOption(event.target.value);
  };
 
    return(   <div className={styles.cardGrid1}>
      {/* <div style={{flex:"1"}}> */}
       <Card className={  selectedOption === 'Business'
                ? styles.cardSelected 
                : styles.cardNotSelected}>
        <div>
          <CardContent
            className={
              selectedOption === 'Business'
                ? styles.custom_option
                : styles.custom_opon1
            }
            // onClick={() => setSelectedOption('Business')}
              onClick={()=>{setSelectedOption(()=>'Business')
                handleBusinessToggle('business')}}
          >
            <Typography>
              {" "}
              <  DomainSharpIcon fontSize="small" />
            </Typography>
            <Typography component="p" variant="subtitle3" color="text.secondary"> Business </Typography>
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
        checked={selectedOption === 'Business'}
        onChange={(e)=>handleRadioChange(e)}
        value="Business"
        name="radio-buttons"
        size="small"
        // inputProps={{ 'aria-label': 'A' }}
      />
          </CardContent>
        </div>
      </Card>
      {/* </div> */}
     
      <Card className={ selectedOption === 'Individual'
                ? styles.cardSelected 
                : styles.cardNotSelected}>
        <div>
          <CardContent
            className={
              selectedOption === 'Individual'
                ? styles.custom_option
                : styles.custom_opon1
            }
            // onClick={() => setSelectedOption('Individual')}
            onClick={()=>{setSelectedOption(()=>'Individual')
              handleBusinessToggle('individual')}}
          >
            <Typography>
              {" "}
              <  PersonOutlineOutlinedIcon  fontSize="small" />
            </Typography>
            <Typography component="p" variant="subtitle3" color="text.secondary">Individual </Typography>
            {/* <Typography>
              {" "}
              Cake sugar plum fruitcake I love sweet roll jelly-o.
            </Typography> */}
            {/* <FormControl>
              <RadioGroup
              
                aria-labelledby="demo-radio-buttons-group-label"
                value={ selectedOption}
                onChange={handleRadioChange}
                name="radio-buttons-group"
              >
                <FormControlLabel
                className={styles.nosideMargin}
                  value={'Individual'}
                  control={<Radio size="small" sx={{padding:"0"}}/>}
                  label=""
                />
              </RadioGroup>
            </FormControl> */}
            <Radio
        checked={selectedOption === 'Individual'}
        className={styles.noPadding}
        onClick={handleRadioChange}
        size="small"
        value="Individual"
        name="radio-buttons"
        // inputProps={{ 'aria-label': 'A' }}
      />
          </CardContent>
        </div>
      </Card>
      </div>)
}
export default CardType;