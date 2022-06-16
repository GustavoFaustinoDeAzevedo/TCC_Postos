import {
  AudioOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Affix,
  Breadcrumb,
  Button,
  Drawer,
  PageHeader,
  Space,
  Tooltip,
  Input,
} from 'antd';
import { Autocomplete } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  LogOut,
  PrecoCombustivel,
  ProcurarPosto,
  ShowMap,
  ShowMapDrawer,
} from '../actions/generalActions';
import MyComponent from '../components/GoogleMapsAPI.js';
import Location from '../components/UserLocation';
import Tabela from './Tabela';
import { usePapaParse } from 'react-papaparse';
import { useMap } from 'react-leaflet';
const Home = (props) => {
  const { tabelaPrecos } = useSelector((state) => state.general);
  const [visible, setVisible] = useState(false);
  const { isAuthenticated, user, mapHeight, loading } = useSelector(
    (state) => state.general
  );
  const { Search } = Input;

  const breadcrumbNameMap = {
    '/perfil': 'Perfil',
    '/registrar': 'Registro',
    '/usuarios': 'Tabela de Usuários',
    '/posts': 'Posts',
    '/login': 'Login',
    '/mapa': 'Mapa',
  };
  Location();
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="">
        <HomeOutlined />
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div key={123456789} style={{ overflow: 'hidden' }}>
      <PageHeader
        ghost={false}
        title={
          <div style={{ paddingTop: '10px' }}>
            {isAuthenticated
              ? window.screen.width < 780
                ? 'Olá ' + user.nome.substring(0, 14)
                : 'Olá ' + user.nome.substring(0, 50)
              : 'Desconectado'}
          </div>
        }
        subTitle={
          <div style={{ paddingTop: '10px' }}>
            {!isAuthenticated ? (
              <Tooltip title="Conectar">
                <Link to="">
                  <Button icon={<LoginOutlined />} key={184798} />
                </Link>
              </Tooltip>
            ) : (
              <>
                <Space>
                  <Tooltip title="Configurações">
                    <Button
                      icon={<SettingOutlined />}
                      onClick={() => setVisible(true)}
                      key={1847918}
                    />
                  </Tooltip>
                  <Tooltip title="Desconectar">
                    <Button
                      icon={<LogoutOutlined />}
                      onClick={() => {
                        props.dispatch(LogOut());
                        localStorage.clear();
                      }}
                      key={1847928}
                    />
                  </Tooltip>
                </Space>
                <Drawer
                  title="Configuração de Perfil"
                  placement="right"
                  onClose={() => setVisible(false)}
                  visible={visible}
                ></Drawer>
              </>
            )}
            {useLocation().pathname !== '/mapa' && (
              <Link style={{ paddingLeft: '20px' }} to="mapa">
                {!isAuthenticated && (
                  <Button key={'postos'} type="primary">
                    Mapa
                  </Button>
                )}
              </Link>
            )}
          </div>
        }
        extra={[
          <div>
            {useLocation().pathname === '/mapa' && (
              <>
                <div>
                  <Input.Group compact>
                    <Search
                      allowClear
                      enterButton="Pesquisar Postos"
                      placeholder="Insira texto para pesquisa"
                      onSearch={(e) => {
                        props.dispatch(ProcurarPosto(e.toLowerCase()));
                        props.dispatch(ShowMapDrawer(true));
                      }}
                    />
                  </Input.Group>
                </div>
                {/*<div style={{ paddingTop: '10px' }}>
                  <Button
                    type="primary"
                    style={{ padding: '0px 200px' }}
                    key={'mapa'}
                    onClick={() => {
                      props.dispatch(ShowMap());
                    }}
                  >
                    Mapa
                  </Button>
                </div>*/}
              </>
            )}
          </div>,
        ]}
      />
      <Breadcrumb style={{ paddingLeft: '20px', backgroundColor: 'white' }}>
        {breadcrumbItems}
      </Breadcrumb>
      {/*useLocation().pathname === '/listagem' && <MyComponent />*/}
    </div>
  );
};

export default connect()(Home);
