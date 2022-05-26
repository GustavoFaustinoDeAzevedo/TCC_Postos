//logar como:
//gustavo@hotmail.com
//123456
//para editar tabela
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  BackTop,
  Badge,
  Card,
  Collapse,
  List,
  Pagination,
  Rate,
  Space,
  Table,
} from 'antd';
import { usePapaParse } from 'react-papaparse';
import { connect, useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import cep from 'cep-promise';
import MobileTest from './MobileTest';
import SearchInTable from './SearchFunction';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  FrownOutlined,
  MehOutlined,
  SaveOutlined,
  SearchOutlined,
  SettingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import {
  PrecoCombustivel,
  DeleteDataSource,
  EditDataSource,
  GetEndereco,
} from '../actions/generalActions';
import Text from 'antd/lib/typography/Text';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

function Tabela(props) {
  const { readRemoteFile } = usePapaParse();
  const { tabelaPrecos, headPrecos, loading, user, mobile } = useSelector(
    (state) => state.general
  );
  const [edit, setEdit] = useState(null);
  const [tempData, setTempData] = useState();
  const [data, setData] = useState([]);
  const SearchInTable = (setSelectedKeys, selectedKeys, confirm) => {
    return (
      <>
        <Input
          autoFocus
          placeholder="Texto para pesquisa"
          allowClear
          value={selectedKeys}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm({ closeDropdown: false });
          }}
          onPressEnter={() => {
            confirm();
          }}
          onBlur={() => {
            confirm();
          }}
          style={{ width: 200 }}
        />
      </>
    );
  };

  return (
    <>
      <BackTop />
      <div style={{ overflow: 'auto', padding: '10px', background: '#ececec' }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '40', '80'],
            position: 'both',
          }}
          dataSource={tabelaPrecos}
          renderItem={(data) => (
            <List.Item style={{ paddingTop: '30px' }}>
              <Badge count={'0km'} color={'blue'} offset={[-60, 69]}>
                <Card
                  bordered={false}
                  title={data[3]}
                  key={data[4]}
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                  style={{ border: '4px solid black', borderRadius: '10px' }}
                >
                  <Card
                    hoverable={false}
                    style={{ paddingLeft: '25px', width: '100%' }}
                  >
                    {data[5]}
                  </Card>

                  <Card.Grid
                    hoverable={false}
                    style={{
                      fontFamily: 'Lucida Console',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <Avatar shape="square" size="large" />
                    <Rate
                      defaultValue={0}
                      style={{
                        paddingLeft: '20px',
                      }}
                      allowHalf
                    />
                    <Text type="secondary"> (0)</Text>
                  </Card.Grid>
                  <Collapse bordered={false} defaultActiveKey={['1']}>
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
                            src={'/bomba-de-gasolina.png'}
                          />
                          <Text
                            type="secondary"
                            style={{
                              paddingLeft: '15px',
                            }}
                          >
                            {' '}
                            Mostrar Preços
                          </Text>
                        </>
                      }
                      style={{
                        fontFamily: 'Lucida Console',
                        textAlign: 'left',
                        width: '100%',
                      }}
                      key={headPrecos[5]}
                    >
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
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
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
                        </div>
                        <div
                          style={{
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
                          }}
                        >
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
                        </div>
                        <div
                          style={{
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
                          }}
                        >
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
                        </div>
                        <div
                          style={{
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
                          }}
                        >
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
                                fontSize: '0.8em',
                                lineHeight: '44px',
                                float: 'right',
                              }}
                            >
                              Gasolina Aditivada
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
                          }}
                        >
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
                              Gasolina Aditivada Premium
                            </span>
                          </div>
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
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            0,000
                          </div>
                        </div>
                        <div
                          style={{
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            0,000
                          </div>
                        </div>

                        <div
                          style={{
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            0,000
                          </div>
                        </div>
                        <div
                          style={{
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            {' '}
                            0,000
                          </div>
                        </div>
                        <div
                          style={{
                            background: 'green',
                            padding: '10px',
                            border: '2px solid white',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '2em',
                              border: '2px solid white',
                              padding: '10px 5px',
                              color: 'white',
                              backgroundColor: 'green',
                            }}
                          >
                            0,000
                          </div>
                        </div>
                      </Card.Grid>
                    </CollapsePanel>
                  </Collapse>
                </Card>
              </Badge>
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
    </>
  );
}

export default connect()(Tabela);
