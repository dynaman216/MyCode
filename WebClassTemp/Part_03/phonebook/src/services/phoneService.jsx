import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}*/

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then((response) => response.data.concat(nonExisting))
}

/*
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}
*/

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    console.log('Person added successfully:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error('Server responded with an error:', error.response.data.error);
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
    throw error; // Re-throw if you want the calling context to also handle it
  }
};



const update = (id, newObject) => {
  try {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error('Server responded with an error:', error.response.data.error);
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
    throw error; // Re-throw if you want the calling context to also handle it
  }
}

const deleteid = (id) => {
  try {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error('Server responded with an error:', error.response.data.error);
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
    throw error; // Re-throw if you want the calling context to also handle it
  }
}

export default {
  getAll,
  create,
  update,
  deleteid,
}