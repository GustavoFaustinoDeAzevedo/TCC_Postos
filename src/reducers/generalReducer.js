import { message } from 'antd';
var initialState = {
  loading: true,
  isAuthenticated: false,
  mobile: false,
  getPosts: '',
  getComments: '',
  comments: '',

  user: '',
  newPost: '',
  headPrecos: [],
  tabelaPrecos: [],
  mapHeight: '0px',
  dataSource: [
    {
      key: '1',
      nome: 'Gustavo',
      telefone: '(84) 55555-5555',
      email: 'gustavo@hotmail.com',
      senha: '123456',
      dba: true,
    },
    {
      key: '2',
      nome: 'Jairo',
      telefone: '(84) 55555-5555',
      email: 'jairo@hotmail.com',
      senha: '123456',
      dba: false,
    },
    {
      key: '3',
      nome: 'Dmytres',
      telefone: '(84) 55555-5555',
      email: 'dmytres@hotmail.com',
      senha: '123456',
      dba: false,
    },
  ],
};

const generalReducer = function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_DATA_SOURCE':
      state = {
        ...state,
        dataSource: [...state.dataSource, action.payload],
      };
      break;
    case 'GET_CSV_PENDING':
      state = {
        ...state,
        loading: true,
      };
      break;
    case 'GET_CSV_REJECTED':
      state = {
        ...state,
        loading: false,
      };
      message.error(action.payload.message);
      break;
    case 'GET_CSV':
      state = {
        ...state,
        loading: false,
        headPrecos: action.payload.shift(),
        tabelaPrecos: action.payload,
      };
      break;
    case 'SHOW_MAP':
      state = {
        ...state,
        loading: false,
        mapHeight: state.mobile
          ? state.mapHeight === '0px'
            ? '200px'
            : '0px'
          : state.mapHeight === '0px'
          ? '400px'
          : '0px',
      };
      break;
    case 'LOG_IN':
      state = {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
      break;
    case 'LOG_OUT':
      state = {
        ...state,
        user: '',
        isAuthenticated: false,
      };
      break;
    case 'MOBILE_TEST':
      state = {
        ...state,
        mobile: action.payload,
      };
      console.log(action.payload);
      break;
    default:
      return state;
  }
  return state;
};

export default generalReducer;
