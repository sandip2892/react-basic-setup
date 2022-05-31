import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ScrollPanel } from 'primereact/scrollpanel';
// import { Scrollbars } from 'react-custom-scrollbars';
import { Nav, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import routesURL from '../routesURL';
import { Tooltip } from 'primereact/tooltip';
import { authActions } from '../actions';

class Leftmenu extends Component {
  constructor(props) {
    super(props);

    this.addtoFavourite = this.addtoFavourite.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
  }

  addtoFavourite(e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('user'));
    let user_id = user.id;
    let product_id = e.target.getAttribute('data-id');
    let status = true;
    this.props.dispatch(
      authActions.addtoFavourite(product_id, user_id, status)
    );
  }

  removeFavourite(e) {
    e.preventDefault();
    let product_id = e.target.getAttribute('data-id');
    let user = JSON.parse(localStorage.getItem('user'));
    let user_id = user.id;
    let status = false;
    this.props.dispatch(
      authActions.addtoFavourite(product_id, user_id, status)
    );
  }

  render() {
    return (
      <div
        className={`LeftMenu ${!this.props.leftMenuOpen ? 'closeSidebar' : ''}`}
        id="leftmenu"
      >
        <div className="sidebar-main">
          <ScrollPanel className="leftmenu-scroll">
            <Nav
              defaultActiveKey="/home"
              className="flex-column left-menu"
              as="ul"
            >
              {this.props.userDetail.favourite
                ? this.props.userDetail.favourite.map((menu, index) => {
                    return (
                      <Fragment key={`favourite-${menu.product_id}`}>
                        <NavItem as="li">
                          <NavLink
                            to={routesURL.HOME + menu.slug}
                            eventkey={menu.slug}
                            className={`nav-link link-favourite-${index}`}
                          >
                            <i className="menu-icon">
                              <img src={`/images/${menu.icon}`} alt="" />
                            </i>
                            <p>{menu.name}</p>
                          </NavLink>
                          {menu.favourite === false ? (
                            <span
                              className="favorite-star fill-star"
                              data-id={menu.product_id}
                              onClick={this.removeFavourite}
                            >
                              <i className="fas fa-star"></i>
                            </span>
                          ) : null}
                        </NavItem>
                        {!this.props.leftMenuOpen && (
                          <Tooltip
                            className="menu-tooltip"
                            target={`.link-favourite-${index}`}
                          >
                            {menu.name}
                          </Tooltip>
                        )}
                      </Fragment>
                    );
                  })
                : null}
            </Nav>
            <div className="seprator"></div>
            <Nav
              defaultActiveKey="/home"
              className="flex-column left-menu"
              as="ul"
            >
              {this.props.userDetail.product
                ? this.props.userDetail.product.map((menu, index) => {
                    return (
                      <Fragment key={`product-${menu.product_id}`}>
                        <NavItem as="li">
                          <NavLink
                            to={routesURL.HOME + menu.slug}
                            eventkey={menu.slug}
                            className={`nav-link link-${index}`}
                          >
                            <i className="menu-icon">
                              <img src={`/images/${menu.icon}`} alt="" />
                            </i>
                            <p>{menu.name}</p>
                          </NavLink>
                          <span
                            className="favorite-star"
                            data-id={menu.product_id}
                            onClick={this.addtoFavourite}
                          >
                            <i className="far fa-star"></i>
                          </span>
                        </NavItem>
                        {!this.props.leftMenuOpen && (
                          <Tooltip
                            className="menu-tooltip"
                            target={`.link-${index}`}
                          >
                            {menu.name}
                          </Tooltip>
                        )}
                      </Fragment>
                    );
                  })
                : null}
            </Nav>
          </ScrollPanel>
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

const ConnectedLeftmenu = connect(mapStateToProps)(Leftmenu);
export { ConnectedLeftmenu as Leftmenu };
