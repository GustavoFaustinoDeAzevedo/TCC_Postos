//@@
//Utilizei ids (keys) nos componentes do objeto porque na tabela do
//ant design eles já tinham planejado com ids, então tive que refazer
//algumas coisas para que as linhas pudessem ser editáveis
import React, { useEffect } from "react";
import { Button, Divider, Layout, Menu, Spin } from "antd";
import { Route, Routes, Link, Navigate, BrowserRouter } from "react-router-dom";
import {
  TableOutlined,
  HomeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Main.css";
import RegistrationForm from "./components/RegistrationForm";
import { connect, useSelector } from "react-redux";
import Tabela from "./components/Tabela";
import Home from "./components";
import Login from "./components/Login";
import Posts from "./components/Posts";
import OnLogOut from "./components/LoggedIn";
import { GetPosts, LogIn, LogOut } from "./actions/generalActions";

function Main(props) {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.general
  );
  const ClickButton = () => {
    props.dispatch(LogOut());
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuario"));
    const posts = JSON.parse(localStorage.getItem("posts"));
    const newpost = JSON.parse(localStorage.getItem("newpost"));
    console.log(data);
    localStorage.clear();

    if (data) {
      props.dispatch(LogIn(data));
    } else {
      props.dispatch(LogOut());
    }
    if (posts) {
      props.dispatch(GetPosts(posts));
    }
    localStorage.setItem("posts", JSON.stringify(posts));
    localStorage.setItem("usuario", JSON.stringify(data));
    localStorage.setItem("newpost", JSON.stringify(newpost));
  }, []);

  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "200vh",
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
            <Menu.Item key="2" icon={<TableOutlined />}>
              <Link to="/usuarios">Lista de Usuários</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/posts" icon={<MessageOutlined />}>
                Posts
              </Link>
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
          }}
        >
          <Header
            style={{
              color: "rgba(255, 255, 255, 1)",
              position: "fixed",
              zIndex: 1,
              width: "100%",
            }}
          >
            {isAuthenticated && (
              <div>
                Olá {user.nome}{" "}
                <Button onClick={() => ClickButton()} type="primary">
                  Deslogar
                </Button>
              </div>
            )}
          </Header>
          <Spin spinning={loading}>
            <Content
              style={{
                padding: 80,
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
                  <Route path="/posts" element={<Posts />} />

                  <Route path="/usuarios" element={<Tabela />} />
                </Routes>
                <Divider></Divider>
              </div>
            </Content>
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
            ></Footer>
          </Spin>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default connect()(Main);
