//logar como:
//gustavo@hotmail.com
//123456
//para acessar o add post

import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { AddUserPost } from "../actions/generalActions";

function AddPost({ form, onFinish }) {
  return (
    <Form
      form={form}
      name="Postar"
      onFinish={onFinish}
      initialValues={{
        prefix: "84",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="title"
        label="Título"
        rules={[
          {
            required: true,
            message: "Insira o título do post!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="body"
        label="texto"
        rules={[
          {
            required: true,
            message: "Insira um Texto",
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
}

export default connect()(AddPost);
