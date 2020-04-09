import axios from 'axios';

export const getTransactions = () => {
  return axios
    .get('/api/transactions', {
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      return res.data;
    });
};

export const getCategories = () => {
  return axios
    .get('/api/categories', {
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      return res.data;
    });
};

// eslint-disable-next-line camelcase
export const addItemTransaction = (title, description, start_date, end_date, type, amount, interval, currentValue, currentValueCurrency) => {
  return axios
    .post('/api/transactions', {
      title: title,
      description: description,
      start_date: start_date,
      end_date: end_date,
      type: type,
      amount: amount,
      interval: interval,
      category: currentValue,
      currency: currentValueCurrency
    },
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      console.log(res);
    });
};

export const addItemCategory = (name) => {
  return axios
    .post('/api/categories', {
      name: name
    },
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      console.log(res);
    });
};

export const deleteItemTransaction = id => {
  return axios
    .delete(`/api/transactions/${id}`, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteItemCategory = id => {
  return axios
    .delete(`/api/categories/${id}`, {
      headers: {'Content-Type': 'application/json'}
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
  return axios
    .put(`/api/transactions/${id}`, {
      title: title,
      description: description,
      start_date: start_date,
      end_date: end_date,
      type: type,
      amount: amount,
      interval: interval,
      category: currentValue,
      currency: currentValueCurrency
    },
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateItemCategory = (name, id) => {
  return axios
    .put(`/api/transactions/${id}`, {
      name: name
    },
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
