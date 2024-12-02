export const BASE_URL = 'http://192.168.1.39:3001/api/v1/' 

export const IMAGE_URL = 'http://192.168.1.39:3001/' 

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

  // Content 
  CREATE_CONTENT: BASE_URL + "add-content",
  UPDATE_CONTENT: BASE_URL + "update-content",
  GET_CONTENT: BASE_URL + "get-content",
  DELETE_CONTENT: BASE_URL + "delete-content",

  // Advertisement 
  CREATE_ADVERTISEMENT: BASE_URL + "add-advertisement",
  UPDATE_ADVERTISEMENT: BASE_URL + "update-advertisement",
  GET_ADVERTISEMENT: BASE_URL + "get-advertisement",
  DELETE_ADVERTISEMENT: BASE_URL + "delete-advertisement",


};

export default ApiConfig;
