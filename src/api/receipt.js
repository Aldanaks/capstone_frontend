import instance from ".";

const createReceipt = async (receiptData) => {
  const { data } = await instance.post("/receipt", receiptData);
  return data;
};

const getReceiptById = async (id) => {
  const { data } = await instance.get(`/receipt/${id}`);
  return data;
};

const getAllReceipts = async () => {
  const { data } = await instance.get("/receipt");
  return data;
};

const getRevenue = async () => {
  const { data } = await instance.get("/receipt/revenue");
  return data;
};

const getReceipt = async (id) => {
  const { data } = await instance.get(`/receipt/${id}`);
  return data;
};

export {
  getRevenue,
  getAllReceipts,
  getReceiptById,
  createReceipt,
  getReceipt,
};
