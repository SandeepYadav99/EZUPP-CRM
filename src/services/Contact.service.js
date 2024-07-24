import { postRequest, formDataRequest } from "../libs/AxiosService.util";

export async function serviceCreateContactQuick(params) {
  return await postRequest("contacts/create/quickdsa", params);
}

export async function serviceUpdateContact(params) {
  return await postRequest("contacts/update", params);
}
export async function serviceGetContact(params) {
  return await postRequest("contacts", params);
}
export async function serviceGetCustomer(params) {
  return await postRequest("contacts/customers", params);
}


export async function serviceGetContactDetails(params) {
  return await postRequest("contacts/detail", params);
}

export async function serviceCreateContact(params) {
  return await postRequest("contacts/create", params);
}

export async function serviceDeleteContact(params) {
  return await formDataRequest("contacts/delete", params);
}

export async function serviceContactCheck(params) {
  return await postRequest("contacts/check", params);
}

export async function serviceCreateCustomer(params) {
  return await postRequest("contacts/customers/create", params);
}

