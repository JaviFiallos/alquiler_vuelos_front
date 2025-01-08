import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Spin, Select, InputNumber, Button, Modal, Form, Input, Pagination, Radio, message } from 'antd';
import { DollarCircleOutlined, CalendarOutlined, GlobalOutlined, UserOutlined, ProfileOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { IFlight } from '../types/IFlight';
import { getFlights, getCities } from '../services/flight.service';
import { ICity } from '../types/ICity';
import { createReservation } from '../services/reservation.service';
import { getUserId } from '../utils/utils';

const { Title, Text } = Typography;
const { Option } = Select;

const FlightReservationCard: React.FC<{ flight: IFlight; onReserve: (flight: IFlight) => void }> = ({ flight, onReserve }) => {
  const [loading, setLoading] = useState(false);

  const departureDate = new Date(parseInt(flight.departureDate.replace('/Date(', '').replace(')/', '')));
  const arrivalDate = new Date(parseInt(flight.arrivalDate.replace('/Date(', '').replace(')/', '')));
  const durationMs = arrivalDate.getTime() - departureDate.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  const handleReserveClick = () => {
    setLoading(true);
    onReserve(flight);
    setLoading(false);
  };

  return (
    <Card
      hoverable
      style={{ width: '100%', marginBottom: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
      bodyStyle={{ padding: '20px' }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Text strong style={{ fontSize: '16px' }}>{flight.airlineId.airline}</Text>
        </Col>
        <Col span={24}>
          <Title level={4} style={{ marginTop: '5px', marginBottom: '15px' }}>
            {flight.originAirportId.cityId.city}, {flight.originAirportId.cityId.country}{' '}
            <ArrowRightOutlined />{' '}
            {flight.destinationAirportId.cityId.city}, {flight.destinationAirportId.cityId.country}
          </Title>
        </Col>
        <Col span={12}>
          <Text><DollarCircleOutlined /> Valor por Asiento: ${flight.price}</Text><br />
          <Text><CalendarOutlined /> Duración Estimada: {durationHours}h {durationMinutes}m</Text><br />
          <Text><GlobalOutlined /> {flight.scales === 0 ? 'Vuelo directo' : `Escala(s): ${flight.scales}`}</Text><br />
        </Col>
        <Col span={12}>
          <Text><UserOutlined /> Clase: {flight.type}</Text><br />
          <Text>
            <CalendarOutlined /> Salida: {departureDate.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}, {departureDate.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text><br />
          <Text><ProfileOutlined /> Asientos Disponibles: {flight.availableSeats}</Text><br />
        </Col>
        <Col span={24} style={{ marginTop: '15px' }}>
          <Button type="primary" loading={loading} onClick={handleReserveClick} block>
            Realizar Reserva
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

const FlightReservations: React.FC = () => {
  const [flightData, setFlightData] = useState<IFlight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<IFlight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    class: '',
    maxPrice: undefined,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<IFlight | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number | null>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [accountInfo, setAccountInfo] = useState<string>('');
  const [cities, setCities] = useState<ICity[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 9;

  const fetchFlights = () => {
    setLoading(true);
    Promise.all([getFlights(), getCities()])
      .then(([flightResponse, citiesResponse]) => {
        const currentDateTime = new Date();
        const activeFlights = flightResponse.filter((flight) => {
          const departureDate = new Date(parseInt(flight.departureDate.replace('/Date(', '').replace(')/', '')));
          return flight.isActive && flight.availableSeats > 0 && departureDate > currentDateTime;
        });
        setFlightData(activeFlights);
        setFilteredFlights(activeFlights);
        setCities(citiesResponse);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ origin: '', destination: '', class: '', maxPrice: undefined });
  };

  useEffect(() => {
    let filtered = flightData;
    if (filters.origin) {
      filtered = filtered.filter((flight) => flight.originAirportId.cityId.city.includes(filters.origin));
    }
    if (filters.destination) {
      filtered = filtered.filter((flight) => flight.destinationAirportId.cityId.city.includes(filters.destination));
    }
    if (filters.class) {
      filtered = filtered.filter((flight) => flight.type === filters.class);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((flight) => flight.price <= filters.maxPrice!);
    }
    setFilteredFlights(filtered);
    setCurrentPage(1);
  }, [filters, flightData]);

  const handleReserve = (flight: IFlight) => {
    setSelectedFlight(flight);
    setTotalPrice(flight.price * selectedSeats!);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  const handlePaymentModalCancel = () => {
    setIsPaymentModalOpen(false);
    setSelectedFlight(null);
  };

  const handlePaymentMethodChange = (e: any) => {
    setPaymentMethod(e.target.value);
    setAccountInfo(''); // Reset account info on method change
  };

  const handleAccountInfoChange = (e: any) => {
    setAccountInfo(e.target.value);
  };

  const handlePayment = () => {
    if (paymentMethod && accountInfo) {
      const values = {
        userId: getUserId(),
        flightId: selectedFlight?.flightId,
        numberOfPassengers: selectedSeats,
        status: 'Reservado',
        amount: totalPrice,
        paymentMethodId: paymentMethod === 'creditCard' ? 1 : paymentMethod === 'paypal' ? 2 : 3,
        account: accountInfo,
      };

      createReservation(values)
        .then(() => {
          message.success('Reserva realizada con éxito.');
          fetchFlights();
          setIsPaymentModalOpen(false);
          setSelectedFlight(null);
          setSelectedSeats(1);
          setTotalPrice(0);
          setPaymentMethod('');
          setAccountInfo('');
        })
        .catch((error) => {
          message.error('Error al realizar la reserva. Inténtalo de nuevo.');
          console.error('Error al realizar la reserva:', error);
        });
    } else {
      message.warning('Por favor selecciona un método de pago y proporciona la información requerida.');
    }
  };

  const paginateFlights = (flights: IFlight[]) => {
    const startIndex = (currentPage - 1) * flightsPerPage;
    return flights.slice(startIndex, startIndex + flightsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (selectedFlight) {
      setTotalPrice(selectedSeats! * selectedFlight.price);
    }
  }, [selectedSeats, selectedFlight]);

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col span={5}>
          <Select
            placeholder="Origen"
            style={{ width: '100%' }}
            showSearch
            filterOption={(input, option) =>
              ((option?.children as any) || '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={(value) => handleFilterChange('origin', value)}
            allowClear
          >
            {cities.map((city) => {
              const cityAndCountry = `${city.city}, ${city.country}`;
              return (
                <Option key={city.cityId} value={city.city}>{cityAndCountry}</Option>
              );
            })}
          </Select>
        </Col>
        <Col span={5}>
          <Select
            placeholder="Destino"
            style={{ width: '100%' }}
            showSearch
            filterOption={(input, option) =>
              ((option?.children as any) || '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={(value) => handleFilterChange('destination', value)}
            allowClear
          >
            {cities.map((city) => {
              const cityAndCountry = `${city.city}, ${city.country}`;
              return (
                <Option key={city.cityId} value={city.city}>{cityAndCountry}</Option>
              );
            })}
          </Select>
        </Col>
        <Col span={4}>
          <Select
            placeholder="Clase"
            style={{ width: '100%' }}
            onChange={(value) => handleFilterChange('class', value)}
            allowClear
          >
            <Option value="Económica">Económica</Option>
            <Option value="Ejecutiva">Ejecutiva</Option>
            <Option value="Primera Clase">Primera Clase</Option>
          </Select>
        </Col>
        <Col span={4}>
          <InputNumber
            placeholder="Precio máximo"
            style={{ width: '100%' }}
            onChange={(value) => handleFilterChange('maxPrice', value)}
          />
        </Col>
        <Col span={6}>
          <Button type="default" onClick={clearFilters} style={{ marginLeft: '10px' }}>
            Limpiar Filtros
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Spin size="large" tip="Cargando vuelos..." />
      ) : (
        <>
          <Row gutter={[16, 16]} justify="start">
            {paginateFlights(filteredFlights).map((flight, index) => (
              <Col span={24} key={index}>
                <FlightReservationCard flight={flight} onReserve={handleReserve} />
              </Col>
            ))}
          </Row>

          <Pagination
            current={currentPage}
            pageSize={flightsPerPage}
            total={filteredFlights.length}
            onChange={handlePageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </>
      )}

      {/* Modal de Reservar Vuelo */}
      <Modal
        title="Selecciona el número de asientos"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {selectedFlight && (
          <div style={{ marginBottom: '20px' }}>
            <Row>
              <Col span={12}>
                <Text strong>Aerolínea:</Text>
              </Col>
              <Col span={12}>
                <Text>{selectedFlight.airlineId.airline}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Text strong>Origen:</Text>
              </Col>
              <Col span={12}>
                <Text>{selectedFlight.originAirportId.cityId.city}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Text strong>Destino:</Text>
              </Col>
              <Col span={12}>
                <Text>{selectedFlight.destinationAirportId.cityId.city}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Text strong>Precio por Asiento:</Text>
              </Col>
              <Col span={12}>
                <Text>${selectedFlight.price}</Text>
              </Col>
            </Row>
          </div>
        )}
        <Form layout="vertical">
          <Form.Item label="Número de Asientos">
            <InputNumber
              min={1}
              max={selectedFlight?.availableSeats}
              value={selectedSeats}
              onChange={setSelectedSeats}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label="Total a Pagar">
            <Input value={`$${totalPrice}`} disabled />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal de Métodos de Pago */}
      <Modal
        title="Método de Pago"
        open={isPaymentModalOpen}
        onOk={handlePayment}
        onCancel={handlePaymentModalCancel}
        okText="Realizar Pago"
        cancelText="Cancelar"
      >
        <Form layout="vertical">
          <Form.Item label="Método de Pago">
            <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
              <Radio value="creditCard">Tarjeta de Crédito</Radio>
              <Radio value="paypal">PayPal</Radio>
              <Radio value="bankTransfer">Transferencia Bancaria</Radio>
            </Radio.Group>
          </Form.Item>

          {paymentMethod === 'creditCard' && (
            <Form.Item label="Número de Tarjeta">
              <Input value={accountInfo} onChange={handleAccountInfoChange} placeholder="Número de Tarjeta" />
            </Form.Item>
          )}

          {paymentMethod === 'paypal' && (
            <Form.Item label="Correo Electrónico de PayPal">
              <Input value={accountInfo} onChange={handleAccountInfoChange} placeholder="Correo Electrónico" />
            </Form.Item>
          )}

          {paymentMethod === 'bankTransfer' && (
            <Form.Item label="Número de Cuenta">
              <Input value={accountInfo} onChange={handleAccountInfoChange} placeholder="Número de Cuenta Bancaria" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default FlightReservations;
