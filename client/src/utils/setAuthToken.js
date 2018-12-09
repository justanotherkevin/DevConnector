import axios from 'axios';

// for login, 
// one reason why axios is better than fetch is that you can have default function attach to the axios call; this adds default header to call 
const setAuthToken =token =>{
  if( token ){
    // apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // delete auth header 
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken 