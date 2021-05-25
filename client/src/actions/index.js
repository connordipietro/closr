import axios from "axios";

export const GET_COMPANIES = "GET_COMPANIES";
export const GET_DEALS = "GET_DEALS";
export const POST_COMPANY = "POST_COMPANY";

export function getCompanies(pageNumber, name) {
  return axios.get(`http://localhost:8000/companies?page=${pageNumber}`)
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

export function postNewCopmany(newCompany) {
  return axios.post(`http://localhost:8000/companies`, newCompany)
  .then(response => {
    return {
      type: POST_COMPANY,
      payload: response
    }; 
  })
  .catch(error => {
    alert('Error');
  });
};