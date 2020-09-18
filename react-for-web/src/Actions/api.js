import axios from "axios";
import StoreId from "../Data/storeId";

const baseUrl = "http://localhost:49812/api/";

export function ProductApi(url = baseUrl + "products/") {
  return {
    fetchCategories: () => axios.get(url + StoreId.getData()),
    buyProducts: (productsArray) => axios.post(url, productsArray),
  };
}

export function StoreApi(url = baseUrl + "store/") {
  return {
    findStoreById: (storeId) =>
      axios.post(url, storeId, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
  };
}
