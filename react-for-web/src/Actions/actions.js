import ProductApi from "./api";
export const ACTION_TYPES = {
  CREATE_TICKET: "CREATE_TICKET",
  FETCH_ALL: "FETCH_ALL",
  CART_DATA: "CART_DATA",
  STORE_ID: "STORE_ID",
};

export const fetchAsync = () => {
  return ProductApi().fetchCategories();
};

export const createTicketAsync = (data) => {
  return function (dispatch, getState) {
    const newData = {
      Products: data,
      StoreId: getState().storeId,
    };

    console.log("new data", newData);

    ProductApi()
      .buyProducts(newData)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.CREATE_TICKET,
          payload: response.data,
        });

        console.log("barcode yra toksai:", response.data);
        console.log("barcode yra toksai:", getState());
      })
      .catch((err) => console.log(err));
  };
};
