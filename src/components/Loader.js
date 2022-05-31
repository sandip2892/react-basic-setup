import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loader extends Component {
  render() {
    return (
      <div className="loader-fixed">
        <div className="loader">
          {/* <div className="loader-dot"></div>
					<div className="loader-dot"></div>
					<div className="loader-dot"></div>
					<div className="loader-dot"></div>
					<div className="loader-dot"></div>
					<div className="loader-dot"></div> */}
          <img alt="" src={process.env.PUBLIC_URL + '/images/loader.svg'}></img>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loader } = state;
  return { loader };
}

const connectedLoader = connect(mapStateToProps)(Loader);
export { connectedLoader as Loader };
