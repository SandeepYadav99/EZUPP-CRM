import payment from '../../assets/Assets/ic_notification_payment.png';
import message from '../../assets/Assets/ic_notification_message.png';
const data={
  "Data":[
    {
        "title": "Your Payment is pending",
        "body": "Attention: Your recent payment for product is still pending. Please settle the outstanding amount promptly to avoid any service disruptions.",
        "image": payment,
        "dateTime": "4:05 PM"   
    },
    {
        "title": "New Request Received",
        "body": "Description will be shown here",
        "image": message,
        "dateTime": "2 days ago"   
    }
   
  ]  
}

export default data;