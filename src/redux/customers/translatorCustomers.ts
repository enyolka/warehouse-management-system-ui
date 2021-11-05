import { CustomerModel } from "../../api/apiModel"
import { CustomerFormModel } from "../../components/customers/types"
import { CustomerStore } from "./store"

export const translateToStore = (data: any): CustomerStore[] => {
  try {
    return data.map(({ id, last_name, first_name, phone, email, city, street_name, street_number, zip_code} : any) => ({
      id: id,
      lastName: last_name,
      firstName: first_name,
      phone: phone || "",
      email: email || "",
      city: city,
      streetName: street_name,
      streetNumber: street_number,
      zipCode: zip_code,
    }))
  } catch(e) {
  return []
  }
}

export const translatetoApiModel = (model: CustomerFormModel): CustomerModel => {
    return {
      id: model.id,
      last_name: model.lastName,
      first_name: model.firstName,
      phone: model.phone || "",
      email: model.email || "",
      city: model.city,
      street_name: model.streetName,
      street_number: model.streetNumber,
      zip_code: model.zipCode,
    }
}