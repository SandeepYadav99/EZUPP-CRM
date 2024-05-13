import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import {serviceProviderProfileGetKeyword} from "../../../services/ProviderUser.service";
const initialForm = {
    name: "",
    userName: "",
    image: "",
    contact: "",
    email: "",
    role: "",
    type: "",
    employee_id: "",
    joining_date: "",
    source: "",
    designation: "",
    manager: "",
    end_date: "",
    userManage: false,
    invoiteToUser: false,
};

const ContactCreatehook = () => {

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [images, setImages] = useState(null);
  const [source, setSource] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    serviceProviderProfileGetKeyword({}).then((res) => {
      if (!res?.error) {
        const data = res?.data;
        setSource(data);
      }
    });
  }, []);
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
