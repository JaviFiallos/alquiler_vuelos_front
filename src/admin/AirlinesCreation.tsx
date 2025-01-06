import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { IAirline } from "../types/IAirline";
import { getAirlines, createAirline, updateAirline } from "../services/airline.service";

const AirlinesCreation: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAirline, setCurrentAirline] = useState<IAirline | null>(null);
  const [airlines, setAirlines] = useState<IAirline[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const [form] = Form.useForm();

  const loadAirlines = async () => {
    setLoading(true);
    try {
      const response = await getAirlines();
      setAirlines(response);
      setPagination((prev) => ({
        ...prev,
        total: response.length,
      }));
    } catch (error) {
      console.error("Error al cargar aerolíneas:", error);
      message.error("No se pudo cargar la lista de aerolíneas.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAirlines();
  }, [pagination.current, pagination.pageSize]);

  const openModal = (airline?: IAirline) => {
    if (airline) {
      setIsEditing(true);
      setCurrentAirline(airline);
      form.setFieldsValue({ airline: airline.airline, code: airline.code });
    } else {
      setIsEditing(false);
      setCurrentAirline(null);
      form.resetFields();
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    setLoadingButton(true);
    try {
      if (isEditing && currentAirline) {
        await updateAirline(currentAirline.airlineId, values);
        message.success("La aerolínea se actualizó correctamente.");
      } else {
        await createAirline(values);
        message.success("La aerolínea se creó correctamente.");
      }
      closeModal();
      await loadAirlines();
    } catch (error) {
      console.error("Error al guardar la aerolínea:", error);
      message.error("No se pudo guardar la aerolínea.");
    }
    setLoadingButton(false);
  };

  const handlePaginationChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
    });
  };

  const columns = [
    {
      title: "Aerolínea",
      dataIndex: "airline",
      key: "airline",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Acciones",
      key: "actions",
      width: 100,
      render: (_: any, airline: IAirline) => (
        <Button icon={<EditOutlined />} onClick={() => openModal(airline)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div>
        <h2 className="title" style={{ textAlign: "center", marginBottom: "20px" }}>
          Gestión de Aerolíneas
        </h2>
        <Button type="primary" onClick={() => openModal()} loading={loadingButton}>
          Agregar Aerolínea
        </Button>
        <Table
          dataSource={airlines}
          columns={columns}
          rowKey="airlineId"
          style={{ marginTop: "20px" }}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: handlePaginationChange,
            showSizeChanger: false,
          }}
        />
        <Modal
          title={isEditing ? "Editar Aerolínea" : "Agregar Aerolínea"}
          open={modalOpen}
          onCancel={closeModal}
          footer={null}
          width={500} // Ajuste el ancho del modal
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              airline: currentAirline?.airline || "",
              code: currentAirline?.code || "",
            }}
          >
            <Form.Item
              label="Nombre de la Aerolínea"
              name="airline"
              rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Código de la Aerolínea"
              name="code"
              rules={[{ required: true, message: "Por favor ingrese el código" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingButton}>
                {isEditing ? "Actualizar" : "Agregar"} Aerolínea
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        </div>
  );
};

export default AirlinesCreation;
