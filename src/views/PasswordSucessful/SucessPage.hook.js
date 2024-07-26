import  { useCallback } from "react";
import historyUtils from "../../libs/history.utils";

const useSuccessPage = () => {
  const handleSubmit = useCallback(() => {
    historyUtils.push("/login");
  }, []);

  return {
    handleSubmit,
    
  };
};

export default useSuccessPage;
