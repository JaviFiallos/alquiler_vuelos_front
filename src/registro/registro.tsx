import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Typography, Row, Col, message, Modal } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const { Title } = Typography;

const RegistroCliente: React.FC = () => {
  const [form] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const navigate = useNavigate(); 

  const onValuesChange = (changedValues: any, allValues: any) => {
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

  const onFinish = (values: any) => {
    const formattedValues = {
      ...values,
      birthDate: values.birthDate.format('YYYY-MM-DD'),
    };
    console.log('Submitted values:', formattedValues);
    message.success('Cuenta creada con éxito');
    navigate('/');  
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px', position: 'relative' }}>
      {/* Icono de regresar fijo en la parte superior izquierda */}
      <ArrowLeftOutlined 
        onClick={handleGoBack} 
        style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '20px', 
          fontSize: '24px', 
          cursor: 'pointer',
          zIndex: 1000 
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
          onValuesChange={onValuesChange}  // Aquí es donde definimos el onValuesChange
          initialValues={{ birthDate: moment() }}
        >
          <Row gutter={60}>
            <Col span={12}>
              <Form.Item
                label="DNI"
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
