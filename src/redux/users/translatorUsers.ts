import { ClientModel } from "../../api/apiModel"
import { ClientFormModel } from "../../components/clientTable/types"

export const translateToModel = (data: ClientModel[] | number): ClientFormModel[] => {
  try {
    if(!(typeof data == "number"))
    return data.map(({ id, name, nip, phone, email, city, street_name, street_number, zip_code} : any) => ({
      id: id,
      name: name,
      nip: nip,
      phone: phone || "",
      email: email || "",
      city: city,
      streetName: street_name,
      streetNumber: street_number,
      zipCode: zip_code,
    })) 
    else return []
  } catch(e) {
  return []
  }
}

export const translatetoApiModel = (model: ClientFormModel): ClientModel => {
    return {
      id: model.id,
      name: model.name,
      nip: model.nip ?? "",
      phone: model.phone || "",
      email: model.email || "",
      city: model.city,
      street_name: model.streetName,
      street_number: model.streetNumber,
      zip_code: model.zipCode,
    }
}