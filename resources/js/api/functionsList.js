import axios from 'axios';
import { getToken } from '../utils/auth';

export const getTransactions = () => {
  const token = getToken();

  return axios
    .get('/api/transactions', {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      return res.data;
    });
};

export const getCategories = () => {
  const token = getToken();

  return axios
    .get('/api/categories', {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      return res.data;
    });
};

// eslint-disable-next-line camelcase
export const addItemTransaction = (title, description, start_date, end_date, type, amount, interval, currentValue, currentValueCurrency) => {
  const token = getToken();

  return axios
    .post('/api/transactions', {
      title: title,
      description: description,
      start_date: '2020-12-12',
      end_date: end_date,
      type: type,
      amount: amount,
      interval: interval,
      categories_id: 5,
      currencies_id: 5
    },
    {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      console.log(res);
    });
};

export const addItemCategory = (name) => {
  const token = getToken();

  return axios
    .post('/api/categories', {
      name: name
    },
    {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      console.log(res);
    });
};

export const deleteItemTransaction = id => {
  const token = getToken();

  return axios
    .delete(`/api/transactions/${id}`, {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteItemCategory = id => {
  const token = getToken();

  return axios
    .delete(`/api/categories/${id}`, {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

// eslint-disable-next-line camelcase
export const updateItemTransaction = (title, description, start_date, end_date, type, amount, interval, currentValue, currentValueCurrency, id) => {
  const token = getToken();

  return axios
    .put(`/api/transactions/${id}`, {
      title: title,
      description: description,
      start_date: '2020/05/02',
      end_date: end_date,
      type: type,
      amount: amount,
      interval: interval,
      categories_id: 1,
      currencies_id: 1
    },
    {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateItemCategory = (name, id) => {
  const token = getToken();

  return axios
    .put(`/api/transactions/${id}`, {
      name: name
    },
    {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
