import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'

export default class InputComponent extends React.Component {
    render() {
        const { input, meta, placeholder, disabled, controlId, label, type = 'text', hidden = false } = this.props;

        return (
            <FormGroup hidden={hidden} controlId={controlId} validationState={validate(meta.error)}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl type={type} placeholder={placeholder} disabled={disabled} {...input}/>
                <FormControl.Feedback />
                <HelpBlock>{meta.error}</HelpBlock>
            </FormGroup>
        )
    }
}

export function validate(value) {
    if (value) {
        return 'error';
    }
    return null;
}

InputComponent.propTypes = {
    controlId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    hidden: PropTypes.bool
};

