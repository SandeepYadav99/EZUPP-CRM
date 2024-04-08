import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { SketchPicker } from "react-color";
import styles from "./Styles.module.css";
import ShadowBox from "../ShadowBox/ShadowBox";
const ColorPicker = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const [color, setColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setDisplayColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colorPickerRef]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor) => {
    console.log(newColor, "Color");
    setColor(newColor.rgb);
  };
  console.log(color, "color");
  return (
    <div className={styles.main}>
      <div ref={colorPickerRef}>
        {displayColorPicker && (
          <div className={styles.popover}>
            <div className={styles.cover} onClick={handleClose} />
            <SketchPicker color={color} onChange={handleChange} />
          </div>
        )}
      </div>

      <>
        <Card className={styles.card}>
          <Typography variant="h5" className={styles.title}>
            Color Picker
          </Typography>
          <CardContent>
            <div className={styles.colorContainer}>
              <div className={styles.swatch} onClick={handleClick}>
                <div
                  className={styles.color}
                  style={{
                    background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    </div>
  );
};

export default ColorPicker;
