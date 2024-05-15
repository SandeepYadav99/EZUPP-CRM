import { ButtonGroup, Typography } from "@mui/material";
import { OutlineButton } from "../Buttons/PrimaryButton";
import history from "../../libs/history.utils";
import styles from "./Style.module.css";
import {withStyles} from '@mui/styles';

const CustomButtonGroup = withStyles({
  root: {
    '& .MuiButton-outlined': {
      borderColor: 'transparent',
    },
  },
})(ButtonGroup);

const Dropdown = ({ parent, dropdown, routes }) => {
  const SubRoutes =
    routes?.length > 0
      ? routes?.filter((item) => item?.parent === parent && item?.is_sidebar)
      : [];

  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
        <CustomButtonGroup
      variant="outlined"
      size="small"
      aria-label="Medium-sized button group"
      className={styles.ddGroup}
    >
        {SubRoutes?.map((item, index) => (
          <OutlineButton
            color="primary"
            onClick={() => history.push(item?.path)}
            key={`btn_${index}`}
          >
            <div className={styles.btnWrap}>
              {<item.icon />}
              <Typography variant="body1">{item?.sidebarName}</Typography>
            </div>
          </OutlineButton>
        ))}
        </CustomButtonGroup>
    </ul>
  );
};

export default Dropdown;
