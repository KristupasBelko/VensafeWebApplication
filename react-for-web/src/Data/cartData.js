class cartData {
  constructor() {
    this.data = [];
  }

  setData(data, type) {
    if (type === "LIST") {
      this.data = data;
    } else {
      this.data.push(data);
    }
  }

  getData() {
    return this.data;
  }
}
export default new cartData();
