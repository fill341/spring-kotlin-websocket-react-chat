import PropTypes from 'prop-types'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Notifications from 'react-notification-system-redux'

class Main extends React.Component {
    render() {
        return (
            <div className='container-fluid'>
                <div>
                    {React.cloneElement(this.props.children, this.props)}
                </div>
                <Notifications notifications={this.props.notifications}/>
            </div>
        )
    }
}

Main.propTypes = {
    children: PropTypes.element.isRequired,
    notifications: PropTypes.array
};

Main.contextTypes = {
    router: PropTypes.object
};

export default connect(
    (state) => {
        return {
            notifications: state.get('notifications')
        }
    },
    (dispatch) => bindActionCreators({}, dispatch)
)(Main);
