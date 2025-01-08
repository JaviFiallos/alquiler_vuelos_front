import React, { useEffect, useState } from "react";
import { getReservations } from "../services/reservation.service";
import { Table, Button, Modal, Space, Typography, Divider } from "antd";
import {
    InfoCircleOutlined,
    CalendarOutlined,
    DollarCircleOutlined,
    CompassOutlined,
    ArrowRightOutlined,
} from "@ant-design/icons";
import { IFlight } from "../types/IFlight";
import { IReservationResponse } from "../types/IReservationResponse";
import { IClient } from "../types/IClient";

const { Title } = Typography;

const parseDate = (dateString: any) => {
    const timestamp = parseInt(dateString.match(/\d+/)[0], 10);
    return new Date(timestamp).toLocaleString();
};

const ReservationView: React.FC = () => {
    const [reservations, setReservations] = useState<IReservationResponse[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<IReservationResponse | null>(null);

    const fetchReservations = async () => {
        try {
            const data = await getReservations();
            setReservations(data);
        } catch (error) {
            console.error("Error al cargar las reservas", error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const showFlightInfo = (record: IReservationResponse) => {
        setSelectedReservation(record);
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
          title: "Cliente",
          dataIndex: "clientId",
          render: (client: IClient) =>
              `${client.lastName} ${client.firstName}`,
          onHeaderCell: () => ({
            style: { backgroundColor: 'black', color: 'white' },
          }),
      },
        {
            title: "Fecha de Reserva",
            dataIndex: "reservationDate",
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
            render: (_: any, record: IReservationResponse) => {
                return (
                    <Space size="middle">
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
                title="Información del Vuelo"
                open={isModalVisible}
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
                            Información del Cliente
                        </Divider>
                        <p>
                            <strong>C.I.:</strong> {selectedReservation.clientId?.dni}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedReservation.clientId?.userId.email}
                        </p>
                        <Divider>
                            <DollarCircleOutlined /> Información Económica
                        </Divider>
                        <p>
                            <strong>Total:</strong> ${selectedReservation.paymentId.amount}
                        </p>
                        <p>
                            <strong>Método de Pago:</strong> {selectedReservation.paymentId.paymentMethodId?.paymentMethod}
                        </p>
                        <p>
                            <strong>Cuenta de Pago:</strong> {selectedReservation.paymentId.account}
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ReservationView;
