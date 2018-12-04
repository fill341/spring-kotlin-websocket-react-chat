import React from 'react'
import LoginForm from '../login/LoginForm'
import {Col, Panel, Row} from 'react-bootstrap'

export default class LoginPage extends React.Component {
    render() {
        return (
            <Row className='login-form-row'>
                <Col xs={6} md={4}/>
                <Col xs={6} md={4}>
                    <Panel>
                        <LoginForm/>
                    </Panel>
                </Col>
                <Col xsHidden md={4}/>
            </Row>
        )
    }
}
