import React, { Component } from 'react';
import routesURL from '../routesURL';
import { Button } from 'primereact/button';
import { history } from '../utils/helpers';

class PageNotFound extends Component {
  constructor(props) {
    super(props);

    this.redirectLink = this.redirectLink.bind(this);
  }

  redirectLink() {
    history.push(routesURL.HOME);
  }

  render() {
    return (
      <div className="pagenotfound-page">
        <div className="inside-pagenot-found">
          <div className="oops-sub-text">Oops! Page Not Found</div>
          <div>
            <img
              src={process.env.PUBLIC_URL + '/images/404-error-image.png'}
              alt=""
            />
          </div>
          <div className="notfound-text">
            <h4>
              We are sorry, but the page you requested was <br />
              Not Found
            </h4>
            {/* <Link to={routesURL.HOME} className="p-button p-component home-link" ><i className="fas fa-angle-left"></i>
						 Go bake to Home</Link> */}
            <Button
              onClick={this.redirectLink}
              label="Go bake to Home"
              icon="pi pi-arrow-left"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
