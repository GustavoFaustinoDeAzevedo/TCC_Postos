import { message } from 'antd';
var initialState = {
  loading: false,
  loadingMap: false,
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
  tabelaPrecos: [
    {
      ID: 1,
      NOMEFANTASIA: 'Posto Premier',
      ENDERECO: 'Av. Sen. Salgado Filho, 1552',
      BAIRRO: 'Tirol',
      CEP: '59022-000',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.81064508080955, -35.20450492805552',
      NVOTOS: 68,
      RANK: 4,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 2,
      NOMEFANTASIA: 'Posto Cidade Natal',
      ENDERECO: 'Av. Sen. Salgado Filho, 2102',
      BAIRRO: 'Lagoa Nova',
      CEP: '59056-000',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.815061323507136, -35.206155926941804',
      NVOTOS: 287,
      RANK: 4.3,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 3,
      NOMEFANTASIA: 'Posto Monte Belo - Romualdo',
      ENDERECO: 'Av. Romualdo Galvão, 1954',
      BAIRRO: 'Lagoa Nova',
      CEP: '59056-105',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.811927723146007, -35.208301553553106',
      NVOTOS: 1,
      RANK: 5,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 4,
      NOMEFANTASIA: 'Posto Amigo - Salgado Filho',
      ENDERECO: 'Av. Sen. Salgado Filho, 2840',
      BAIRRO: 'Lagoa Nova',
      CEP: '59076-000',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.823616768173716, -35.20891700902441',
      NVOTOS: 52,
      RANK: 4.4,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 5,
      NOMEFANTASIA: 'Postos dos Anjos',
      ENDERECO: 'Av. dos Xavantes, 2001',
      BAIRRO: 'Pitimbú',
      CEP: '59067-600',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.86589084965274, -35.22617744294625',
      NVOTOS: 5,
      RANK: 3.6,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 6,
      NOMEFANTASIA: 'Zumba Petróleo',
      ENDERECO: 'Av. Dr. João Medeiros Filho, 975',
      BAIRRO: 'Igapó',
      CEP: '59104-200',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.76260409332525, -35.25214100947361',
      NVOTOS: 94,
      RANK: 4.1,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 7,
      NOMEFANTASIA: 'Posto Carrefour Posto Natal Zona Norte',
      ENDERECO: 'Av. Dr. João Medeiros Filho, 2005',
      BAIRRO: 'Potengi',
      CEP: '59108-200',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.75945233907403, -35.247539269429545',
      NVOTOS: 1874,
      RANK: 4.2,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 8,
      NOMEFANTASIA: 'Auto Posto Esmeraldo-24 Horas',
      ENDERECO: 'Av. Engenheiro Roberto Freire, 1608',
      BAIRRO: 'Capim Macio',
      CEP: '59082-400',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.862799971218557, -35.190016715342075',
      NVOTOS: 44,
      RANK: 4.4,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 9,
      NOMEFANTASIA: 'Cirne Postos - Petrópolis',
      ENDERECO: 'R. Gen. Gustavo Cordeiro de Faria, 383',
      BAIRRO: 'Petrópolis',
      CEP: '59056-200',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.78050355417864, -35.19869901564033',
      NVOTOS: 122,
      RANK: 4.4,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 10,
      NOMEFANTASIA: 'Posto campo belo',
      ENDERECO: 'R. Fonseca e Silva, 1088',
      BAIRRO: 'Alecrim',
      CEP: '59030-270',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.792921412841297, -35.21456539484271',
      NVOTOS: 58,
      RANK: 4.2,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 11,
      NOMEFANTASIA: 'Posto Alecrim',
      ENDERECO: 'R. Pres. Sarmento, 426',
      BAIRRO: 'Alecrim',
      CEP: '59032-400',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.7967061396047725, -35.223131266050615',
      NVOTOS: 137,
      RANK: 4.3,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
    {
      ID: 12,
      NOMEFANTASIA: 'Posto Petrobras Frei Damião',
      ENDERECO: 'Av. Capitão-Mor Gouveia, 1245',
      BAIRRO: 'Dix-Sept Rosado',
      CEP: '59060-400',
      MUNICIPIO: 'Natal',
      UF: 'RN',
      COORDENADAS: '-5.82101601159894, -35.23333910100303',
      NVOTOS: 253,
      RANK: 4.1,
      PRECOS: [
        {
          Diesel: [
            {
              Atual: 6.88,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
          Etanol: [
            {
              Atual: 6.058,
              VotosNegativos: [],
              votosp: '[id1,id2,id3,id4...]',
              VotosPositivos: [2, 3],
            },
          ],
          Gasolina: [
            {
              Atual: 5,
              votosnegativ: '[[id1, preço],[id2, preço],[id3, preço],...]',
              VotosNegativos: [
                [2, 7.23],
                [3, 7.23],
              ],
              VotosPositivos: [],
            },
          ],
          Aditivada: [
            {
              Atual: 7.357,
              VotosNegativos: [],
              VotosPositivos: [2, 3],
            },
          ],
        },
      ],
      DATAATUALIZACAO: '1655242978676',
    },
  ],

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
        loadingMap: true,
      };
      break;
    case 'GET_CSV_REJECTED':
      state = {
        ...state,
        loadingMap: false,
      };
      message.error(action.payload.message);
      break;
    case 'GET_CSV_FULFILLED':
      state = {
        ...state,
        loadingMap: false,
        tabelaPrecos: action.payload.data,
        tabelaPrecosPesquisa: action.payload.data,
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
              console.log(Object.values(x));
              return data.every((y) =>
                String(Object.values(x)).toLowerCase().includes(y)
              );
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
