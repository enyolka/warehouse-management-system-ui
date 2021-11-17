import { useContext } from "react";
import { ProductTemplateModel, ProductTemplatePostModel } from "../../api/apiModel"
import { ClientFormModel } from "../../components/clientTable/types";
import { ProductTemplateFormModel } from "../../components/productTable/types"
import { translateToModel as translateToClientModel, translatetoApiModel as translateToClientApiModel } from "../customers/translatorCustomers";
import { StoreContext } from "../store/StoreProvider";


export const translateToFormModel = (data: ProductTemplateModel[]): ProductTemplateFormModel[] => {
  try {
    return data.map((model : ProductTemplateModel) => ({
      id: model.id,
      name: model.name,
      supplier: translateToClientModel([model.supplier])[0],
      length: model.length ?? 0,
      width: model.width ?? 0,
      height: model.height ?? 0
    }));
  } catch(e) {
  return []
  }
}

export const translatetoApiModel = (model: ProductTemplateFormModel): ProductTemplateModel => {
    return {
      id: model.id,
      name: model.name,
      supplier: translateToClientApiModel(model.supplier),
      length: model.length ?? 0,
      width: model.width ?? 0,
      height: model.height ?? 0
    }
}

export const translateToPostApiModel = (model: ProductTemplateFormModel) => {
  return {
    id: model.id,
    name: model.name,
    supplier: model.supplier?.id,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0
  }
}


export const translateToPostFormModel = (model: ProductTemplatePostModel, suppliers: ClientFormModel[]): ProductTemplateFormModel => {
  console.log("Model")
  console.log(model)
  console.log(suppliers.find(sup => sup.id === model.supplier)!)
  return {
    id: model.id,
    name: model.name,
    supplier:  suppliers.find(sup => sup.id === model.supplier)!,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0
  }
}