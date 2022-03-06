import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import categ from './Categ'

const CategoryComp = () => {
  return (
    <div>
        <Container fluid style={{width: "90%", marginTop: 100, textAlign: "center"}}>
            <Row style={{justifyContent: "center"}}>
                {categ.map(cate => (
                    <Col md={1} xs={2} className="cate pb-3">
                        <img style={{width: 60, letterSpacing: 100, borderRadius: "50%", marginBottom: 10}} src={cate.image} alt="" />
                        <h6>{cate.nama}</h6>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
  )
}

export default CategoryComp