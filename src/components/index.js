import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const breadcrumbNameMap = {
    "/perfil": "Perfil",
    "/registrar": "Registro",
    "/usuarios": "Tabela de Usuários",
    "/posts": "Posts",
    "/login": "Login",
  };
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
    <div>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default connect()(Home);
