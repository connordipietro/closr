import axios from "axios";

export const GET_COMPANIES = "GET_COMPANIES";
export const GET_COMPANY = "GET_COMPANY";
export const GET_DEALS = "GET_DEALS";
export const POST_COMPANY = "POST_COMPANY";

export function getCompanies() {
  return axios.get(`http://localhost:8000/companies`)
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
    console.log(response)
    return {
      type: POST_COMPANY,
      payload: response
    }; 
  })
  .catch(error => {
    alert('Error');
  });
};

// to be changed once we have the backend
export function getCompanyById(companies) {
  return {
    type: GET_COMPANY,
    payload: companies,
  };
}