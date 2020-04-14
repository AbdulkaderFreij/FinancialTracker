/* eslint-disable camelcase */
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
      const categories = res.data.map(category => {
        return {
          id: category.id,
          name: category.name,
        };
      });
      return categories;
    });
};

export const getCurrencies = () => {
  const token = getToken();
  return axios
    .get('/api/currencies', {
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    })
    .then(res => {
      console.log(res.data);
      const currencies = res.data.map(currency => {
        return {
          id: currency.id,
          country: currency.country,
          symbol: currency.symbol,
          code: currency.code
        };
      });
      return currencies;
    });
};

// eslint-disable-next-line camelcase
export const addItemTransaction = (title, description, start_date, end_date, type, amount, interval, categories_id, currencies_id) => {
  const token = getToken();

  return axios
    .post('/api/transactions', {
      title: title,
      description: description,
      start_date: start_date,
      end_date: end_date,
      type: type,
      amount: amount,
      interval: interval,
      categories_id: categories_id,
      currencies_id: currencies_id
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
      return res.data.category;
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
export const updateItemTransaction = (title, description, start_date, end_date, type, amount, interval, categories_id, currencies_id, id) => {
  const token = getToken();
  return axios
    .put(`/api/transactions/${id}`, {
      title: title,
      description: description,
      start_date: start_date,
      end_date: end_date,
      type: type,
      amount: amount,
      interval: interval,
      categories_id: categories_id,
      currencies_id: currencies_id
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
