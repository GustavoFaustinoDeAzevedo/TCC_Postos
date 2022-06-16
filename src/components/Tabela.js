import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  BackTop,
  Drawer,
  Badge,
  Card,
  Collapse,
  List,
  Pagination,
  Rate,
  Space,
  Table,
  Modal,
  Popover,
  Alert,
  Tooltip,
} from 'antd';
import { usePapaParse } from 'react-papaparse';
import { connect, useSelector } from 'react-redux';
import { Button, Input } from 'antd';

import cep from 'cep-promise';
import MobileTest from './MobileTest';
import { EditOutlined, LikeOutlined } from '@ant-design/icons';
import {
  GetCoord,
  ShowMapDrawer,
  SetLocation,
  ShowMap,
  ActiveLoadting,
} from '../actions/generalActions';
import Text from 'antd/lib/typography/Text';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { useMap } from 'react-leaflet';

function Tabela(props) {
  const { readRemoteFile } = usePapaParse();
  const {
    isAuthenticated,
    tabelaPrecos,
    tabelaPrecosPesquisa,
    headPrecos,
    loading,
    user,
    mobile,
    coord,
  } = useSelector((state) => state.general);
  const [edit, setEdit] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    props.dispatch(ActiveLoadting());
  }, []);
  return (
    <>
      <BackTop />
      <div style={{ overflow: 'hidden', background: '#ececec' }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 2,
            xxl: 2,
          }}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '40', '80'],
            position: 'both',
          }}
          dataSource={tabelaPrecosPesquisa}
          renderItem={(data) => (
            <List.Item style={{ paddingTop: '35px' }}>
              <Card
                hoverable={true}
                bordered={false}
                title={data.NOMEFANTASIA}
                key={data.NOMEFANTASIA}
                //actions={[
                // {
                /*
                  <div>
                    <EditOutlined
                      style={{ fontSize: '20px', width: '100%' }}
                      onClick={() => {
                        if (isAuthenticated) {
                          setTempData(data);
                          setVisible(true);
                        } else {
                          alert('Precisa autenticar para editar o posto!');
                        }
                      }}
                      key={'edit' + data[6]}
                    />
                  </div>,
                    */
                //  },
                // ]}
                style={{
                  background: '#bdbdbd',
                  border: '4px solid black',
                  borderRadius: '10px',
                }}
              >
                <div style={{ paddingBottom: '10px' }}>
                  <Button
                    onClick={() => {
                      props.dispatch(GetCoord(data.COORDENADAS));
                      props.dispatch(ShowMapDrawer(false));
                    }}
                  >
                    Localizar no mapa
                  </Button>
                </div>
                <Card
                  hoverable={false}
                  style={{
                    borderRadius: '10px 10px 0px 0',
                    fontFamily: 'Lucida Console',
                    width: '100%',
                  }}
                >
                  <Text type="secondary">
                    {data.ENDERECO} - {data.BAIRRO}, {data.MUNICIPIO} -{' '}
                    {data.UF}
                  </Text>
                  <br />
                </Card>

                <Card
                  hoverable={false}
                  style={{
                    borderRadius: '0px 0px 10px 10px',
                    fontFamily: 'Lucida Console',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  &nbsp;
                  <Avatar
                    src={process.env.PUBLIC_URL + '/rating-2797.png'}
                    shape="square"
                    size={window.screen.width > 780 ? 'large' : 'small'}
                  />
                  &nbsp;
                  <Text type="secondary">{data.RANK}</Text>
                  <Rate
                    disabled={!isAuthenticated}
                    defaultValue={data.RANK}
                    style={{
                      paddingLeft: window.screen.width < 780 ? '10px' : '20px',
                    }}
                  />
                  <Text type="secondary">&nbsp;({data.NVOTOS})</Text>
                </Card>
                {/*
                <Collapse bordered={false} ghost defaultActiveKey={['1']}>
                  <CollapsePanel
                    header={
                      <>
                        <img
                          alt={'ALT'}
                          style={{
                            //paddingLeft: '25px',
                            width: '10%',
                            height: '10%',
                          }}
                          src={
                            process.env.PUBLIC_URL + '/bomba-de-gasolina.png'
                          }
                        />
                        <Text
                          type="secondary"
                          style={{
                            paddingLeft: '15px',
                          }}
                        >
                          Mostrar Preços
                        </Text>
                      </>
                    }
                    style={{
                      background: '#bdbdbd',
                      fontFamily: 'Lucida Console',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    key={headPrecos[5]}
                  >
                    {window.screen.width > 780 && (
                      <div>
                        <Card.Grid
                          hoverable={false}
                          style={{
                            borderRadius: '10px 0px 0px 10px',
                            background: 'green',
                            fontFamily: 'Lucida Console',
                            width: '60%',
                          }}
                        >
                          <div
                            style={{
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'orange',
                            }}
                          >
                            <span style={{ fontSize: '2em' }}>D</span>
                            <span
                              style={{ lineHeight: '44px', float: 'right' }}
                            >
                              Diesel
                            </span>
                          </div>

                          <div
                            style={{
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: '#00A000',
                            }}
                          >
                            <span style={{ fontSize: '2em' }}>E</span>
                            <span
                              style={{ lineHeight: '44px', float: 'right' }}
                            >
                              Etanol
                            </span>
                          </div>

                          <div
                            style={{
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: '#00008b',
                            }}
                          >
                            <span style={{ fontSize: '2em' }}>G</span>
                            <span
                              style={{ lineHeight: '44px', float: 'right' }}
                            >
                              Gasolina
                            </span>
                          </div>

                          <div
                            style={{
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: '#00008b',
                            }}
                          >
                            <span style={{ fontSize: '2em' }}>G</span>
                            <span
                              style={{
                                fontSize: '0.6em',
                                lineHeight: '44px',
                                float: 'right',
                              }}
                            >
                              Gasolina Aditivada
                            </span>
                          </div>

                          <div
                            style={{
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: '#00008b',
                            }}
                          >
                            <span style={{ fontSize: '2em' }}>G</span>
                            <span
                              style={{
                                fontSize: '0.5em',
                                lineHeight: '44px',
                                float: 'right',
                              }}
                            >
                              Gasolina Aditivada Premium
                            </span>
                          </div>
                        </Card.Grid>

                        <Card.Grid
                          hoverable={false}
                          style={{
                            borderRadius: '0px 10px 10px 0px',
                            background: 'green',
                            fontFamily: 'Lucida Console',
                            width: '40%',
                          }}
                        >
                          <div
                            style={{
                              overflow: ' hidden',
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            {6 + Math.random().toFixed(2) / 10}
                            &nbsp;&nbsp;
                            <Rate
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<LikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                          </div>

                          <div
                            style={{
                              overflow: ' hidden',
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            {6 + Math.random().toFixed(2) / 10}
                            &nbsp;&nbsp;
                            <Rate
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<LikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                          </div>

                          <div
                            style={{
                              overflow: ' hidden',
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            {7 + Math.random().toFixed(2) / 10}
                            &nbsp;&nbsp;
                            <Rate
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<LikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                          </div>

                          <div
                            style={{
                              overflow: ' hidden',
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            {7 + Math.random().toFixed(2) / 10}
                            &nbsp;&nbsp;
                            <Rate
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<LikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                          </div>

                          <div
                            style={{
                              overflow: ' hidden',
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            {7 + Math.random().toFixed(2) / 10}
                            &nbsp;&nbsp;
                            <Rate
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<LikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                          </div>
                        </Card.Grid>
                      </div>
                    )}
                    {window.screen.width < 780 && (
                      <Card
                        style={{
                          margin: '-13px',

                          backgroundColor: 'green',
                          color: 'white',
                          borderRadius: '10px',
                          lineHeight: '100%',
                          fontSize: '0.75em',
                        }}
                      >
                        <div>
                          <div>
                            <span>
                              Diesel:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {(6 + Math.random()).toFixed(3)}
                              &nbsp;&nbsp;
                              <Rate
                                onChange={() => {
                                  if (isAuthenticated) {
                                  } else {
                                    alert(
                                      'Precisa autenticar para fazer esta ação!'
                                    );
                                  }
                                }}
                                character={<LikeOutlined />}
                                defaultValue={0}
                                count={1}
                              />
                            </span>
                          </div>
                          <br />
                          <div>
                            Etanol: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {(6 + Math.random()).toFixed(3)}
                            &nbsp;&nbsp;
                            <Rate
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<LikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                          </div>
                          <br />
                          <div>
                            Gasolina: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {(7 + Math.random()).toFixed(3)}
                            &nbsp;&nbsp;
                            <Rate
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<LikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                          </div>
                          <br />
                          <div>
                            G. Aditiv: &nbsp;&nbsp;&nbsp;&nbsp;
                            {(7 + Math.random()).toFixed(3)}
                            &nbsp;&nbsp;
                            <Rate
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<LikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                          </div>
                          <br />
                          <span>
                            <div>
                              G. A. Premium:&nbsp;
                              {(7 + Math.random()).toFixed(3)}
                              &nbsp;&nbsp;
                              <Rate
                                onChange={() => {
                                  if (isAuthenticated) {
                                  } else {
                                    alert(
                                      'Precisa autenticar para fazer esta ação!'
                                    );
                                  }
                                }}
                                character={<LikeOutlined />}
                                defaultValue={0}
                                count={1}
                              />
                            </div>
                          </span>
                        </div>
                      </Card>
                    )}
                  </CollapsePanel>
                </Collapse>
                              */}
              </Card>
            </List.Item>
          )}
        />

        {/*
        <Table
          bordered
          title={() => "teste"}
          dataSource={tabelaPrecos}
          columns={columns}
          loading={loading}
          overflow="auto"
          scroll={{ y: 500, x: 1200 }}
        />
          
          <Table.Column
            filterIcon={<SearchOutlined />}
            filterDropdown={(setSelectedKeys, selectedKeys, confirm) =>
              SearchInTable(setSelectedKeys, selectedKeys, confirm)
            }
            onFilter={(value, record) => {
              let encontrado = Object.values(record).filter((x) =>
                String(x).includes(value)
              );
              return String(encontrado);
            }}
            title={headPrecos[4]}
            dataIndex={headPrecos[4]}
            key={headPrecos[4]}
            render={(text, row) => row[4]}
          />
        
          <Table.Column
            title={headPrecos[5]}
            dataIndex={headPrecos[5]}
            key={headPrecos[5]}
            render={(text, row) => row[5]}
          />
          <Table.Column
            title={headPrecos[6]}
            dataIndex={headPrecos[6]}
            key={headPrecos[6]}
            render={(text, row) => row[6]}
          />
          <Table.Column
            title={headPrecos[7]}
            dataIndex={headPrecos[7]}
            key={headPrecos[7]}
            render={(text, row) => row[7]}
          />
          <Table.Column
            title={headPrecos[8]}
            dataIndex={headPrecos[8]}
            key={headPrecos[8]}
            render={(text, row) => row[8]}
          />
          <Table.Column
            title={headPrecos[9]}
            dataIndex={headPrecos[9]}
            key={headPrecos[9]}
            render={(text, row) => row[9]}
          />
          <Table.Column
            title={headPrecos[10]}
            dataIndex={headPrecos[10]}
            key={headPrecos[10]}
            render={(text, row) => row[10]}
          />
          <Table.Column
            title={headPrecos[11]}
            dataIndex={headPrecos[11]}
            key={headPrecos[11]}
            render={(text, row) => row[11]}
          />
          
        </Table>*/}
      </div>
      <Modal
        title={'Configurações do ' + tempData[0]}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={() => setVisible(false)}>
            Enviar
          </Button>,
        ]}
        visible={visible}
      >
        <div style={{ fontWeight: 'bold' }}>
          Endereço:
          <Input defaultValue={tempData[1]} />
          Preços:
          <div style={{ paddingLeft: '30px' }}>
            Diesel:
            <Input defaultValue={''} />
            Etanol:
            <Input defaultValue={''} />
            Gasolina Comum:
            <Input defaultValue={''} />
            Gasolina Aditivada:
            <Input defaultValue={''} />
            Gasolina Aditivada Premium:
            <Input defaultValue={''} />
          </div>
        </div>
        <div style={{ paddingTop: '25px' }}>
          <Text type="secondary">
            OBS: O que você enviar será analisado manualmente para que possa ser
            atualizado, você só pode enviar uma vez por dia por posto.
          </Text>
        </div>
      </Modal>
      ,
    </>
  );
}

export default connect()(Tabela);
