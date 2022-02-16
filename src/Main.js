//@@
//Utilizei ids (keys) nos componentes do objeto porque na tabela do
//ant design eles já tinham planejado com ids, então tive que refazer
//algumas coisas para que as linhas pudessem ser editáveis

import React, { useState } from "react";
import MaskedInput from "antd-mask-input";
import {
  Divider,
  Layout,
  Menu,
  Modal,
  Steps,
  Button,
  message,
  Table,
  Timeline,
  Progress,
  Select,
  Space,
  Input,
  Breadcrumb,
  Form,
  Checkbox,
  notification,
  InputNumber,
  Popconfirm,
  Typography,
} from "antd";
import { HashRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import {
  PlayCircleOutlined,
  UserOutlined,
  SmileOutlined,
  WarningOutlined,
  BoxPlotOutlined,
  ClockCircleOutlined,
  TableOutlined,
  SearchOutlined,
  HomeOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined,
  CloseCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.css";
import Demo from "./components/Demo";
import RegistrationForm from "./components/RegistrationForm";
import { useSelector } from "react-redux";
import Tabela from "./components/Tabela";

function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { Header, Content, Footer, Sider } = Layout;
  const { Search } = Input;
  const { SubMenu } = Menu;
  const { Step } = Steps;
  const { Option } = Select;
  const { dataSource } = useSelector(state => state.general);


  const [dataSource2, setDataSource] = useState([
    {
      key: "1",
      nome: "Gustavo",
      telefone: "(84) 55555-5555",
      email: "gustavo@hotmail.com",
      senha: "123456",
    },
    {
      key: "2",
      nome: "Jairo",
      telefone: "(84) 55555-5555",
      email: "jairo@hotmail.com",
      senha: "123456",
    },
    {
      key: "3",
      nome: "Dmytres",
      telefone: "(84) 55555-5555",
      email: "dmytres@hotmail.com",
      senha: "123456",
    },
  ]);
  
  ////////////////////2#MODAL//////////////////////
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  ///////////////////3#NOTIFICAÇÃO/////////////////
  const openNotification = () => {
    notification.open({
      message: "TESTE",
      description: "Teste caixa de notificação.",
      icon: <SmileOutlined />,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  ///////////////////4#TIMELINE/////////////////
  function TimelimeLabelDemo() {
    return (
      <>
        <Timeline mode="left">
          <Timeline.Item label="11-02-2022">Inicio do projeto</Timeline.Item>
          <Timeline.Item label="12-02-2022">
            Testes iniciais com o Ant Design
          </Timeline.Item>
          <Timeline.Item>
            Adição de um Layout e testes com tabelas
          </Timeline.Item>
          <Timeline.Item label="13-02-2022">
            Adição de várias funções ao site
          </Timeline.Item>
          <Timeline.Item>Aprendi mais sobre o Ant Design</Timeline.Item>
          <Timeline.Item label="14-02-2022">
            Adição de funções na tabela, registro e login
          </Timeline.Item>
          <Timeline.Item label="15-02-2022">
            Remover e editar linhas da tabela
          </Timeline.Item>
        </Timeline>
      </>
    );
  }
  ///////////////////5#REGISTRAR/////////////////

  /////////////////////6#LOGIN///////////////////
  const NormalLoginForm = () => {
    const onFinish = (values) => {
      console.log(
        "Received values of form: ",
        dataSource.findIndex(
          (x) => x.email === values.email && x.senha === values.password
        )
      );
      dataSource.findIndex(
        (x) => x.email === values.email && x.senha === values.password
      ) !== -1
        ? alert("sucesso")
        : alert("erro");
    };

    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Ou <Link to="/registrar">Registre!</Link>
        </Form.Item>
      </Form>
    );
  };
  /////////////////////7#PÁGINAS///////////////////
  const breadcrumbNameMap = {
    "/progresso": "Progresso",
    "/usuario": "Usuario",
    "/timeline": "Timeline",
    "/registrar": "Registro",
    "/tabelas": "Lista de Tabelas",
    "/tabelas/1": "Tabela 1",
    "/tabelas/2": "Tabela 2",
    "/tabelas/1/detalhes": "Detalhes",
    "/tabelas/2/detalhes": "Detalhes",
    "/tutorial": "Tutorial",
    "/login": "Login",
  };
  const TabelaN1 = () => (
    <div>
      <Divider>Tabela 1</Divider>
      <div style={{ textAlign: "center" }}>
        <Button type="primary" onClick={showModal}>
          Tabela 1 <TableOutlined />
        </Button>
        <Modal
          title="Tabela"
          centered
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={550}
        >
          <EditableTable />
        </Modal>
      </div>
    </div>
  );
  const TabelaN2 = () => (
    <div>
      <Divider>Tabela 2</Divider>
      <div style={{ textAlign: "center" }}>
        <EditableTable dataReceived={dataSource} />
      </div>
    </div>
  );
  const EscolherTabelas = () => (
    <div>
      <Divider>Tabelas</Divider>
      <ul className="lista-tabelas">
        <li>
          <Link to="/tabelas/1">Tabela 1</Link>
        </li>
        <li>
          <Link to="/tabelas/2">Tabela 2</Link>
        </li>
      </ul>
    </div>
  );
  const Home = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
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
      <div className="demo">
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>
    );
  };

  ///////////8#CONFIGURAÇÃO DA TABELA//////////////
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "number" ? (
        <MaskedInput mask="(11) 11111-1111" />
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(dataSource);
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
      form.setFieldsValue({
        nome: "",
        telefone: "",
        email: "",
        ...record,
      });

      setEditingKey(record.key);
      console.log(record.key);
    };

    const cancel = () => {
      setEditingKey("");
    };

    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);
          setEditingKey("");
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey("");
        }
      } catch (errInfo) {
        console.log("Validate Failed:", errInfo);
      }
    };
    const columns = [
      {
        //filtro//
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
          return (
            <>
              <Input
                autoFocus
                placeholder="Texto para pesquisa"
                allowClear
                value={selectedKeys[0]}
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
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
        onFilter: (value, record) => {
          let encontrado = Object.values(record).filter((x) =>
            String(x).includes(value)
          );
          return String(encontrado);
        },
        children: [
          {
            title: "Name",
            dataIndex: "nome",
            key: "nome",
            width: "25%",
            editable: true,
          },
          {
            title: "Telefone",
            dataIndex: "telefone",
            key: "telefone",
            width: "25%",
            editable: true,
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "25%",
            editable: true,
          },
          {
            title: "",
            dataIndex: "operation",
            width: "10%",
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Button
                    icon={<SaveOutlined />}
                    onClick={() => save(record.key)}
                    style={{
                      marginRight: 8,
                    }}
                  />
                  <Popconfirm title="Certeza?" onConfirm={cancel}>
                    <Button icon={<CloseCircleOutlined />} />
                  </Popconfirm>
                </span>
              ) : (
                <Button
                  icon={<EditOutlined />}
                  disabled={editingKey !== ""}
                  onClick={() => edit(record)}
                />
              );
            },
          },
          {
            title: "",
            key: "action",
            render: (text, record) => {
              return (
                <Space size="middle">
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      onDeleteNome(record);
                    }}
                  />
                </Space>
              );
            },
          },
        ],
      },
    ];
    const mergedColumns = columns[0].children.map((col) => {
      //console.log(filhos);
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === "telefone" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          scroll={{ y: 350 }}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    );
  };
  const onDeleteNome = (record) => {
    setDataSource((x) => {
      return x.filter((e) => e.email !== record.email);
    });
  };

  ////////////////////9#STEP/////////////////////
  const steps = [
    {
      title: "Primeiro",
      content: "Beber água",
    },
    {
      title: "Segundo",
      content: "Estudar",
    },
    {
      title: "Terceiro",
      content: "Descansar",
    },
  ];
  const PassoaPasso = () => {
    const [current, setCurrent] = React.useState(0);

    const next = () => {
      setCurrent(current + 1);
    };

    const prev = () => {
      setCurrent(current - 1);
    };

    return (
      <>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </>
    );
  };
  //////////////////0#MAIN//////////////////////
  return (
    <HashRouter>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/login">Home</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<TableOutlined />}
              title="Lista de Usuários"
            >
              <Menu.Item key="2">
                <Link to="/tabelas/1">Tabela 1</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/tabelas/2">Tabela 2</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<PlayCircleOutlined />}>
              <Link to="/tutorial">Tutorial</Link>
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={<WarningOutlined />}
              onClick={openNotification}
            >
              Notificação
            </Menu.Item>
            <Menu.Item key="6" icon={<BoxPlotOutlined />}>
              <Link to="/progresso">Progresso</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<ClockCircleOutlined />}>
              <Link to="/timeline">Timeline</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
            height: "100%",
            left: 0,
            width: "100%",
            background: "#fff",
          }}
        >
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              height: "100%",
            }}
          >
            <div
              className="site-layout-background"
              style={{ height: "100%", width: "100%" }}
            >
              <Home />
              <Routes>
                <Route path="/progresso" element={<Demo />} />
                <Route path="/registrar" element={<RegistrationForm />} />
                <Route path="/timeline" element={<TimelimeLabelDemo />} />
                <Route path="/login" element={<NormalLoginForm />} />
                <Route path="/tabelas/1" element={<TabelaN1 />} />
                <Route path="/tabelas/2" element={<Tabela />} />
                <Route path="/tabelas" element={<EscolherTabelas />} />
                <Route path="/tutorial" element={<PassoaPasso />} />
              </Routes>
              <Divider></Divider>
            </div>
          </Content>
        </Layout>
      </Layout>
      <Footer
        style={{
          borderTop: "1px solid #e8e8e8",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
          textAlign: "center",
          display: "flex",
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </HashRouter>
  );
}

export default Main;
