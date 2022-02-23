import React, { useState } from "react";
import { Table } from "antd";
import { connect, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { DeleteDataSource, EditDataSource } from "../actions/generalActions";

function Tabela(props) {
  const { dataSource, loading, user } = useSelector((state) => state.general);
  const [edit, setEdit] = useState(null);
  const [tempData, setTempData] = useState();
  return (
    <Table dataSource={dataSource} loading={loading} style={{ height: "65vh" }}>
      <Table.Column
        title="Nome"
        dataIndex="nome"
        render={(nome, row) =>
          edit === row.key ? (
            <Input
              value={tempData.nome}
              onChange={(e) =>
                setTempData({ ...tempData, nome: e.target.value })
              }
            />
          ) : (
            nome
          )
        }
      />
      <Table.Column title="Telefone" dataIndex="telefone" />
      <Table.Column title="Email" dataIndex="email" />
      {user.dba && (
        <Table.Column
          dataIndex="key"
          render={(key, row) =>
            edit !== key ? (
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setEdit(key);
                  setTempData(row);
                }}
              />
            ) : (
              <>
                <Button
                  icon={<SaveOutlined />}
                  onClick={() => {
                    setEdit(null);
                    props.dispatch(EditDataSource(tempData));
                    setTempData(null);
                  }}
                />

                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    setEdit(null);
                    props.dispatch(DeleteDataSource(key));
                    setTempData(null);
                  }}
                />
              </>
            )
          }
        />
      )}
    </Table>
  );
}

export default connect()(Tabela);
