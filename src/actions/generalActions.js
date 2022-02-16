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
