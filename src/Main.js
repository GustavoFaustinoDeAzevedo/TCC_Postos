import React, { useEffect, useState } from 'react';
import {
  Affix,
  Button,
  Divider,
  Layout,
  Menu,
  PageHeader,
  Space,
  Spin,
} from 'antd';

import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  HashRouter,
  useLocation,
} from 'react-router-dom';
import MyComponent from './components/GoogleMapsAPI.js';
import {
  TableOutlined,
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import OnLogOut from './components/LoggedIn';
import RegistrationForm from './components/RegistrationForm';
import { connect, useSelector } from 'react-redux';
import Tabela from './components/Tabela';
import {
  LogIn,
  LogOut,
  MobileTestAction,
  PrecoCombustivel,
  ShowMap,
} from './actions/generalActions.js';
import { usePapaParse } from 'react-papaparse';
import Login from './components/Login.js';
import Home from './components';
function Main(props) {
  const { readRemoteFile } = usePapaParse();
  const { Header, Content, Footer, Sider } = Layout;
  const { isAuthenticated, loading } = useSelector((state) => state.general);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('usuario'));

    console.log(data);
    //localStorage.clear();

    if (data) {
      props.dispatch(LogIn(data));
    } else {
      props.dispatch(LogOut());
    }
  }, []);
  useEffect(() => {
    readRemoteFile(
      process.env.PUBLIC_URL + '/cadastro_revendas_glp-1-corrigido-2.csv',
      {
        complete: (results) => {},
      }
    );
  }, []);
  return (
    <HashRouter hashtype="noslash">
      {/*basename={process.env.PUBLIC_URL + '/'}>*/}
      <Layout style={{ overflow: 'hidden' }}>
        <Home />

        <Content>
          <Spin style={{ overflow: 'hidden' }} spinning={loading}>
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,1)',
                height: '100%',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <Routes path={process.env.PUBLIC_URL}>
                <Route path="registrar" element={<RegistrationForm />} />
                {isAuthenticated ? (
                  <>
                    {/*<Route
                      path="login"
                      element={<Navigate replace to="perfil" />}
                    ></Route>*/}

                    <Route path="" element={<OnLogOut />} />
                  </>
                ) : (
                  <>
                    <Route path="" element={<Login />} />
                  </>
                )}
                <Route path="mapa" element={<MyComponent />} />
              </Routes>
            </div>
          </Spin>
        </Content>
      </Layout>
    </HashRouter>
  );
}

export default connect()(Main);
