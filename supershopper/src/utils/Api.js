function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

export default { 
  search: function(query) {
    console.log('fetch attempt')
    return fetch(`user/api/search?q=${query}`)
    .then(console.log('fetch success'))
    .then(checkStatus)
    .then(response => {console.log(response); response.json()})
  }
};
