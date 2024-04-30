import { Container, Row, Col, Table } from "reactstrap";

const UtilityTable = ({utilities}) => {
    return (
        <Container style={{ marginTop: "20px" }} dark>
            <Row>
                <Col>
                    <Table dark style={{ borderRadius: "10px" }}>
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {utilities && utilities.map(utility => (
                                <tr key={"utility" + utility.id}>
                                    <td>{utility.readingValue}</td>
                                    <td>{utility.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default UtilityTable;