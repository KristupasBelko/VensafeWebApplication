import axios from "axios";
import { store } from "./store";

const baseUrl = "http://localhost:49812/api/";

export function ProductApi(url = baseUrl + "products/") {
  return {
    fetchCategories: () => axios.get(url + store.getState().storeId),
    buyProducts: (productsArray) => axios.post(url, productsArray),
  };
}

export default ProductApi;
