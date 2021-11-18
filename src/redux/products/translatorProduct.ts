import { useContext } from "react";
import { ProductModel, ProductPostModel } from "../../api/apiModel"
import { ClientFormModel } from "../../components/clientTable/types";
import { ProductFormModel, ProductTemplateFormModel } from "../../components/productTable/types"
import { translateToModel as translateToClientModel, translatetoApiModel as translateToClientApiModel } from "../customers/translatorCustomers";
import { translateToFormModel as translateToFormTemplateModel, translatetoApiModel as translateToTemplateApiModel } from "../productTemplates/translatorProductTemplate";
import { StoreContext } from "../store/StoreProvider";


export const translateToFormModel = (data: ProductModel[]): ProductFormModel[] => {
  try {
    return data.map((model : ProductModel) => ({
      id: model.id,
      name: model.name,
      supplier: translateToClientModel([model.supplier])[0],
      template: translateToFormTemplateModel([model.template])[0],
      length: model.length ?? 0,
      width: model.width ?? 0,
      height: model.height ?? 0
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
      height: model.height ?? 0
    }
}

export const translateToPostApiModel = (model: ProductFormModel): ProductPostModel => {
  return {
    id: model.id,
    name: model.name,
    supplier: model.supplier.id,
    template: model.template.id,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0
  }
}


export const translateToPostFormModel = (model: ProductPostModel, suppliers: ClientFormModel[], templates: ProductTemplateFormModel[]): ProductFormModel => {
  return {
    id: model.id,
    name: model.name,
    supplier:  suppliers.find(sup => sup.id === model.supplier)!,
    template: templates.find(temp => temp.id === model.template)!,
    length: model.length ?? 0,
    width: model.width ?? 0,
    height: model.height ?? 0
  }
}