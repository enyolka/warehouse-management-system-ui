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
    return data.map((model : ProductModel) => ({
      id: model.id,
      name: model.name,
      supplier: translateToClientModel([model.supplier as ClientModel])[0],
      template: templates.find(temp => temp.id === model.template)!,
      length: model.length ?? 0,
      width: model.width ?? 0,
      height: model.height ?? 0,
      weight: model.weight ?? 0,
      created_by: model.created_by as UserFormModel,
      status: "ACCEPTED" ,
    }));
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
      length: model.length ?? 0,
      width: model.width ?? 0,
      height: model.height ?? 0,
      weight: model.weight ?? 0,
      created_by: localStorage.user_id,
      status: "ACCEPTED" ,
    }
}

export const translateToPostApiModel = (model: ProductFormModel, suppliers: ClientFormModel[]): ProductModel => {
  return {
    id: model.id,
    name: model.name,
    supplier: model.supplier.id,//findSupplier(model.template.id, suppliers).id ?? suppliers[0].id,
    template: model.template.id,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0,
    weight: model.weight ?? 0,
    created_by: localStorage.user_id,
    status: "ACCEPTED" ,
  }
}


export const translateToPostFormModel = (model: ProductModel, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]): ProductFormModel => {
  return {
    id: model.id,
    name: model.name,
    supplier:  findSupplier(model.supplier as number, suppliers)!,
    template: templates.find(temp => temp.id === model.template)!,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0,
    weight: model.weight ?? 0,
    created_by: localStorage.user_id,
    status: "ACCEPTED" ,
  }
}