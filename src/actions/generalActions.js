import axios from 'axios';
import { useEffect } from 'react';

export const AddDataSource = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_DATA_SOURCE',
      payload: data,
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

export const LogIn = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'LOG_IN',
      payload: data,
    });
  };
};

export const LogOut = function () {
  return function (dispatch) {
    dispatch({
      type: 'LOG_OUT',
    });
  };
};

export const GetPosts = function () {
  return function (dispatch) {
    dispatch({
      type: 'GET_POSTS',
      payload: axios.get('https://jsonplaceholder.typicode.com/posts'),
    });
  };
};
export const GetComments = function () {
  return function (dispatch) {
    dispatch({
      type: 'GET_COMMENTS',
      payload: axios.get('https://jsonplaceholder.typicode.com/comments'),
    });
  };
};
export const GetEndereco = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'GET_ENDERECO',
      payload: axios.get('viacep.com.br/ws/' + data + '/json/'),
    });
  };
};
export const PostComments = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'POST_COMMENTS',
      payload: data,
    });
  };
};
export const AddUserPost = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_POST',
      payload: axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: data.title,
        body: data.body,
        userId: parseInt(data.key, 10),
      }),
    });
  };
};
export const PrecoCombustivel = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'GET_CSV',
      payload: axios.get(
        'https://my-json-server.typicode.com/Gustavo195/TCC_Postos/postos'
      ),
    });
  };
};
export const ShowMap = function (data) {
  return function (dispatch) {
    dispatch({
      type: 'SHOW_MAP',
      payload: data,
    });
  };
};

export function MobileTestAction(data) {
  return function (dispatch) {
    dispatch({
      type: 'MOBILE_TEST',
      payload: data,
    });
  };
}

export function ProcurarPosto(data) {
  return function (dispatch) {
    dispatch({
      type: 'PROCURAR_POSTO',
      payload: data,
    });
  };
}
export function SetLocation(data) {
  return function (dispatch) {
    dispatch({
      type: 'SET_LOCATION',
      payload: data,
    });
  };
}
export function ShowMapDrawer(data) {
  return function (dispatch) {
    dispatch({
      type: 'HIDE_SHOW_DRAWER',
      payload: data,
    });
  };
}
export function VoteStar(data) {
  return function (dispatch) {
    dispatch({
      type: 'VOTE_STAR',
      payload: data,
    });
  };
}
export function GetCoord(data) {
  return function (dispatch) {
    dispatch({
      type: 'GET_COORD',
      payload: data,
    });
  };
}
export function ActiveLoadting() {
  return function (dispatch) {
    dispatch({
      type: 'ACTIVE_LOAD',
    });
  };
}
