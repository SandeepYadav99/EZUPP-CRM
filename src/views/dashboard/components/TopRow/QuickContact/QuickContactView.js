import ShadowBox from "../../../../../components/ShadowBox/ShadowBox";

import { Typography } from "@mui/material";
import Autocomplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomCheckbox from "../../../../../components/FormFields/CustomCheckbox";
import CardType from "./../CardType";
import { OutlineButton } from "../../../../../components/Buttons/PrimaryButton";
import { PrimaryButton } from "../../../../../components/Buttons/PrimaryButton";
import styles from "./../Style.module.css";
import useContactList from "./ContactList.hook";
function QuickContactView() {
   const {showBusiness,setShowBusiness,handleBusinessToggle} =useContactList({});
   console.log(showBusiness);
  return (
    <>
      <ShadowBox style={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Personal Information
        </Typography>

        <CardType showBusiness setShowBusiness handleBusinessToggle={ handleBusinessToggle }/>
        <CustomTextField label={"Email ID"} />
      </ShadowBox>
      <ShadowBox style={{ padding: "1rem" }} className={showBusiness?styles.cardWrapper:styles.inactive}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Business Information
        </Typography>
        <Autocomplete />

        <CustomTextField label={"Job Title"} />
        {/* <CustomSelectField value>  <MenuItem value="BUSINESS">BUSINESS</MenuItem></CustomSelectField> */}
      </ShadowBox>
      <ShadowBox style={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Service Information
        </Typography>

        <Autocomplete label={"Associate Tags"} />
        <Autocomplete label={"Source"} />
      </ShadowBox>
      <ShadowBox style={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Lead Details
        </Typography>

        <Autocomplete label={"Lead Owner"} />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <CustomCheckbox sx={{ width: "1rem" }} />
          <Typography
            component="span"
            variant="subtitle2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Add initial task to Lead Owner
          </Typography>
        </div>
      </ShadowBox>
      <div className={styles.buttonBox}>
        <OutlineButton>SAVE & ADD INFO</OutlineButton>
        <PrimaryButton>CREATE</PrimaryButton>{" "}
      </div>
    </>
  );
}
export default QuickContactView;
