import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import {
  serviceProviderProfileGetKeyword,
  serviceProviderIsExist,
} from "../../../services/ProviderUser.service";
import { isEmail } from "../../../libs/RegexUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import { parsePhoneNumber } from "libphonenumber-js";
import useDebounce from "../../../hooks/DebounceHook";
import history from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
const initialForm = {
  full_name: "",
  age: "",
  contact: "",
  email: "",
  wa_contact: "",
  alternate_email: "",
  job_title: "",
  country: "",
  address: "",
  business_name: "",
  industry: "",
  website: "",
  buying_role: "",
  company_size: "",
  source: "",
  service_product: "",
  priority: "",
  seniority: "",
  description: "",
  contact_type: "",
  contact_owner: "",
  lead_status: "",
  lead_type: "",
  lead_details: "",
  time_zone: "",
  linkedIn_url: "",
  instagram_url: "",
  twitter_url: "",
  facebook_url: "",
  youtube_url: "",
  wa_broadcast_channel: "",
  utm: "",
};

const ContactCreatehook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [source, setSource] = useState([]);
  const [sourceData, setSorceData] = useState([]);
  const [contactOwnerlistData, setContactOwnerListData] = useState([]);
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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "email",
      "contact",
      "job_title",
      "country",
      "source",
      "address",
      "business_name",
    ];
    if (!id) {
      required.push("image");
    }
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) !== 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
      if (val === "contact" && form?.contact) {
        const phoneNumber = parsePhoneNumber(form?.contact);

        if (phoneNumber) {
          if (phoneNumber.isValid() === false) {
            errors.contact = "Invalid Number";
          }
        } else {
          errors.contact = "Invalid Number";
        }
      }
    });

    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
    }
    // if (form?.url && !validateUrl(form?.url)) {
    //   errors.url = true;
    //   SnackbarUtils.error("Please Enter the Valid Url");
    // }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, form?.country_code]);

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
      } else if (fieldName === "source") {
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
      LogUtils.log("errors==>", errors);
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      //submitToServer(status);
    },
    [checkFormValidation, setErrorData, form]
  );

  const handleCancel = useCallback(() => {
    history.push(RouteName.CONTACT_LIST);
  }, []);

  return {
    form,
    errorData,
    source,
    changeTextData,
    handleSubmit,
    handleCancel
  };
};

export default ContactCreatehook;
