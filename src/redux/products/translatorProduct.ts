import { ClientModel, ProductModel } from "../../api/apiModel"
import { ClientFormModel } from "../../components/clientTable/types";
import { ProductFormModel, ProductTemplateFormModel } from "../../components/productTable/types"
import { UserFormModel } from "../../components/staffTable/types";
import { translateToModel as translateToClientModel, translatetoApiModel as translateToClientApiModel } from "../customers/translatorCustomers";
import { translateToFormModel as translateToFormTemplateModel, translateToApiModel as translateToTemplateApiModel } from "../productTemplates/translatorProductTemplate";
import { LogisticUnitModel } from "../../api/apiModel";
 
const findClient = (template: number, clients: ClientFormModel[]): ClientFormModel => {
  return clients.find(
    (it: ClientFormModel) => it.id === template
  )!;
}

// const findStatus = (value: Status | undefined): StatusModel => {
//   return statuses.find((status) => value === status.value) ?? statuses[0]
// }

export const translateToFormModel = (data: ProductModel[], suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]): ProductFormModel[] => { 
  try {
    return data.map((model : ProductModel) => {
    const template = templates.find(temp => temp.id === model.template)!;
    // const supplier = suppliers.find(supp => supp.id === template.supplier.id)!;
    return({
      id: model.id,
      name: model.name,
      supplier: translateToClientModel([model.supplier as ClientModel])[0],
      customer: translateToClientModel([model.customer as ClientModel])[0],
      template: template,
      length: template.width,
      width: template.width ,
      height: template.height,
      weight: template.weight,
      price: template.price,
      created_by: model.created_by as UserFormModel,
      status: model.status,
      acceptance_at: model.acceptance_at,
      logistic_unit: model.logistic_unit,
      admission_file_url: model.admission_file_url,
      release_file_url: model.release_file_url,
    })});
  } catch(e) {
  return []
  }
}

export const translatetoApiModel = (model: ProductFormModel, suppliers: ClientFormModel[]): ProductModel => {
  // const supplier = suppliers.find(supp => supp.id === model.template.supplier.id)!;
    return {
      id: model.id,
      name: model.name,
      supplier: model.template.supplier.id,
      customer: model.customer?.id ,
      template: translateToTemplateApiModel(model.template),
      length: model.length ,
      width: model.width,
      height: model.height,
      weight: model.weight ?? 0,
      price: model.price,
      created_by: localStorage.user_id,
      status: model.status,
      acceptance_at: model.acceptance_at,
      logistic_unit: model.logistic_unit,
      admission_file_url: model.admission_file_url,
      release_file_url: model.release_file_url,
    }
}

export const translateToPostApiModel = (model: ProductFormModel, suppliers: ClientFormModel[]): ProductModel => {
  return {
    id: model.id,
    name: model.name,
    supplier: model.template.supplier.id,//findSupplier(model.template.id, suppliers).id ?? suppliers[0].id,
    customer: model.customer?.id,
    template: model.template.id,
    length: model.length,
    width: model.width,
    height: model.height ,
    weight: model.weight ?? 0,
    price: model.price,
    created_by: localStorage.user_id,
    status: model.status,
    acceptance_at: model.acceptance_at,
    logistic_unit: model.logistic_unit,
    admission_file_url: model.admission_file_url,
    release_file_url: model.release_file_url,
  }
}


export const translateToPostFormModel = (data: any, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[], customers?:  ClientFormModel[]): ProductFormModel[] => {
  if(data.products) data = data.products

  return data.map((model: any) => {
    const template = templates.find(temp => temp.id === model.template)!
  return {
    id: model.id,
    name: model.name,
    supplier:  findClient(model.supplier as number, suppliers)!,
    template: template,
    length: template.length,
    width: template.width,
    height: template.height,
    weight: template.weight,
    price: template.price,
    customer: findClient(model.customer as number, customers??[]),
    created_by: localStorage.user_id,
    status: model.status,
    acceptance_at: model.acceptance_at,
    logistic_unit: model.logistic_unit,
    admission_file_url: model.admission_file_url,
    release_file_url: model.release_file_url,
  }});
}

export const translateToFormModelLU = (data: LogisticUnitModel[]): LogisticUnitModel[] => { 
  try {
    return data.map((model : LogisticUnitModel) => ({
      id: model.id,
      products: model.products,
      total_price: model.total_price
    }));
  } catch(e) {
  return []
  }
}