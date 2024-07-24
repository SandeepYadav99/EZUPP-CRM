import React from 'react';
import styles from './File.module.css'
import useCustomFileField from "./CustomFileField.hook";
import LogUtils from "../../libs/LogUtils";

const CustomFileField = ({maxSize, maxCount, onChange, multiple, type, accept, render, name, defaultImage, value, error}) => {
    const { handleFileChange, url } = useCustomFileField({
        maxSize, maxCount, onChange, multiple, type,
        defaultImage, name, value
    });

    
    return (
        <div className={styles.confined}>
            {render && render({value, error, url})}
            <input multiple={multiple} id="upload" data-value={'JPG'} accept={accept ? accept : 'image/*'}
                   onChange={handleFileChange}
                   className={styles.fileInput}
                   type="file"/>
        </div>
    )
};

export default CustomFileField;
