import { message } from "antd";

var initialState = {
  loading: false,
  getPosts: "",
  getComments: "",
  comments: "",
  isAuthenticated: false,
  user: "",
  newPost: "",
  dataSource: [
    {
      key: "1",
      nome: "Gustavo",
      telefone: "(84) 55555-5555",
      email: "gustavo@hotmail.com",
      senha: "123456",
      dba: true,
    },
    {
      key: "2",
      nome: "Jairo",
      telefone: "(84) 55555-5555",
      email: "jairo@hotmail.com",
      senha: "123456",
      dba: false,
    },
    {
      key: "3",
      nome: "Dmytres",
      telefone: "(84) 55555-5555",
      email: "dmytres@hotmail.com",
      senha: "123456",
      dba: false,
    },
  ],
};

const generalReducer = function (state = initialState, action) {
  switch (action.type) {
    case "ADD_DATA_SOURCE":
      state = {
        ...state,
        dataSource: [...state.dataSource, action.payload],
      };
      break;
    case "EDIT_DATA_SOURCE":
      state = {
        ...state,
        dataSource: state.dataSource.map((c) => {
          if (c.key === action.payload.key) return action.payload;
          else return c;
        }),
      };
      break;
    case "DELETE_DATA_SOURCE":
      state = {
        ...state,
        dataSource: state.dataSource.filter((c) => c.key !== action.payload),
      };
      break;
    case "GET_POSTS_PENDING":
      state = {
        ...state,
        loading: true,
      };
      break;
    case "GET_POSTS_REJECTED":
      state = {
        ...state,
        loading: false,
      };
      message.error(action.payload.message);
      break;
    case "GET_POSTS_FULFILLED":
      state = {
        ...state,
        loading: false,
        getPosts: action.payload.data,
      };
      break;
    case "LOG_IN":
      state = {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
      break;
    case "LOG_OUT":
      state = {
        ...state,
        user: "",
        isAuthenticated: false,
      };
      break;

    case "GET_COMMENTS_PENDING":
      state = {
        ...state,
        loading: true,
      };
      break;
    case "GET_COMMENTS_REJECTED":
      state = {
        ...state,
        loading: false,
      };
      message.error(action.payload.message);
      break;
    case "GET_COMMENTS_FULFILLED":
      state = {
        ...state,
        loading: false,
        getComments: action.payload.data,
      };
      break;
    case "POST_COMMENTS":
      state = {
        ...state,
        comments: action.payload,
      };
      break;
    case "ADD_POST_PENDING":
      state = {
        ...state,
        loading: true,
      };
      break;
    case "ADD_POST_REJECTED":
      state = {
        ...state,
        loading: false,
      };
      message.error(action.payload.message);
      break;
    case "ADD_POST_FULFILLED":
      state = {
        ...state,
        getPosts: [action.payload.data, ...state.getPosts],
        loading: false,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default generalReducer;
