import axios from "axios";
import { store } from "./store";

const baseUrl = "https://10.1.18.89:5001/api/storeapi";

export function ProductApi(url = baseUrl) {
  return {
    fetchCategories: () =>
      axios.post(
        url + "/GetProductsByStoreId",
        JSON.stringify(store.getState().storeId),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    buyProducts: (dataObject) =>
      axios.post(url + "/GetTicketByStoreId", dataObject),
  };
}

export default ProductApi;
