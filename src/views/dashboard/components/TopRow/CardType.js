import { Card, CardContent, Radio, Typography } from "@mui/material";
import styles from "./Style.module.css";
import { useEffect, useState } from "react";
import { useMemo } from "react";
function CardType({ handleBusinessToggle, options, value }) {
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, []);
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const list = useMemo(() => {
    return options?.map((item, index) => (
      <Card
        key={`CardType${item?.key}`}
        className={
          selectedOption === item?.value //item.key
            ? styles.cardSelected
            : styles.cardNotSelected
        }
      >
        <div>
          <CardContent
            className={
              selectedOption === item?.value
                ? styles.custom_option
                : styles.custom_opon1
            }
            onClick={() => {
              setSelectedOption(() => item?.value);
              handleBusinessToggle(item?.value);
            }}
          >
            <Typography> {item?.avatar}</Typography>
            <Typography
              component="p"
              variant="subtitle3"
              color="text.secondary"
            >
              {item?.title}
            </Typography>

            <Radio
              className={styles.noPadding}
              checked={selectedOption === item?.value}
              onChange={(e) => handleRadioChange(e)}
              value={item?.value}
              name="radio-buttons"
              size="small"
            />
          </CardContent>
        </div>
      </Card>
    ));
  }, [
    options,
    selectedOption,
    setSelectedOption,
    handleBusinessToggle,
    handleRadioChange,
  ]);
  return list;
}
export default CardType;
