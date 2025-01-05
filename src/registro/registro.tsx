import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Typography, Row, Col, message, Modal } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { createClient } from '../services/auth.service';

const { Title } = Typography;

const RegistroCliente: React.FC = () => {
  const [form] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const navigate = useNavigate();

  const onValuesChange = () => {
    setIsFormChanged(true);
  };

  const handleGoBack = () => {
    if (isFormChanged) {
      Modal.confirm({
        title: 'Confirmar',
        content: '¿Estás seguro de que deseas regresar sin guardar los cambios?',
        onOk: () => {
          navigate('/');
        },
      });
    } else {
      navigate('/');
    }
  };

  const onFinish = async (values: any) => {
    const formattedValues = {
      ...values,
      birthDate: `/Date(${values.birthDate.valueOf()})/`
    };

    try {
      await createClient(formattedValues);
      message.success('Cuenta creada con éxito');
      navigate('/');
    } catch (error) {
      message.error('Error al crear la cuenta. Por favor, inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px', position: 'relative' }}>
      <ArrowLeftOutlined
        onClick={handleGoBack}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      />

      <div style={{ marginTop: '50px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          FLY WITH US
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          initialValues={{ birthDate: moment() }}
        >
          <Row gutter={60}>
            <Col span={12}>
              <Form.Item
                label="C. I."
                name="dni"
                rules={[{ required: true, message: 'Por favor, introduce el DNI.' }]}
              >
                <Input maxLength={20} placeholder="Introduce tu DNI" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="firstName"
                rules={[{ required: true, message: 'Por favor, introduce tu nombre.' }]}
              >
                <Input maxLength={50} placeholder="Introduce tu nombre" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={60}>
            <Col span={12}>
              <Form.Item
                label="Apellido"
                name="lastName"
                rules={[{ required: true, message: 'Por favor, introduce tu apellido.' }]}
              >
                <Input maxLength={50} placeholder="Introduce tu apellido" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Fecha de Nacimiento"
                name="birthDate"
                rules={[{ required: true, message: 'Por favor, selecciona tu fecha de nacimiento.' }]}
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Correo Electrónico"
            name="email"
            rules={[
              { required: true, message: 'Por favor, introduce tu correo electrónico.' },
              { type: 'email', message: 'Por favor, introduce un correo electrónico válido.' },
            ]}
          >
            <Input maxLength={50} placeholder="Introduce tu correo electrónico" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: 'Por favor, introduce tu contraseña.' },
              { min: 6, message: 'La contraseña debe tener al menos 6 caracteres.' },
            ]}
          >
            <Input.Password maxLength={50} placeholder="Introduce tu contraseña" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Crear Cuenta
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegistroCliente;
