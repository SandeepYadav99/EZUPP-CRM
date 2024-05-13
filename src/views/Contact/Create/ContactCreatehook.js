import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import {serviceProviderProfileGetKeyword, serviceProviderIsExist} from "../../../services/ProviderUser.service";
import {isEmail} from  "../../../libs/RegexUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import { parsePhoneNumber } from "libphonenumber-js";
import useDebounce from "../../../hooks/DebounceHook";
const initialForm = {
    name: "",
    age: "",
    contact: "",
    email: "",
     role: "",
     type: "",
    job_title: "",
    country: "",
    source: "",
    address: "",
    business_name: "",
    website: "",
    buying_role: "",
    company_size: "",
    userManage: false,
    invoiteToUser: false,
};

const ContactCreatehook = () => {

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [source, setSource] = useState([]);
  const emailDebouncer = useDebounce(form.email, 500);
  const { id } = useParams();

  useEffect(() => {
    serviceProviderProfileGetKeyword({}).then((res) => {
      if (!res?.error) {
        const data = res?.data;
        setSource(data);
      }
    });
  }, []);

  const validateField = useCallback(
    (field, values, errorKey, existsMessage) => {
      serviceProviderIsExist({ [field]: values, id: id || null }).then(
        (res) => {
          if (!res.error) {
            const errors = { ...errorData };
            if (res.data.is_exists) {
              errors[errorKey] = existsMessage;
            } else {
              delete errors[errorKey];
            }
            setErrorData(errors);
          }
        }
      );
    },
    [errorData, setErrorData, id]
  );

  const checkCodeValidation = useCallback(() => {
    validateField("email", form.email, "email", "Email Already Exist");
  }, [form.email, id]);

  useEffect(() => {
    if (emailDebouncer) checkCodeValidation();
  }, [emailDebouncer]);
  
  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      }  else if (fieldName === "source") {
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [ removeError, form, setForm]
  );

  return {
      form,
      errorData,
      source,
      changeTextData
  };
};

export default ContactCreatehook;
