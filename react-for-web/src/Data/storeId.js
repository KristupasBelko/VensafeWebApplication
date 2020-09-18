class storeId {
  constructor() {
    this.data = "";
  }

  setData(data) {
    console.log("setting the data", data);
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
export default new storeId();
