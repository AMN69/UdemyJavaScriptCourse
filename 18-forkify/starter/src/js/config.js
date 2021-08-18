// AMN - here we put all the configuration variables. Not all the vars
// only the ones that are core and/or we use in different places so we
// can change them in any moment if we wanted/needed to.

// Capital letter 'cos is a constant that will never change. Anyway, in case
// that for whatever reason we wanted to change the url we could do it
// by changing only it here and it would be automatically changed in 
// all the places used in the code. 

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
export const TIMEOUT_SEC = 10;