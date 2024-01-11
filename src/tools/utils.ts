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

function toFixed(value: number, fix: number = 2) {
  if (typeof value !== 'number') return value;
  return parseFloat(value.toFixed(fix));
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

function formatDate(millseconds: number) {
  let result = '';
  const seconds = millseconds / 1000;
  const days = seconds / 86400;
  const hours = seconds / 3600;
  const mins = seconds / 60;
  if (days >= 1) {
    const num = Math.trunc(days);
    const num2 = Math.trunc((days - num) * 24);
    result = `${num} days ${num2} hours`;
  } else if (hours >= 1) {
    const num = Math.trunc(hours);
    const num2 = Math.trunc((hours - num) * 60);
    result = `${num} hours ${num2} mins`;
  } else if (mins >= 1) {
    const num = Math.trunc(mins);
    const num2 = Math.trunc((mins - num) * 60);
    result = `${num} mins ${num2} secs`;
  } else if (seconds >= 1) {
    result = Math.trunc(seconds) + ' sec';
  } else {
    result = 'less than 1 second';
  }
  return result;
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
};
