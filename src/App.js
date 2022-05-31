import React, { Component } from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import routesURL from './routesURL';
import { history, tokenExist } from './utils/helpers';
import { alertAction, authActions, JWT } from './actions';
import { Loader } from './components/Loader';
import { ToastComponent } from './components/Toast';
import PageNotFound from './components/PageNotFound';

// LAYOUT :BEGIN
import { AuthContainer } from './container/AuthContainer';
import { MainContainer } from './container/MainContainer';
// LAYOUT :END

// PAGES :BEGIN
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { ResetPassword } from './pages/Auth/ResetPassword';
import { ActivateUser } from './pages/Auth/ActivateUser';
import { Dashboard } from './pages/Dashboard';
import { InvestmentTracker } from './pages/InvestmentTracker';
import { InvestmentTrackerDetail } from './pages/InvestmentTracker/InvestmentTrackerDetail';
import { InvestmentTrackerExportDetail } from './pages/InvestmentTracker/InvestmentTrackerExportDetail';
import { CompanyDetails } from './pages/CompanyDetails';
import { EditProfile } from './pages/EditProfile';
import { CampaignManagement } from './pages/CampaignManagement';
import { CampaignDetail } from './pages/CampaignManagement/CampaignDetail';
import { NDASign } from './pages/NDASign';
import { Memorandum } from './pages/Memorandum';

// PAGES :END

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToken: tokenExist(),
    };
  }

  componentWillMount() {
    JWT.TOKENREFRESH();
    if (this.state.isToken) {
      if (!!this.props.authentication.user) {
        this.props.dispatch(
          authActions.getUserDetail(this.props.authentication.user.id)
        );
      } else {
        this.props.dispatch(authActions.logout());
      }
    }
    history.listen((location, action) => {
      // debugger
      this.props.dispatch(alertAction.clear());
      this.setState({
        isToken: tokenExist(),
      });
    });
  }

  render() {
    const { isToken } = this.state;
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route
              path={routesURL.LOGIN}
              render={(props) =>
                !isToken ? (
                  <AuthContainer {...props}>
                    <Login {...props} />
                  </AuthContainer>
                ) : (
                  <Redirect to={routesURL.HOME} />
                )
              }
            />
            <Route
              path={routesURL.SIGNUP}
              render={(props) =>
                !isToken ? (
                  <AuthContainer {...props}>
                    <Register {...props} />
                  </AuthContainer>
                ) : (
                  <Redirect to={routesURL.HOME} />
                )
              }
            />
            <Route
              path={routesURL.FORGOT_PASSWORD}
              render={(props) =>
                !isToken ? (
                  <AuthContainer {...props}>
                    <ForgotPassword {...props} />
                  </AuthContainer>
                ) : (
                  <Redirect to={routesURL.HOME} />
                )
              }
            />
            <Route
              path={routesURL.RESET_PASSWORD}
              render={(props) =>
                !isToken ? (
                  <AuthContainer {...props}>
                    <ResetPassword {...props} />
                  </AuthContainer>
                ) : (
                  <Redirect to={routesURL.HOME} />
                )
              }
            />
            <Route
              path={routesURL.ACTIVATE_USER}
              render={(props) =>
                !isToken ? (
                  <AuthContainer {...props}>
                    <ActivateUser {...props} />
                  </AuthContainer>
                ) : (
                  <Redirect to={routesURL.HOME} />
                )
              }
            />
            <Route
              exact
              path={routesURL.HOME}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <Dashboard {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            {/* <Route path={routesURL.BUYER_LIST} render={(props) => (isToken ? <MainContainer {...props}><BuyerList {...props} /></MainContainer> : <Redirect to={routesURL.LOGIN} />)} /> */}
            <Route
              path={routesURL.INVESTMENT_TRACKER}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <InvestmentTracker {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            <Route
              path={routesURL.INVESTMENT_TRACKER_DETAIL}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <InvestmentTrackerDetail {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            <Route
              path={routesURL.INVESTMENT_TRACKER_EXPORT_DETAIL}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <InvestmentTrackerExportDetail {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            <Route
              path={routesURL.COMPANY_DETAIL}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <CompanyDetails {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            <Route
              path={routesURL.EDIT_PROFILE}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <EditProfile {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            <Route
              path={routesURL.CAMPAIGN_MANAGEMENT}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <CampaignManagement {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            <Route
              path={routesURL.CAMPAIGN_DETAIL}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <CampaignDetail {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            <Route
              path={routesURL.NDA}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <NDASign {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            <Route
              path={routesURL.MEMORANDUM}
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <Memorandum {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
            {/* <Route component={PageNotFound} /> */}

            <Route
              render={(props) =>
                isToken ? (
                  <MainContainer {...props}>
                    <PageNotFound {...props} />
                  </MainContainer>
                ) : (
                  <Redirect to={routesURL.LOGIN} />
                )
              }
            />
          </Switch>
        </Router>

        {/* Toast Component START */}
        <ToastComponent />
        {/* Toast Component END */}

        {/* LOADER START */}
        {this.props.loader && <Loader />}
        {/* LOADER END */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

const ConnectedApp = connect(mapStateToProps)(App);
export { ConnectedApp as App };
