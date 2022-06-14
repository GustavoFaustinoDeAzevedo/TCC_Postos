import { message } from 'antd';
var initialState = {
  loading: true,
  isAuthenticated: false,
  mobile: false,
  mapDrawer: false,
  getPosts: '',
  getComments: '',
  comments: '',
  lat: 0,
  lng: 0,
  user: '',
  newPost: '',
  coord: [0, 0],
  headPrecos: [],
  tabelaPrecos: [],
  tabelaPrecosPesquisa: [],
  mapHeight: '0px',

  dataSource: [
    {
      key: '1',
      nome: 'Gustavo',
      telefone: '(84) 55555-5555',
      email: 'gustavo@hotmail.com',
      senha: '123456',
      votou: [],
      dba: true,
    },
    {
      key: '2',
      nome: 'Jairo',
      telefone: '(84) 55555-5555',
      email: 'jairo@hotmail.com',
      senha: '123456',
      votou: [],
      dba: false,
    },
    {
      key: '3',
      nome: 'Dmytres',
      telefone: '(84) 55555-5555',
      email: 'dmytres@hotmail.com',
      senha: '123456',
      votou: [],
      dba: false,
    },
  ],
};

const generalReducer = function (state = initialState, action) {
  switch (action.type) {
    case 'ACTIVE_LOAD':
      state = {
        ...state,
        loading: true,
      };
      break;
    case 'ADD_DATA_SOURCE':
      state = {
        ...state,
        dataSource: [...state.dataSource, action.payload],
      };
      break;
    case 'HIDE_SHOW_DRAWER':
      state = {
        ...state,
        loading: false,
        mapDrawer: action.payload,
      };
      break;
    case 'GET_COORD':
      state = {
        ...state,
        loading: false,
        coord: action.payload.split(','),
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
        tabelaPrecosPesquisa: action.payload,
      };
      break;
    case 'SHOW_MAP':
      state = {
        ...state,
        loading: false,
        mapHeight:
          window.screen.width <= 780
            ? state.mapHeight === '0px' || action.payload
              ? '228px'
              : '0px'
            : state.mapHeight === '0px' || action.payload
            ? '300px'
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
      break;
    case 'PROCURAR_POSTO':
      state = {
        ...state,
        tabelaPrecosPesquisa: action.payload
          ? state.tabelaPrecos.filter((x) => {
              let data = action.payload.split(' ');
              return data.every((y) => String(x).toLowerCase().includes(y));
            })
          : state.tabelaPrecos,
      };
      break;
    case 'SET_LOCATION':
      state = {
        ...state,
        latitude: action.payload[0],
        longitude: action.payload[1],
      };
      break;
    default:
      return state;
  }
  return state;
};

export default generalReducer;
