import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const BannerPromo = () => {
  return (
    <div>
        <Container className="my-5">
            <Row>
                <Col md={12} xs={12} className="d-flex justify-content-center">
                    <img src="https://www.static-src.com/siva/asset//03_2022/PHILIPS-Homepage-long-banner-desktop-rev-10mar.jpg?output-format=webp" alt="" style={{width: "110%", borderRadius: 20}}/>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default BannerPromo