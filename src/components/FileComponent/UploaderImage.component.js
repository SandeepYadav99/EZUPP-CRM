import React, { useMemo, useCallback } from "react";
import styles from "./FileComponent.module.css";

function UploaderImage({
  value,
  url,
  // handleChange,
  // multiple,
  // accept = "image/*",
  error,
  title,
  default_image,
  cirularBanner,
  ...rest
}) {
  const backgroundStyle = useMemo(
    () => ({
      // backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderColor: error ? "red" : "#c2c2c2",
    }),
    [url, error]
  );

  const renderPlusIcon = useCallback(() => {
    if (!value && !default_image) {
      return cirularBanner ? (
        <img
          alt=""
          width="25"
          src={require("../../assets/img/ic_add_image.png")}
        />
      ) : (
        "+"
      );
    }
    return null;
  }, [value, default_image, cirularBanner]);

  const renderTextUpload = useCallback(() => {
    if (!value && !default_image && !cirularBanner) {
      return "Upload Banner Image";
    }
    return null;
  }, [value, default_image, cirularBanner]);

  return (
    <div>
      <div className={styles.imageBtnContainerNew}>
        <div
          className={
            cirularBanner ? styles.imageProfileNew : styles.imagePlusNew
          }
          style={backgroundStyle}
        >
          {url && <img src={url} alt=".." crossOrigin="anonymous" />}

          <div className={styles.imgLowerContainer}>
            <div style={{ marginTop: "20px" }}>
              <span className={styles.plus}>{renderPlusIcon()}</span>
              <div className={styles.textUpload}>{renderTextUpload()}</div>
            </div>
          </div>
        </div>
      </div>
      {title && (
        <div className={styles.tooltipFlex}>
          <span className={styles.tipText}>{title}</span>
        </div>
      )}
    </div>
  );
}

export default UploaderImage;
