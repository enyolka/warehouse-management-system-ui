import { useContext } from "react";
import { ClientModel, ProductModel, ProductTemplateModel  } from "../../api/apiModel"
import { ClientFormModel } from "../../components/clientTable/types";
import { ProductFormModel, ProductTemplateFormModel } from "../../components/productTable/types"
import { translateToModel as translateToClientModel, translatetoApiModel as translateToClientApiModel } from "../customers/translatorCustomers";
import { translateToFormModel as translateToFormTemplateModel, translateToApiModel as translateToTemplateApiModel } from "../productTemplates/translatorProductTemplate";
import { StoreContext } from "../store/StoreProvider";


const findSupplier = (template: number, suppliers: ClientFormModel[]) => {
  return suppliers.find(
    (it: ClientFormModel) => it.id === template
  );
}

export const translateToFormModel = (data: ProductModel[]): ProductFormModel[] => {
  try {
    return data.map((model : ProductModel) => ({
      id: model.id,
      name: model.name,
      supplier: translateToClientModel([model.supplier as ClientModel])[0],//findSupplier(model.template as number, suppliers)!,
      template: translateToFormTemplateModel([model.template as ProductTemplateModel])[0],
      length: model.length ?? 0,
      width: model.width ?? 0,
      height: model.height ?? 0,
      weight: model.weight ?? 0,
      created_by: localStorage.user_id,
      status: "ACCEPTED" ,
    }));
  } catch(e) {
  return []
  }
}

export const translatetoApiModel = (model: ProductFormModel): ProductModel => {
    return {
      id: model.id,
      name: model.name,
      supplier: translateToClientApiModel(model.supplier),
      template: translateToTemplateApiModel(model.template),
      length: model.length ?? 0,
      width: model.width ?? 0,
      height: model.height ?? 0,
      weight: model.weight ?? 0,
      created_by: localStorage.user_id,
      status: "ACCEPTED" ,
    }
}

export const translateToPostApiModel = (model: ProductFormModel): ProductModel => {
  return {
    id: model.id,
    name: model.name,
    supplier: translateToClientApiModel(model.supplier).id,
    template: model.template.id,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0,
    weight: model.weight ?? 0,
    created_by: localStorage.user_id,
    status: "ACCEPTED" ,
  }
}


export const translateToPostFormModel = (model: ProductModel, templates: ProductTemplateFormModel[]): ProductFormModel => {
  return {
    id: model.id,
    name: model.name,
    supplier:  translateToClientModel([model.supplier as ClientModel])[0],
    template: templates.find(temp => temp.id === model.template)!,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0,
    weight: model.weight ?? 0,
    created_by: localStorage.user_id,
    status: "ACCEPTED" ,
  }
}