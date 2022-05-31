import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, ButtonGroup } from 'react-bootstrap/';
import { authActions, commonAction } from '../actions';
import routesURL from '../routesURL';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleLogout = this.handleLogout.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
  }
  handleLogout() {
    this.props.dispatch(authActions.logout());
  }

  menuToggle() {
    if (this.props.leftMenuOpen) {
      this.props.dispatch(commonAction.HIDE_MENU());
    } else {
      this.props.dispatch(commonAction.SHOW_MENU());
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header-left">
          <button className="toggle-menu" onClick={this.menuToggle}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="logo">
            <img src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="" />
          </div>
        </div>
        <div className="header-right">
          <Dropdown className="user-menu" as={ButtonGroup}>
            <div className="user-icon-name">
              <span className="user-icon">
                <i className="far fa-user-circle"></i>
              </span>
              <span>{this.props.userDetail.name}</span>
            </div>
            <Dropdown.Toggle split variant="link" id="dropdown-split-basic">
              <i className="fas fa-chevron-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu menualign="right">
              <Dropdown.Item as="div" eventKey="option-1">
                <Link to={routesURL.EDIT_PROFILE}>
                  <i className="fas fa-user-alt"></i> Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <i className="fas fa-cog"></i> Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={this.handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

const ConnectedHeader = connect(mapStateToProps)(Header);
export { ConnectedHeader as Header };
