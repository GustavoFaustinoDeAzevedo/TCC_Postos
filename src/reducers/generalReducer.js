import { message } from 'antd';

var initialState = {
  loading: false,
  post: null,
  dataSource: [
    {
      key: '1',
      nome: 'Gustavo',
      telefone: '(84) 55555-5555',
      email: 'gustavo@hotmail.com',
      senha: '123456',
    },
    {
      key: '2',
      nome: 'Jairo',
      telefone: '(84) 55555-5555',
      email: 'jairo@hotmail.com',
      senha: '123456',
    },
    {
      key: '3',
      nome: 'Dmytres',
      telefone: '(84) 55555-5555',
      email: 'dmytres@hotmail.com',
      senha: '123456',
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
    case 'EDIT_DATA_SOURCE':
      state = {
        ...state,
        dataSource: state.dataSource.map((c) => {
          if (c.key === action.payload.key) return action.payload;
          else return c;
        }),
      };
      break;
    case 'DELETE_DATA_SOURCE':
      state = {
        ...state,
        dataSource: state.dataSource.filter((c) => c.key !== action.payload),
      };
      break;
    case 'TESTE_API_PENDING':
      state = {
        ...state,
        loading: true,
      };
      break;
    case 'TESTE_API_REJECTED':
      state = {
        ...state,
        loading: false,
      };
      message.error(action.payload.message);
      break;
    case 'TESTE_API_FULFILLED':
      state = {
        ...state,
        loading: false,
        post: action.payload.data,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default generalReducer;
