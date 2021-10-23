import { CustomerStore } from "./store"

export const translateCustomersData = (data: any): CustomerStore[] => {
  try {
    return data.map(({last_name, first_name, phone, city, street_name, street_number, zip_code}: any) => ({
      lastName: last_name,
      firstName: first_name,
      phone: phone || "",
      city: city,
      streetName: street_name,
      streetNumber: street_number,
      zipCode: zip_code,
    }))
  } catch(e) {
  return []
  }
}