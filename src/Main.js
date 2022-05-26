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

import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
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
    localStorage.clear();

    if (data) {
      props.dispatch(LogIn(data));
    } else {
      props.dispatch(LogOut());
    }
  }, []);
  useEffect(() => {
    readRemoteFile('/cadastro_revendas_glp-1-corrigido-2.csv', {
      complete: (results) => {
        props.dispatch(PrecoCombustivel(results.data));
      },
    });
  }, []);
  return (
    <BrowserRouter>
      <Home />

      <Spin style={{ overflow: 'hidden' }} spinning={loading}>
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,1)',
            height: '100%',
            width: '100%',
            overflow: 'auto',
          }}
        >
          <Routes>
            <Route path="/registrar" element={<RegistrationForm />} />
            {isAuthenticated ? (
              <Route
                path="/login"
                element={<Navigate replace to="/perfil" />}
              ></Route>
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            {!isAuthenticated ? (
              <Route
                path="/perfil"
                element={<Navigate replace to="/login" />}
              />
            ) : (
              <Route path="/perfil" element={<OnLogOut />} />
            )}
            <Route path="/listagem" element={<Tabela />} />
          </Routes>
          <Divider></Divider>
        </div>
      </Spin>
    </BrowserRouter>
  );
}

export default connect()(Main);
