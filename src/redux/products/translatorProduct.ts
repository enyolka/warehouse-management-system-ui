import { useContext } from "react";
import { ClientModel, ProductModel, ProductTemplateModel  } from "../../api/apiModel"
import { ClientFormModel } from "../../components/clientTable/types";
import { ProductFormModel, ProductTemplateFormModel } from "../../components/productTable/types"
import { UserFormModel } from "../../components/userTable/types";
import { translateToModel as translateToClientModel, translatetoApiModel as translateToClientApiModel } from "../customers/translatorCustomers";
import { translateToFormModel as translateToFormTemplateModel, translateToApiModel as translateToTemplateApiModel } from "../productTemplates/translatorProductTemplate";
import { StoreContext } from "../store/StoreProvider";


const findSupplier = (template: number, suppliers: ClientFormModel[]): ClientFormModel => {
  return suppliers.find(
    (it: ClientFormModel) => it.id == template
  )!;
}

export const translateToFormModel = (data: ProductModel[], suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]): ProductFormModel[] => {
  try {
    return data.map((model : ProductModel) => {
    const template = templates.find(temp => temp.id === model.template)!;
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
      status: model.status ?? "ACCEPTED" ,
    })});
  } catch(e) {
  return []
  }
}

export const translatetoApiModel = (model: ProductFormModel, suppliers: ClientFormModel[]): ProductModel => {
    return {
      id: model.id,
      name: model.name,
      supplier: translateToClientApiModel(findSupplier(model.supplier.id, suppliers)!).id,
      template: translateToTemplateApiModel(model.template),
      length: model.length ,
      width: model.width,
      height: model.height,
      weight: model.weight,
      created_by: localStorage.user_id,
      status: model.status ?? "ACCEPTED" ,
    }
}

export const translateToPostApiModel = (model: ProductFormModel, suppliers: ClientFormModel[]): ProductModel => {
  return {
    id: model.id,
    name: model.name,
    supplier: model.supplier.id,//findSupplier(model.template.id, suppliers).id ?? suppliers[0].id,
    template: model.template.id,
    length: model.length,
    width: model.width ?? 0,
    height: model.height ?? 0,
    weight: model.weight ?? 0,
    created_by: localStorage.user_id,
    status: model.status ?? "ACCEPTED" ,
  }
}


export const translateToPostFormModel = (model: ProductModel, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]): ProductFormModel => {
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
    status: model.status ?? "ACCEPTED" ,
  }
}