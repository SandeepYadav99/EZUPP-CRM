import styles from "./Style.module.css";
import PdfImage from "../../../assets/CRMAssets/PdfImage.png";

const PdfMeeting = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.heading1}>{data?.heading}</span>
        <span className={styles.timeLine}>{data?.time}</span>
      </div>
      <span className={styles.timeLine}>{data?.t1}</span>
      <span className={styles.btnPdf}><img src={PdfImage} alt="pdfText" style={{height:"20px",width:"20px"}}/> invoice.pdf</span>
    </div>
  );
};

export default PdfMeeting;
