import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap/';
import { commonAction } from './../actions';

class ToastComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toastData: {
        title: '',
        message: '',
        type: '',
        show: false,
      },
    };
    this.onCloseToast = this.onCloseToast.bind(this);
    this.props.dispatch(commonAction.toastSetUnset(this.state.toastData));
  }

  onCloseToast(e) {
    this.setState({
      show: false,
    });
    let toastData = {
      title: '',
      message: '',
      type: '',
      show: false,
    };
    this.props.dispatch(commonAction.toastSetUnset(toastData));
  }

  render() {
    const { toastData } = this.props;
    return (
      // <Toast ref={this.toast} />
      <Toast
        onClose={this.onCloseToast}
        className
        show={toastData.show}
        delay={2000}
        autohide
      >
        <div className={'toast-innercontent ' + toastData.type}>
          <span
            className={
              'toast-icon pi ' +
              (toastData.type === 'warn'
                ? 'pi-exclamation-triangle'
                : toastData.type === 'error'
                ? 'pi-times'
                : 'pi-check')
            }
          ></span>
          <Toast.Body>
            {toastData.title && (
              <Toast.Header>
                <strong className="mr-auto">{toastData.title}</strong>
              </Toast.Header>
            )}
            {toastData.message}
          </Toast.Body>
        </div>
      </Toast>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

const ConnectedToast = connect(mapStateToProps)(ToastComponent);
export { ConnectedToast as ToastComponent };
