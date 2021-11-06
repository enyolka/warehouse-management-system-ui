import { CustomerModel } from "../../api/apiModel"
import { ClientFormModel } from "../../components/clientTable/types"

export const translateToModel = (data: any): ClientFormModel[] => {
  try {
    return data.map(({ id, name, phone, email, city, street_name, street_number, zip_code} : any) => ({
      id: id,
      name: name,
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

export const translatetoApiModel = (model: ClientFormModel): CustomerModel => {
    return {
      id: model.id,
      name: model.name,
      phone: model.phone || "",
      email: model.email || "",
      city: model.city,
      street_name: model.streetName,
      street_number: model.streetNumber,
      zip_code: model.zipCode,
    }
}