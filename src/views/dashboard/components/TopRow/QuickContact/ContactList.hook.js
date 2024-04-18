import React, { useState } from "react";
import { useCallback } from "react";
const initialForm = {
    email: "",
    jobTitle:"",
    company_name:[],
    type: "",
    start_date: "",
    end_date: "",
    description: "",
    location: "",
    guest_name: [],
    event_url: "",
    is_all_day: false,
  };
function useContactList() {
  const [showBusiness, setShowBusiness] = useState(true);
  console.log(showBusiness);
  const handleBusinessToggle = useCallback(
    (data) =>
      data === "business" ? setShowBusiness(true) : setShowBusiness(false),
    [showBusiness, setShowBusiness]
  );
  return { showBusiness, setShowBusiness, handleBusinessToggle };
}
export default useContactList;
