import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <footer style={{ backgroundColor: "gray", color: "white" }}>
      <Container>
        <Row>
          <Col className="text-center py-3">Ecommerce &copy; 2021</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
