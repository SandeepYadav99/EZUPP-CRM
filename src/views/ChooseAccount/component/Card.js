import styles from "./Style.module.css"

const CardComponent =({value})=>{
   return(
    <div className={styles.container} >
       <div><img src={value?.image} style={{height:"80px",width:"80px",borderRadius:"100%"}}/></div>
       <div><span className={styles.companyname}>{value?.company}</span></div>
       <div><span className={styles.email}>{value?.email}</span></div>
    </div>
   )
}

export default CardComponent;