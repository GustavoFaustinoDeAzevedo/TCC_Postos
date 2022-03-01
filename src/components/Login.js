import { Button, Input, Form, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { connect, useSelector } from "react-redux";
import { LogIn, LogOut } from "../actions/generalActions";
import { OnLogOut } from "./LoggedIn";

function Login(props) {
  const { dataSource, isAuthenticated } = useSelector((state) => state.general);

  const onFinish = (values) => {
    console.log(
      "Received values of form: ",
      dataSource.findIndex(
        (x) => x.email === values.email && x.senha === values.password
      )
    );
    let index = dataSource.findIndex(
      (x) => x.email === values.email && x.senha === values.password
    );
    dataSource.findIndex(
      (x) => x.email === values.email && x.senha === values.password
    ) !== -1
      ? props.dispatch(LogIn(dataSource[index]))
      : alert("erro");
    console.log(isAuthenticated);
    localStorage.setItem("usuario", JSON.stringify(dataSource[index]));
  };

  return (
    <div style={{ height: "65vh" }}>
      <Form
        style={{ width: 304 }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Digite o seu email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Digite a sua senha!" }]}
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
    </div>
  );
}

export default connect()(Login);
