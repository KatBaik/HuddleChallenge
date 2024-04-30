import { backendAPI } from '../index';
import HouseRow  from './HouseRow';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from "reactstrap";

const ListHouses = () => {
    const [houses, setHouses] = useState([]);
    useEffect(() => {
        axios.get(backendAPI).then(res => { setHouses(res.data.data) })
            .catch(err => console.log(err))
    }, []);
    return (
        <div style={{ backgroundColor: "black", width: "100vw", height: "100vh" }}>
            <h1 style={{color: "white", textAlign: "center", padding: "20px"} }>Houses</h1>
            <Container style={{ marginTop: "20px" }} dark>
                <Row>
                    <Col>
                        <Table dark style={{ borderRadius: "10px" }}>
                            <thead>
                                <tr>
                                    <th>City</th>
                                    <th>Street address</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {houses && houses.map(house => (<HouseRow key={"house" + house.id} house={house} />))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default ListHouses;
