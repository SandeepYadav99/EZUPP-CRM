import FileField from "./File.component";
import React from "react";
import styles from "./File.module.css";
import csx from "classnames";


const FileFieldImageComponent = ({value, url, onChange}) => {
    return (
        <div>
            <div className={styles.imageBtnContainer}>
                <div>
                    <div className={csx(styles.imagePlus, this.props.imageClass)} style={{
                        backgroundImage: "url(" + (this._getImageUrl(value)) + ")",
                        backgroundSize: 'cover', backgroundPosition: 'center', borderColor: (error ? 'red' : '#c2c2c2')
                    }}></div>
                </div>
                <div className={styles.imgLowerContainer}>
                    <div className={styles.imgFileLabelPlus}>
                        <span className={styles.plus}>{!value && !default_image ? '+' : ''}</span>
                        <div className={styles.textUpload}
                             style={error ? {} : {}}>{!value && !default_image ? 'Upload' : ''}</div>
                    </div>
                    <input multiple={multiple} id="upload" data-value={'JPG'} accept={accept ? accept : 'image/*'}
                           onChange={this._handleFileChange}
                           className={styles.fileInput}
                           type="file"/>
                </div>
                {/*<label style={{fontSize:'14px',fontWeight:'500'}}>{this.props.placeholder}</label>*/}
            </div>
            <div className={styles.tooltipFlex}>
                <span className={styles.tipText}>{title ? title : ''}</span>
            </div>
        </div>
    )
}

export default FileFieldImageComponent;
