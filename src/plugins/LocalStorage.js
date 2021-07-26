function saveObjectToLocalStorage(key, data) {
  const parsedData = JSON.stringify(data);
  localStorage.setItem(key, parsedData);
  console.log({
    'Saved to localStorage': {
      key: data,
    },
  });
}

function getJSONFromLocalStorage(key) {
  let localList = {};
  if (localStorage.getItem(key)) {
    try {
      localList = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.warn(e);
      localStorage.remove(key);
    }
  }
  return localList;
}

export { getJSONFromLocalStorage, saveObjectToLocalStorage };
