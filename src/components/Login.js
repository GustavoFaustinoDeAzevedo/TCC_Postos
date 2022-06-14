import { Button, Input, Form, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { connect, useSelector } from 'react-redux';
import { LogIn, LogOut, ShowMapDrawer } from '../actions/generalActions';
import { OnLogOut } from './LoggedIn';
import { useEffect } from 'react';

function Login(props) {
  const { dataSource, isAuthenticated } = useSelector((state) => state.general);

  const onFinish = (values) => {
    console.log(
      'Received values of form: ',
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
      : alert('erro');
    console.log(values.remember);
    if (values.remember) {
      localStorage.setItem('usuario', JSON.stringify(dataSource[index]));
    } else {
      localStorage.clear();
    }
  };
  useEffect(() => {
    props.dispatch(ShowMapDrawer(false));
  }, []);
  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '10% 15%',
        background: '#ececec',
        height: '86vh',
      }}
    >
      <Form
        style={{
          width: 304,
          padding: window.screen.width < 780 ? '5% 25% 0 0%' : '0',
        }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Digite o seu email!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Digite a sua senha!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lembrar Usuário</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>{' '}
          Ou <Link to="/registrar">Registre!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect()(Login);
