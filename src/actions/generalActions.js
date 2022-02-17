import axios from 'axios';

export const AddDataSource = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_DATA_SOURCE',
      payload: data
    });
  };
};
export const EditDataSource = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'EDIT_DATA_SOURCE',
      payload: data,
    });
  };
};
export const DeleteDataSource = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_DATA_SOURCE',
      payload: data,
    });
  };
};
export const TesteAPI = function () {
  return function (dispatch) {
    dispatch({
      type: 'TESTE_API',
      payload: axios.post('https://jsonplacehoifhuiywgfiuyrwgflder.typicode.com/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
    });
  };
};