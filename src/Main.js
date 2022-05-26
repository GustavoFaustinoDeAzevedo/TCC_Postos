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

import { BrowserRouter } from 'react-router-dom';
import MyComponent from './components/GoogleMapsAPI.js';
import {
  TableOutlined,
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

import { connect, useSelector } from 'react-redux';
import Tabela from './components/Tabela';
import {
  MobileTestAction,
  PrecoCombustivel,
  ShowMap,
} from './actions/generalActions.js';
import { usePapaParse } from 'react-papaparse';

function Main(props) {
  const { readRemoteFile } = usePapaParse();
  const { Header, Content, Footer, Sider } = Layout;
  const { loading } = useSelector((state) => state.general);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', setWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', setWidth(window.innerWidth));
      props.dispatch(MobileTestAction(width <= 768));
    };
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
      <Affix offsetTop={0}>
        <div key={123456789}>
          <PageHeader
            ghost={false}
            avatar={{
              src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
            }}
            title="Desconectado"
            subTitle={<Button icon={<SettingOutlined />} key={184798} />}
            extra={[
              <Button
                key={3}
                onClick={() => {
                  props.dispatch(ShowMap());
                }}
              >
                Mapa
              </Button>,
              <Button key={2}>Pesquisar</Button>,
              <Button key={1} type="primary">
                Primary
              </Button>,
            ]}
          />

          <MyComponent />
        </div>
      </Affix>

      <Spin style={{ overflow: 'hidden' }} spinning={loading}>
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,1)',
            height: '100%',
            width: '100%',
            overflow: 'auto',
          }}
        >
          <Tabela />
          <Divider></Divider>
        </div>
      </Spin>
    </BrowserRouter>
  );
}

export default connect()(Main);
