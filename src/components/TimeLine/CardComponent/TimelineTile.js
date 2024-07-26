import styles from "./Style.module.css";
import PdfImage from "../../../assets/CRMAssets/PdfImage.png";

const TimelineTile = ({ data }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span className={styles.heading1}>{data?.title}</span>
                <span className={styles.timeLine}>{data?.date}</span>
            </div>
            <span className={styles.timeLine}>{data?.description}</span>
        </div>
    );
};

export default TimelineTile;
