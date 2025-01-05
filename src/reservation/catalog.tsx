import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { DollarCircleOutlined, CalendarOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface FlightReservation {
  destination: string;
  imageUrl: string;
  price: number;
  departureDate: string;
  additionalInfo: string;
}

const flightData: FlightReservation[] = [
  {
    destination: 'Paris',
    imageUrl: 'https://example.com/paris.jpg',
    price: 500,
    departureDate: '2025-02-15',
    additionalInfo: 'Direct flight, 10h duration',
  },
  {
    destination: 'New York',
    imageUrl: 'https://example.com/newyork.jpg',
    price: 350,
    departureDate: '2025-03-05',
    additionalInfo: '1 stop, 12h duration',
  },
  {
    destination: 'Tokyo',
    imageUrl: 'https://example.com/tokyo.jpg',
    price: 800,
    departureDate: '2025-04-01',
    additionalInfo: 'Non-stop flight, 14h duration',
  },
  {
    destination: 'London',
    imageUrl: 'https://example.com/london.jpg',
    price: 400,
    departureDate: '2025-05-20',
    additionalInfo: 'Direct flight, 9h duration',
  },
  // Añadir más vuelos aquí
];

const FlightReservationCard: React.FC<{ flight: FlightReservation }> = ({ flight }) => {
  return (
    <Card
      hoverable
      cover={<img alt={flight.destination} src={flight.imageUrl} />}
      style={{ width: 240 }}
    >
      <Title level={4}>{flight.destination}</Title>
      <Text><DollarCircleOutlined /> ${flight.price}</Text><br />
      <Text><CalendarOutlined /> {flight.departureDate}</Text><br />
      <Text><GlobalOutlined /> {flight.additionalInfo}</Text>
    </Card>
  );
};

const FlightReservations: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]} justify="start">
        {flightData.map((flight, index) => (
          <Col span={6} key={index}>
            <FlightReservationCard flight={flight} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FlightReservations;
