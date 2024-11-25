export const BASE_URL = 'http://192.168.1.39:3001/api/v1/' 

const ApiConfig = {
  LOGIN_USER: BASE_URL + "login",

  // Show Category
  CREATE_SHOW_CATEGORY: BASE_URL + "add-show-category",
  UPDATE_SHOW_CATEGORY: BASE_URL + "update-show-category",
  GET_SHOW_CATEGORY: BASE_URL + "get-show-category",
  DELETE_SHOW_CATEGORY: BASE_URL + "delete-show-category",

  // Event Category
  CREATE_EVENT_CATEGORY: BASE_URL + "add-event-category",
  UPDATE_EVENT_CATEGORY: BASE_URL + "update-event-category",
  GET_EVENT_CATEGORY: BASE_URL + "get-event-category",
  DELETE_EVENT_CATEGORY: BASE_URL + "delete-event-category",
};

export default ApiConfig;
