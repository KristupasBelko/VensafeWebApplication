import axios from "axios";
import { store } from "./store";

const baseUrl = "https://localhost:44378/api/StoreApi";

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
