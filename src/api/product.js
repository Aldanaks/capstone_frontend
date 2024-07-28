import instance from ".";
import { storeToken } from "./storage";

const getAllProducts = async () => {
  const { data } = await instance.get("/product");
  return data;
};

const getProduct = async (productId) => {
  const { data } = await instance.get(`/product/${productId}`);
  return data;
};
export { getAllProducts, getProduct };
