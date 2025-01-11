import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Select, DatePicker, InputNumber, Divider, message } from "antd";
import { EditOutlined, InfoCircleOutlined, DeleteOutlined, PlusOutlined, RocketOutlined, EnvironmentOutlined, FieldTimeOutlined, DollarOutlined, TeamOutlined, SwapOutlined } from "@ant-design/icons";
import { IFlight } from "../types/IFlight";
import "./FlightsManagement.css";
import { getFlights, createFlight, updateFlight } from "../services/flight.service";
import dayjs from "dayjs";
import { getAirlines } from "../services/airline.service";
import { getAirports } from "../services/airport.service";
import { IAirline } from "../types/IAirline";
import { IAirport } from "../types/IAirport";

const FlightsManagement: React.FC = () => {
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [airlines, setAirlines] = useState<IAirline[]>([]);
  const [airports, setAirports] = useState<IAirport[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState<IFlight | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination] = useState({ current: 1, pageSize: 10 });
  const [form] = Form.useForm();

  const parseDate = (dateString: string) => {
    const timestamp = parseInt(dateString.match(/\d+/)?.[0] || "0", 10);
    return dayjs(timestamp);
  };

  const formatDepartureDate = (date: any) => {
    return `/Date(${date.valueOf()}-0500)/`;
  };

  const fetchFlights = async () => {
    try {
      const data = await getFlights();
      const parsedData = data.map((flight: any) => ({
        ...flight,
        departureDate: parseDate(flight.departureDate),
        arrivalDate: parseDate(flight.arrivalDate),
      }));
      setFlights(parsedData);
    } catch (error) {
      console.error("Error al cargar los vuelos", error);
      message.error("Error al cargar los vuelos");
    }
  };

  const fetchAirlines = async () => {
    try {
      const data = await getAirlines();
      setAirlines(data);
    } catch (error) {
      console.error("Error al cargar las aerolíneas", error);
      message.error("Error al cargar las aerolíneas");
    }
  };

  const fetchAirports = async () => {
    try {
      const data = await getAirports();
      setAirports(data);
    } catch (error) {
      console.error("Error al cargar los aeropuertos", error);
      message.error("Error al cargar los aeropuertos");
    }
  };

  useEffect(() => {
    fetchFlights();
    fetchAirlines();
    fetchAirports();
  }, []);

  const openModal = (flight: IFlight | null = null) => {
    setCurrentFlight(flight);
    setIsEditing(!!flight);
    setModalOpen(true);
    if (flight) {
      form.setFieldsValue({
        ...flight,
        airlineId: flight.airlineId.airlineId,
        originAirportId: flight.originAirportId.airportId,
        destinationAirportId: flight.destinationAirportId.airportId,
        departureDate: dayjs(flight.departureDate),
        arrivalDate: dayjs(flight.arrivalDate),
      });
    } else {
      form.resetFields();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentFlight(null);
    setIsEditing(false);
    form.resetFields();
  };

  const openInfoModal = (flight: IFlight) => {
    setCurrentFlight(flight);
    setInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalOpen(false);
    setCurrentFlight(null);
  };

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        departureDate: formatDepartureDate(values.departureDate),
        arrivalDate: formatDepartureDate(values.arrivalDate),
      };
      if (isEditing && currentFlight) {
        await updateFlight(currentFlight.flightId, { ...formattedValues });
        message.success("Vuelo actualizado exitosamente");
      } else {
        await createFlight(formattedValues);
        message.success("Vuelo creado exitosamente");
      }
      fetchFlights();
      closeModal();
    } catch (error) {
      console.error("Error al guardar el vuelo", error);
      message.error("Error al guardar el vuelo");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Aerolínea",
      dataIndex: ["airlineId", "airline"],
      key: "airlineId",
      onHeaderCell: () => ({
        style: { backgroundColor: 'black', color: 'white' },
      }),
    },
    
    {
      title: "Origen",
      dataIndex: ["originAirportId", "cityId", "city"],
      key: "originAirportId",
      onHeaderCell: () => ({
        style: { backgroundColor: 'black', color: 'white' },
      }),
    },
    {
      title: "Destino",
      dataIndex: ["destinationAirportId", "cityId", "city"],
      key: "destinationAirportId",
      onHeaderCell: () => ({
        style: { backgroundColor: 'black', color: 'white' },
      }),
    },
    {
      title: "Salida",
      dataIndex: "departureDate",
      key: "departureDate",
      render: (date: any) => dayjs(date).format("YYYY-MM-DD HH:mm"),
      onHeaderCell: () => ({
        style: { backgroundColor: 'black', color: 'white' },
      }),
    },
    {
      title: "Llegada Estimada",
      dataIndex: "arrivalDate",
      key: "arrivalDate",
      render: (date: any) => dayjs(date).format("YYYY-MM-DD HH:mm"),
      onHeaderCell: () => ({
        style: { backgroundColor: 'black', color: 'white' },
      }),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_text: any, flight: IFlight) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => openModal(flight)} />
          <Button type="link" icon={<InfoCircleOutlined />} onClick={() => openInfoModal(flight)} />
          <Button type="link" icon={<DeleteOutlined />} danger />
        </>
      ),
      onHeaderCell: () => ({
        style: { backgroundColor: 'black', color: 'white' },
      }),
    },
  ];

  return (
    <div>
      <h2>Gestión de Vuelos</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
        Agregar Vuelo
      </Button>

      <Table
        dataSource={flights}
        columns={columns}
        rowKey="flightId"
        pagination={{
          ...pagination,
          total: flights.length,
          showSizeChanger: false,
        }}
        style={{ marginTop: 20 }}
      />

      <Modal
        title={isEditing ? "Editar Vuelo" : "Agregar Vuelo"}
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="airlineId"
            label="Aerolínea"
            rules={[{ required: true, message: "Seleccione una aerolínea" }]}>
            <Select
              showSearch
              placeholder="Seleccione una aerolínea"
              options={airlines.map((a) => ({ key: a.airlineId, label: a.airline, value: a.airlineId }))}
              filterOption={(input, option) =>
                ((option?.value as any) || '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            name="type"
            label="Clase"
            rules={[{ required: true, message: "Seleccione una clase" }]}>
            <Select
              placeholder="Seleccione una clase"
              options={[
                { value: "Primera Clase", label: "Primera Clase" },
                { value: "Ejecutiva", label: "Ejecutiva" },
                { value: "Económica", label: "Económica" },
              ]}
            />
          </Form.Item>
          {!isEditing && (
          <Form.Item
            name="originAirportId"
            label="Origen"
            rules={[{ required: true, message: "Seleccione un origen" }]}>
            <Select
              showSearch
              placeholder="Seleccione un aeropuerto de origen"
              options={airports.map((a) => ({ key: a.airportId, label: `${a.cityId.city}, ${a.cityId.country} (${a.airport})`, value: a.airportId }))}
              filterOption={(input, option) =>
                ((option?.value as any) || '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          )}
          {!isEditing && (
          <Form.Item
            name="destinationAirportId"
            label="Destino"
            rules={[{ required: true, message: "Seleccione un destino" }]}>
            <Select
              showSearch
              placeholder="Seleccione un aeropuerto de destino"
              options={airports.map((a) => ({ key: a.airportId, label: `${a.cityId.city}, ${a.cityId.country} (${a.airport})`, value: a.airportId }))}
              filterOption={(input, option) =>
                ((option?.value as any) || '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          )}  
            <Form.Item
              name="departureDate"
              label="Fecha de Salida"
              rules={[{ required: true, message: "Seleccione una fecha de salida" }]}>
              <DatePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item
              name="arrivalDate"
              label="Fecha de Llegada"
              rules={[{ required: true, message: "Seleccione una fecha de llegada" }]}>
              <DatePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" />
            </Form.Item>
          <Form.Item
            name="price"
            label="Precio"
            rules={[{ required: true, message: "Ingrese un precio" }]}>
            <InputNumber min={0} prefix="$" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="availableSeats"
            label="Asientos Disponibles"
            rules={[{ required: true, message: "Ingrese la cantidad de asientos disponibles" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="scales"
            label="Escalas"
            rules={[{ required: true, message: "Ingrese el número de escalas" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEditing ? "Actualizar Vuelo" : "Agregar Vuelo"}
          </Button>
        </Form>
      </Modal>

      <Modal
        title={<div style={{ display: "flex", alignItems: "center", gap: 8 }}><InfoCircleOutlined /> Información del Vuelo</div>}
        open={infoModalOpen}
        onCancel={closeInfoModal}
        footer={<Button type="primary" onClick={closeInfoModal}>Cerrar</Button>}
      >
        {currentFlight && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <RocketOutlined style={{ fontSize: 18, color: "#1890ff" }} />
              <strong>Aerolínea:</strong> {currentFlight.airlineId.airline}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <RocketOutlined style={{ fontSize: 18, color: "#1890ff" }} />
              <strong>Clase:</strong> {currentFlight.type}
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <EnvironmentOutlined style={{ fontSize: 18, color: "#52c41a" }} />
                <strong>Origen:</strong> {currentFlight.originAirportId.cityId.city}, {currentFlight.originAirportId.cityId.country}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 80 }}>
                {currentFlight.originAirportId.airport}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <EnvironmentOutlined style={{ fontSize: 18, color: "#f5222d" }} />
                <strong>Destino:</strong> {currentFlight.destinationAirportId.cityId.city}, {currentFlight.destinationAirportId.cityId.country}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 80 }}>
                {currentFlight.destinationAirportId.airport}
              </div>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FieldTimeOutlined style={{ fontSize: 18, color: "#faad14" }} />
                <strong>Salida:</strong> {dayjs(currentFlight.departureDate).format("YYYY-MM-DD HH:mm")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FieldTimeOutlined style={{ fontSize: 18, color: "#fa541c" }} />
                <strong>Llegada Estimada:</strong> {dayjs(currentFlight.arrivalDate).format("YYYY-MM-DD HH:mm")}
              </div>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <DollarOutlined style={{ fontSize: 18, color: "#389e0d" }} />
                <strong>Precio por Asiento:</strong> ${currentFlight.price}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TeamOutlined style={{ fontSize: 18, color: "#2f54eb" }} />
                <strong>Asientos Disponibles:</strong> {currentFlight.availableSeats}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <SwapOutlined style={{ fontSize: 18, color: "#13c2c2" }} />
                <strong>Escalas:</strong> {currentFlight.scales === 0 ? "Vuelo directo" : currentFlight.scales}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FlightsManagement;
