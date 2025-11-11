import axios from 'axios'

const baseUrl = '/api/blogs';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const congfig = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, congfig);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll, create, update, deleteBlog, setToken };