import { useContext } from "react";
import { ClientModel, ProductModel, ProductTemplateModel, Status  } from "../../api/apiModel"
import { ClientFormModel } from "../../components/clientTable/types";
import { statuses } from "../../components/productTable/productForm";
import { ProductFormModel, ProductTemplateFormModel, StatusModel } from "../../components/productTable/types"
import { UserFormModel } from "../../components/userTable/types";
import { translateToModel as translateToClientModel, translatetoApiModel as translateToClientApiModel } from "../customers/translatorCustomers";
import { translateToFormModel as translateToFormTemplateModel, translateToApiModel as translateToTemplateApiModel } from "../productTemplates/translatorProductTemplate";
import { StoreContext } from "../store/StoreProvider";

const findSupplier = (template: number, suppliers: ClientFormModel[]): ClientFormModel => {
  return suppliers.find(
    (it: ClientFormModel) => it.id == template
  )!;
}


const findStatus = (value: Status | undefined): StatusModel => {
  return statuses.find((status) => value === status.value) ?? statuses[0]
}


export const translateToFormModel = (data: ProductModel[], suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]): ProductFormModel[] => {
  try {
    return data.map((model : ProductModel) => {
    const template = templates.find(temp => temp.id === model.template)!;
    // const supplier = suppliers.find(supp => supp.id === template.supplier.id)!;
    return({
      id: model.id,
      name: model.name,
      supplier: translateToClientModel([model.supplier as ClientModel])[0],
      template: template,
      length: template.width,
      width: template.width ,
      height: template.height,
      weight: template.weight,
      created_by: model.created_by as UserFormModel,
      status: model.status,
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
      template: translateToTemplateApiModel(model.template),
      length: model.length ,
      width: model.width,
      height: model.height,
      weight: model.weight,
      created_by: localStorage.user_id,
      status: model.status,
    }
}

export const translateToPostApiModel = (model: ProductFormModel, suppliers: ClientFormModel[]): ProductModel => {
  return {
    id: model.id,
    name: model.name,
    supplier: model.template.supplier.id,//findSupplier(model.template.id, suppliers).id ?? suppliers[0].id,
    template: model.template.id,
    length: model.length,
    width: model.width ?? 0,
    height: model.height ?? 0,
    weight: model.weight ?? 0,
    created_by: localStorage.user_id,
    status: model.status,
  }
}


export const translateToPostFormModel = (data: any, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]): ProductFormModel => {
  
  return data.map((model: any) => {
    const template = templates.find(temp => temp.id === model.template)!
  return {
    id: model.id,
    name: model.name,
    supplier:  findSupplier(model.supplier as number, suppliers)!,
    template: template,
    length: template.length,
    width: template.width,
    height: template.height,
    weight: template.weight,
    created_by: localStorage.user_id,
    status: model.status,
  }});
}
