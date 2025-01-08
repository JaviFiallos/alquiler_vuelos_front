import React, { useEffect, useState } from "react";
import { IReservation } from "../types/IReservation";
import { cancelReservation, getReservationsByClient, updateReservation } from "../services/reservation.service";
import { getUserId } from "../utils/utils";
import { Table, Button, Modal, Space, Typography, Divider, Form, InputNumber, message } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
    CalendarOutlined,
    DollarCircleOutlined,
    CompassOutlined,
    ArrowRightOutlined,
} from "@ant-design/icons";
import { IFlight } from "../types/IFlight";

const { Title } = Typography;

const parseDate = (dateString: any) => {
    const timestamp = parseInt(dateString.match(/\d+/)[0], 10);
    return new Date(timestamp).toLocaleString();
};

const ReservationHistory: React.FC = () => {
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<IReservation | null>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [currentReservationId, setCurrentReservationId] = useState<number | null>(null);
    const [form] = Form.useForm();

    const fetchReservations = async () => {
        try {
            const data = await getReservationsByClient(getUserId()!);
            setReservations(data);
        } catch (error) {
            console.error("Error al cargar las reservas", error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleModify = (id: number) => {
        setCurrentReservationId(id);
        setEditModalVisible(true);
    };

    const handleCancel = (id: number) => {
        setCurrentReservationId(id);
        setCancelModalVisible(true);
    };

    const submitModify = async (values: { seats: number }) => {
        if (currentReservationId) {
            try {
                await updateReservation(currentReservationId, { numberOfPassengers: values.seats });
                message.success("Reserva modificada con éxito.");
                fetchReservations();
                setEditModalVisible(false);
            } catch (error) {
                console.error("Error al modificar la reserva", error);
                message.error("No se pudo modificar la reserva.");
            }
        }
    };

    const confirmCancel = async () => {
        if (currentReservationId) {
            try {
                await cancelReservation(currentReservationId);
                message.success("Reserva cancelada con éxito.");
                fetchReservations();
                setCancelModalVisible(false);
            } catch (error) {
                console.error("Error al cancelar la reserva", error);
                message.error("No se pudo cancelar la reserva.");
            }
        }
    };

    const showFlightInfo = (reservation: IReservation) => {
        setSelectedReservation(reservation);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedReservation(null);
    };

    const columns = [
        {
            title: "Vuelo",
            dataIndex: "flightId",
            render: (flight: IFlight) => (
                  <>
                      {flight.originAirportId.cityId.city} <ArrowRightOutlined /> {flight.destinationAirportId.cityId.city}
                  </>
              ),
              onHeaderCell: () => ({
                style: { backgroundColor: 'black', color: 'white' },
              }),
        },
        {
            title: "Fecha del Vuelo",
            dataIndex: ["flightId", "departureDate"],
            render: (date: string) => parseDate(date),
            onHeaderCell: () => ({
                style: { backgroundColor: 'black', color: 'white' },
              }),
        },
        {
            title: "Asientos Reservados",
            dataIndex: "numberOfPassengers",
            onHeaderCell: () => ({
                style: { backgroundColor: 'black', color: 'white' },
              }),
        },
        {
            title: "Estado",
            dataIndex: "status",
            onHeaderCell: () => ({
                style: { backgroundColor: 'black', color: 'white' },
              }),
        },
        {
            title: "Acciones",
            render: (_: any, record: IReservation) => {
                const currentDate = new Date();
                const departureDate = record.flightId?.departureDate
                    ? new Date(parseInt(record.flightId.departureDate.match(/\d+/)?.[0] || "0", 10))
                    : null;
                const isBeforeDeparture = departureDate && currentDate < departureDate;

                return (
                    <Space size="middle">
                        {record.status === "Reservado" && isBeforeDeparture && (
                            <>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => handleModify(record.reservationId)}
                                />
                                <Button
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={() => handleCancel(record.reservationId)}
                                />
                            </>
                        )}
                        <Button
                            icon={<InfoCircleOutlined />}
                            onClick={() => showFlightInfo(record)}
                        />
                    </Space>
                );
            },
            onHeaderCell: () => ({
                style: { backgroundColor: 'black', color: 'white' },
              }),
        },
    ];

    return (
        <div className="reservation-history">
            <Title level={2}>Historial de Reservas</Title>
            <Table
                columns={columns}
                dataSource={reservations}
                rowKey="reservationId"
                pagination={false}
            />

            <Modal
                title="Modificar Reserva"
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={submitModify} layout="vertical">
                    <Form.Item
                        label="Cantidad de asientos"
                        name="seats"
                        rules={[{ required: true, message: "Por favor, ingrese la cantidad de asientos." }]}
                    >
                        <InputNumber min={1} style={{ width: "100%" }} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Confirmar Cancelación"
                visible={cancelModalVisible}
                onCancel={() => setCancelModalVisible(false)}
                onOk={confirmCancel}
                okText="Confirmar"
                okButtonProps={{ danger: true }}
            >
                <p>¿Está seguro de que desea cancelar esta reserva?</p>
            </Modal>

            <Modal
                title="Información del Vuelo"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                {selectedReservation && (
                    <div>
                        <Divider>
                            <CompassOutlined /> Detalles del Vuelo
                        </Divider>
                        <p>
                            <strong>Aerolínea:</strong> {selectedReservation.flightId.airlineId.airline}
                        </p>
                        <p>
                            <strong>Clase:</strong> {selectedReservation.flightId.type}
                        </p>
                        <p>
                            <CalendarOutlined style={{ marginRight: 8 }} />
                            <strong>Fecha de salida:</strong> {parseDate(selectedReservation.flightId.departureDate)}
                        </p>
                        <p>
                            <CalendarOutlined style={{ marginRight: 8 }} />
                            <strong>Fecha de llegada:</strong> {parseDate(selectedReservation.flightId.arrivalDate)}
                        </p>
                        <Divider>
                            <CompassOutlined /> Ruta
                        </Divider>
                        <p>
                            <strong>Origen:</strong> {selectedReservation.flightId.originAirportId.airport} (
                            {selectedReservation.flightId.originAirportId.cityId.city})
                        </p>
                        <p>
                            <strong>Destino:</strong> {selectedReservation.flightId.destinationAirportId.airport} (
                            {selectedReservation.flightId.destinationAirportId.cityId.city})
                        </p>
                        <p>
                            <strong>Escalas:</strong> {selectedReservation.flightId.scales}
                        </p>
                        <Divider>
                            <DollarCircleOutlined /> Información Económica
                        </Divider>
                        <p>
                            <strong>Precio de Asiento:</strong> ${selectedReservation.flightId.price}
                        </p>
                        <p>
                            <strong>Asientos Reservados:</strong> {selectedReservation.numberOfPassengers}
                        </p>
                        <p>    
                            <strong>Total:</strong> ${selectedReservation.flightId.price * (selectedReservation?.numberOfPassengers || 0)}
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ReservationHistory;
