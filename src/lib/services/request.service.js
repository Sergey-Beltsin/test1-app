const parseJSON = (response) => {
  if (response?.status === 204) {
    return '';
  }
  if (!response?.headers.get('content-type')?.includes('application/json')) {
    // throw new Error('Incorrect response from the server');
    // eslint-disable-next-line no-console
    console.error('Incorrect response from the server');
    return '';
  }
  return response.json();
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return parseJSON(response).then((responseFormatted) => {
    if (response && responseFormatted) {
      const error = new Error(`${response.statusText}. Error id: ${responseFormatted.errorId}`);
      // eslint-disable-next-line no-console
      console.error(`Response error id: ${responseFormatted.errorId}`);
      error.response = response;
      error.response.payload = responseFormatted;
      throw error;
    }
  });
};

const formatQueryParams = (params) => Object.keys(params)
  .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&');

const getUrl = (url, options) => {
  if (options && options.params) {
    const params = formatQueryParams(options.params);
    return `${url}?${params}`;
  }
  return url;
};

export const RequestService = (url, options = {}) => {
  const requestUrl = getUrl(url, options);
  return fetch(requestUrl, options)
    .then(checkStatus)
    .then(parseJSON);
};
