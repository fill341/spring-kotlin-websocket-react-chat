import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, FormGroup, Button, ButtonGroup} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form/immutable'
import {submitLogin} from './actions'
import validate from './validate'
import InputComponent from './InputComponent'

@connect(
    () => ({}),
    (dispatch) => ({
        submitLogin: bindActionCreators(submitLogin, dispatch)
    })
)
class LoginForm extends React.Component {
    render() {
        const {handleSubmit, valid, reset, submitLogin} = this.props;

        return (
            <Form className="edit-form" horizontal onSubmit={handleSubmit((form) => submitLogin(form))}>
                <Field controlId='formUsername' name='username' component={InputComponent} label='username' placeholder='Username'/>
                <Field controlId='formPassword' name='password' type='password' component={InputComponent} label='password' placeholder='Password'/>
                <FormGroup>
                    <ButtonGroup className='pull-right'>
                        <Button onClick={reset} >Reset</Button>
                        <Button type='submit' disabled={!valid}>Log in</Button>
                    </ButtonGroup>
                </FormGroup>
            </Form>
        )
    }
}

export default reduxForm({
    form: 'LoginForm',
    validate
})(LoginForm);

LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    valid: PropTypes.bool,
    reset: PropTypes.func,
    submitLogin: PropTypes.func,
    submitting: PropTypes.bool
};
