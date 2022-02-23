import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddUserPost } from "../actions/generalActions";

function AddPost(props) {
  const [form] = Form.useForm();
  const { user, newPost, getPosts } = useSelector((state) => state.general);
  let navigate = useNavigate();
  const onFinish = (values) => {
    values.key = user.key;
    console.log(values);
    props.dispatch(AddUserPost(values));
    console.log("Received values of form: ", values);
    localStorage.setItem("newposts", JSON.stringify(newPost));
    localStorage.setItem("posts", JSON.stringify([newPost, ...getPosts]));
    navigate(`/posts`);
    //window.location.reload();
  };
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
      <Button type="primary" htmlType="submit">
        Enviar
      </Button>
    </Form>
  );
}

export default connect()(AddPost);
