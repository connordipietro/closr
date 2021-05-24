import axios from "axios";

export const GET_COMPANIES = "GET_COMPANIES";
export const GET_DEALS = "GET_DEALS";

export function getCompanies() {
  return axios.get(`urlHere`)
  .then(response => {
    return {
      type: GET_COMPANIES,
      payload: response
    }; 
  })
  .catch(error => {
    alert('Error');
  });
};

export function getDeals() {
  return axios.get(`urlHere`)
  .then(response => {
    return {
      type: GET_DEALS,
      payload: response
    }; 
  })
  .catch(error => {
    alert('Error');
  });
};