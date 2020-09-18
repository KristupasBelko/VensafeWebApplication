import { ProductApi, StoreApi } from "./api";
import StoreId from "../Data/storeId";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  FETCH_ALL: "FETCH_ALL",
};

export const fetchAsync = () => {
  return ProductApi().fetchCategories();
};

export const create = (data, dispatch) => {
  return function (dispatch, getState) {
    console.log("getting data", StoreId.getData());
    const newData = {
      Products: data,
      StoreId: StoreId.getData(),
    };
    ProductApi()
      .buyProducts(newData)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.CREATE,
          payload: response.data,
        });

        console.log("barcode yra toksai:", response.data);
      })
      .catch((err) => console.log(err));
  };
};

export const findStoreAsync = (data) => {
  console.log("kas per duomenys", data);
  return function (dispatch) {
    StoreApi()
      .findStoreById(data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.CREATE,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
