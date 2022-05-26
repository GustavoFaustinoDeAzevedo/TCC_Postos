import {
  HomeOutlined,
  LoginOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Affix, Breadcrumb, Button, PageHeader } from 'antd';
import { connect, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ShowMap } from '../actions/generalActions';
import MyComponent from '../components/GoogleMapsAPI.js';
import Tabela from './Tabela';

const Home = (props) => {
  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.general
  );
  const breadcrumbNameMap = {
    '/perfil': 'Perfil',
    '/registrar': 'Registro',
    '/usuarios': 'Tabela de Usuários',
    '/posts': 'Posts',
    '/login': 'Login',
    '/listagem': 'Lista de Postos',
  };
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
      <Link to="/">
        <HomeOutlined />
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <div>
      <Affix offsetTop={0}>
        <div key={123456789}>
          <PageHeader
            ghost={false}
            title={isAuthenticated ? 'Olá ' + user.nome : 'Desconectado'}
            subTitle={
              !isAuthenticated ? (
                <Link to="/login">
                  <Button icon={<LoginOutlined />} key={184798} />
                </Link>
              ) : (
                <Button icon={<SettingOutlined />} key={184798} />
              )
            }
            extra={[
              <>
                <Button
                  key={34894489}
                  onClick={() => {
                    props.dispatch(ShowMap());
                  }}
                >
                  Mapa
                </Button>
                ,<Button key={215615656}>Pesquisar</Button>,
                <Link to={process.env.PUBLIC_URL + '/listagem'}>
                  <Button key={1156156} type="primary">
                    Lista de Postos
                  </Button>
                </Link>
                ,
              </>,
            ]}
          />

          <MyComponent />
        </div>
        <Breadcrumb style={{ paddingLeft: '20px', backgroundColor: 'white' }}>
          {breadcrumbItems}
        </Breadcrumb>
      </Affix>
    </div>
  );
};

export default connect()(Home);
