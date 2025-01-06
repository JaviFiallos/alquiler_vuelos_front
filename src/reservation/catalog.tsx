import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Spin, Select, InputNumber, Button, Modal, Form, Input, Pagination } from 'antd';
import { DollarCircleOutlined, CalendarOutlined, GlobalOutlined, UserOutlined, ProfileOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { IFlight } from '../types/IFlight';
import { getFlights, getCities } from '../services/flight.service';
import { ICity } from '../types/ICity';

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
      style={{ width: '100%', marginBottom: '20px', borderRadius: '10px' }}
      bodyStyle={{ padding: '20px' }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Text strong>{flight.airlineId.airline}</Text>
        </Col>
        <Col span={24}>
        <Title level={3}>
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
            <CalendarOutlined /> Salida:{" "}
            {departureDate.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })},{" "}
            {departureDate.toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text><br />
          <Text><ProfileOutlined/> Asientos Disponibles: {flight.availableSeats}</Text><br />
        </Col>
        <Col span={24} style={{ marginTop: '10px' }}>
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
  const [selectedFlight, setSelectedFlight] = useState<IFlight | null>(null);
  const [cities, setCities] = useState<ICity[]>([]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 9;

  useEffect(() => {
    Promise.all([getFlights(), getCities()])
      .then(([flightResponse, citiesResponse]) => {
        const activeFlights = flightResponse.filter((flight) => flight.isActive);
        setFlightData(activeFlights);
        setFilteredFlights(activeFlights);
        setCities(citiesResponse);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
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
    setCurrentPage(1);  // Reset to the first page when filters change
  }, [filters, flightData]);

  const handleReserve = (flight: IFlight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };

  const paginateFlights = (flights: IFlight[]) => {
    const startIndex = (currentPage - 1) * flightsPerPage;
    return flights.slice(startIndex, startIndex + flightsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
              return(
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
              return(
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
              <Col span={24} key={index}> {/* Un vuelo por fila */}
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

      <Modal
        title="Reserva de Vuelo"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {selectedFlight && (
          <Form layout="vertical">
            <Form.Item label="Aerolinea">
              <Input value={selectedFlight.airlineId.airline} disabled />
            </Form.Item>
            <Form.Item label="Destino">
              <Input value={selectedFlight.destinationAirportId.cityId.city} disabled />
            </Form.Item>
            <Form.Item label="Precio">
              <Input value={`$${selectedFlight.price}`} disabled />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default FlightReservations;
