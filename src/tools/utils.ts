import axios from 'axios';

function getLocalStorage(key: string) {
  let data = window.localStorage.getItem(key);
  if (!data) return data;
  if (data.startsWith('{') || data.startsWith('[')) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  } else {
    return data;
  }
}

function setLocalStorage(key: string, data: any) {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  window.localStorage.setItem(key, data);
}

function removeLocalStorage(key: string) {
  window.localStorage.removeItem(key);
}

function getSessionStorage(key: string) {
  let data = window.sessionStorage.getItem(key);
  if (!data) return data;
  if (data.startsWith('{') || data.startsWith('[')) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  } else {
    return data;
  }
}

function setSessionStorage(key: string, data: any) {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  window.sessionStorage.setItem(key, data);
}

function removeSessionStorage(key: string) {
  window.sessionStorage.removeItem(key);
}

function parseJSON(str: string | object) {
  if (!str) {
    return null;
  }
  if (typeof str === 'object') {
    return str;
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

function toFixed(value: number, fix: number) {
  if (typeof value !== 'number') return value;
  return parseFloat(value.toFixed(fix || 2));
}

function textOverflow(value: string = '', width: number = 10) {
  if (value.length < width * 2) {
    return value;
  }
  if (typeof value.slice === 'function') {
    return `${value.slice(0, width)}...${value.slice(-width)}`;
  } else {
    console.warn('the value is not a srting', value);
    return '';
  }
}

function formatAddress(value = '', width = 10) {
  if (value.length < width * 2) {
    return value;
  }
  if (typeof value.slice === 'function') {
    return `${value.slice(0, width)}...${value.slice(-width)}`;
  } else {
    console.warn('the value is not a srting', value);
    return '';
  }
}

function metaData() {
  return new Promise((resolve, reject) => {
    axios
      .get('/dip20simple', {
        params: {
          method: 'getMetadata',
        },
      })
      .then((resp) => {
        const data = resp.data;
        if (data._result !== 0) return;
        const metaData = JSON.parse(data.data);
        resolve(metaData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function formatDate(date: any) {
  const time = date / 1000;
  let beforeTime = '';
  if (time / 86400 > 1) {
    beforeTime = Math.trunc(time / 86400) + ' days';
  } else if (time / 3600 > 1) {
    beforeTime = Math.trunc(time / 3600) + ' hours';
  } else if (time / 60 > 1) {
    beforeTime = Math.trunc(time / 60) + ' min';
  } else if (time > 1) {
    beforeTime = Math.trunc(time) + ' sec';
  } else {
    beforeTime = 'less than 1 second';
  }
  return beforeTime;
}

export const Utils = {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  parseJSON,
  toFixed,
  textOverflow,
  formatAddress,
  formatDate,
  metaData,
};
