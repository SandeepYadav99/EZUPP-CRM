import SnackbarUtils from "../../libs/SnackbarUtils";
import EventEmitter from "../../libs/Events.utils";
import {useEffect, useMemo} from "react";
import LogUtils from "../../libs/LogUtils";

const useCustomFileField = ({multiple, type, maxCount, maxSize, onChange, defaultImage, value}) => {
    useEffect(() => {
        LogUtils.log('value changed ', value);
    }, [value]);
    const handleFileChange = (e) => {
        const allowedArr = type;
        let isError = false;
        let tempTotal = 0;
        let totalValid = 0;
        e.preventDefault();
        if (e.target.files[0]) {
            const tempFiles = [];
            Object.keys(e.target.files).forEach((key) => {
                if (multiple && maxCount > 0 && maxCount <= tempTotal) {
                    return true;
                }
                const tempFile = e.target.files[key];
                const sFileName = tempFile.name;
                const sFileExtension = sFileName
                    .split(".")
                    [sFileName.split(".").length - 1].toLowerCase();
                const fileSize = tempFile.size;

                if (
                    fileSize <= maxSize &&
                    (allowedArr.length > 0
                        ? allowedArr.indexOf(sFileExtension) > -1
                        : true)
                ) {
                    tempFiles.push(tempFile);
                    totalValid++;
                } else {
                    isError = true;
                    SnackbarUtils.error(
                        `Maximum file upload size is ${
                            this?.props?.maxSize / (1024 * 1024)
                        } MB`
                    );
                }
                tempTotal++;
            });
            if (isError && totalValid < 1) {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
                    error: "Invalid Upload",
                    type: "error",
                });
            }
            if (tempFiles.length > 0) {
                if (multiple) {
                    onChange && onChange(tempFiles);
                } else {
                    onChange && onChange(tempFiles[0]);
                }
            }
        }
    }

    
    const url = useMemo(() => {

        if (value) {
            return URL?.createObjectURL(value);
        } else if (defaultImage) {
            return defaultImage ;
        }
    }, [value, defaultImage]);

    return {
        handleFileChange,
        url,
    }
};

export default useCustomFileField;
