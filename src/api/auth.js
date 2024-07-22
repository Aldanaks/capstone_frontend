import instance from ".";

const getAllProductsByCreator = async (username) => {
  const { data } = await instance.get(`/product/creator/${username}`);
  return data;
};

export { getAllProductsByCreator };
