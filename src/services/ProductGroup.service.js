import { postRequest, formDataRequest } from "../libs/AxiosService.util";

export async function serviceCreateProductGroup(params) {
  return await formDataRequest("product/groups/create", params);
}

export async function serviceUpdateProductGroup(params) {
  return await formDataRequest("product/groups/update", params);
}

export async function serviceDeleteProductGroup(params) {
  return await formDataRequest("product/groups/delete", params);
}
export async function serviceGetProductGroup(params) {
  return await postRequest("product/groups", params);
}
export async function serviceGetProductGroupPriority(params) {
  return await postRequest("product/groups/update/priority", params);
}
export async function serviceProductGroupCheck(params) {
  return await postRequest("product/groups/check", params);
}
export async function serviceGetProductGroupDetails(params) {
  return await postRequest("product/groups/detail", params);
}
