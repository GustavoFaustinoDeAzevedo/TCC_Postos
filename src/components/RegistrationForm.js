import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import MaskedInput from "antd-mask-input/build/main/lib/MaskedInput";
import { connect, useSelector } from "react-redux";
import { AddDataSource } from "../actions/generalActions";

function RegistrationForm(props) {
  const [form] = Form.useForm();
  const { dataSource } = useSelector((state) => state.general);

  const onFinish = (values) => {
    values.key = "" + (parseInt(dataSource[dataSource.length - 1].key, 10) + 1);
    props.dispatch(AddDataSource(values));
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      style={{ height: "65vh" }}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "84",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="nome"
        label="Nome"
        rules={[
          {
            required: true,
            message: "Insira seu nome!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "E-mail! inválido",
          },
          {
            required: true,
            message: "Insira um E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="senha"
        label="Senha"
        rules={[
          {
            required: true,
            message: "Insira sua senha!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirmar"
        label="Confirmar Senha"
        dependencies={["senha"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Confirme sua senha!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("senha") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Senhas inseridas não batem"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="telefone"
        label="Telefone"
        rules={[
          {
            required: true,
            message: "Insira seu telefone!",
          },
        ]}
      >
        <MaskedInput
          mask="(11) 11111-1111"
          name="telefone"
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="termos"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("Deve aceitar os termos e condições.")
                  ),
          },
        ]}
      >
        <Checkbox>
          Li e aceito os <a href="">termos e condições</a>
        </Checkbox>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Registrar
      </Button>
    </Form>
  );
}

export default connect()(RegistrationForm);
