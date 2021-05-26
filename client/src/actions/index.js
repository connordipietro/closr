import axios from "axios";

export const GET_COMPANIES = "GET_COMPANIES";
export const GET_COMPANY = "GET_COMPANY";
export const GET_DEALS = "GET_DEALS";
export const POST_COMPANY = "POST_COMPANY";
export const PUT_DEAL = "PUT_DEAL";

export function getCompanies() {
  return axios.get(`/companies`)
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
  return axios.get(`http://localhost:8000/deals`)
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

/* export function putDeal(id, req) {
  return axios.put(`http://localhost:8000/deals/${id}`, req)
  .then(response => {
    console.log(response)
    return {
      type: PUT_DEAL,
      payload: response
    }; 
  })
  .catch(error => {
    alert('Error');
  });
}; */

export function postNewCopmany(newCompany) {
  return axios.post(`/companies`, newCompany)
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

// to be changed once we have the backend
export function getCompanyById(companies) {
  return {
    type: GET_COMPANY,
    payload: companies,
  };
}