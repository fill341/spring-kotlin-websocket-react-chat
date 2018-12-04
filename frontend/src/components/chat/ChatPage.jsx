import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import {webSocketSubscribe} from '../ws/utility-actions'
import {sendMessage} from '../ws/client-actions'
import {Form, FormGroup, ListGroup, ListGroupItem, Well} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form/lib/immutable';
import validate from '../common/login/validate';
import InputComponent from '../common/login/InputComponent'
import {List} from 'immutable'

@connect(
    (state) => ({
        messages: state.getIn(['app', 'chat', 'messages']) || List()
    }),
    (dispatch) => ({
        webSocketSubscribe: bindActionCreators(webSocketSubscribe, dispatch),
        sendMessage: bindActionCreators(sendMessage, dispatch)
    })
)
class ChatPage extends React.Component {

    componentWillMount() {
        this.props.webSocketSubscribe();
    }

    render() {
        return (
            <div className={'container chat__form'}>
                <Form onSubmit={this.props.handleSubmit((form) => {this.props.sendMessage({'content': form.get('content')}); this.props.reset();})}>
                    <Well>
                        <ListGroup>
                            {this.props.messages.map(({author, content}, idx) => <ListGroupItem key={idx}>{author}: {content}</ListGroupItem>)}
                        </ListGroup>
                        <FormGroup>
                            <Field name='content' type='textarea' component={InputComponent}/>
                        </FormGroup>
                    </Well>
                </Form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'ChatPage',
    validate
})(ChatPage);

ChatPage.propTypes = {
    webSocketSubscribe: PropTypes.func,
    sendMessage: PropTypes.func,
    messages: PropTypes.object,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func
};
