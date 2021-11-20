import { ClientModel, ProductTemplateModel } from "../../api/apiModel"
import { ClientFormModel } from "../../components/clientTable/types";
import { ProductTemplateFormModel } from "../../components/productTable/types"
import { translateToModel as translateToClientModel, translatetoApiModel as translateToClientApiModel } from "../customers/translatorCustomers";


export const translateToFormModel = (data: ProductTemplateModel[]): ProductTemplateFormModel[] => {
  try {
    return data.map((model : ProductTemplateModel) => ({ 
      id: model.id,
      name: model.name,
      supplier: translateToClientModel([model.supplier as ClientModel])[0],
      length: model.length ?? 0,
      width: model.width ?? 0,
      height: model.height ?? 0,
      weight: model.weight ?? 0
    }));
  } catch(e) {
  return []
  }
}

export const translateToApiModel = (model: ProductTemplateFormModel): ProductTemplateModel => {
    return {
      id: model.id,
      name: model.name,
      supplier: translateToClientApiModel(model.supplier),
      length: model.length ?? 0,
      width: model.width ?? 0,
      height: model.height ?? 0,
      weight: model.weight ?? 0
    }
}

export const translateToPostApiModel = (model: ProductTemplateFormModel) => {
  return {
    id: model.id,
    name: model.name,
    supplier: model.supplier?.id,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0,
    weight: model.weight ?? 0
  }
}


export const translateToPostFormModel = (model: ProductTemplateModel, suppliers: ClientFormModel[]): ProductTemplateFormModel => {
  return {
    id: model.id,
    name: model.name,
    supplier:  suppliers.find(sup => sup.id === model.supplier)!,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0,
    weight: model.weight ?? 0
  }
}