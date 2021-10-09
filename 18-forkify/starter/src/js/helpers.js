// AMN - Here we have functions and code that we reuse over and over in the
// code.
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js'

// AMN - to avoid slow connectivity making us to wait for a very long
// time we give some time to the fetch promise (2 secs). In case the
// fetch takes more than 2 seconds the timeout promise will win the
// race and a error saying the request took too long will be thrown.
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};
  
export const AJAX = async function(url, uploadData = undefined) {
  try {
    const fetchPro = uploadData 
    ? fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(uploadData),
    })
    : fetch(url);
  
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;     
  } catch (error) {
    throw error;
  }
};

// AMN - we can get any JSON url 
/*
export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;     
    } catch (error) {
        throw error;
    } 
};

export const sendJSON = async function (url, uploadData) {
  try {
      const res = await Promise.race([fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }), timeout(TIMEOUT_SEC)]);
      const data = await res.json();
      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;     
  } catch (error) {
      throw error;
  } 
};
*/

