import axios from "axios";

export const AddDataSource = function (data) {
  return function (dispatch) {
    dispatch({
      type: "ADD_DATA_SOURCE",
      payload: data,
    });
  };
};
export const EditDataSource = function (data) {
  return function (dispatch) {
    dispatch({
      type: "EDIT_DATA_SOURCE",
      payload: data,
    });
  };
};
export const DeleteDataSource = function (data) {
  return function (dispatch) {
    dispatch({
      type: "DELETE_DATA_SOURCE",
      payload: data,
    });
  };
};

export const LogIn = function (data) {
  return function (dispatch) {
    dispatch({
      type: "LOG_IN",
      payload: data,
    });
  };
};

export const LogOut = function (data) {
  return function (dispatch) {
    dispatch({
      type: "LOG_OUT",
      payload: data,
    });
  };
};

export const GetPosts = function () {
  return function (dispatch) {
    dispatch({
      type: "GET_POSTS",
      payload: axios.get("https://jsonplaceholder.typicode.com/posts"),
    });
  };
};
export const GetComments = function () {
  return function (dispatch) {
    dispatch({
      type: "GET_COMMENTS",
      payload: axios.get("https://jsonplaceholder.typicode.com/comments"),
    });
  };
};

export const PostComments = function (data) {
  return function (dispatch) {
    dispatch({
      type: "POST_COMMENTS",
      payload: data,
    });
  };
};
export const AddUserPost = function (data) {
  return function (dispatch) {
    dispatch({
      type: "ADD_POST",
      payload: axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: data.title,
        body: data.body,
        userId: parseInt(data.key, 10),
      }),
    });
  };
};
