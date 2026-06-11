import React from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={18}>
                    <div><h1>Doggo Search</h1></div>
                </Col>
                <Col className="gutter-row" span={3}>
                    <div>
                        <Button type="link" size='large' className="search-btn">
                            <Link to='/'>Search</Link>
                        </Button>
                    </div>
                </Col>
                <Col className="gutter-row" span={3}>
                    <div>
                        <Button type="link" size='large'>
                            <Link to='/saved-dogs'>My saved dogs</Link>
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
