import routesURL from '../routesURL';
import { authService, JWTService } from '../services';
import { history } from '../utils/helpers';
import * as moment from 'moment';

export const JWT = {
  TOKENREFRESH() {
    let getRefreshTime = null;
    let currentRefreshTime = null;
    let tokenInterval = null;

    tokenInterval = setInterval(() => {
      let aToken = this.ATOKEN();
      if (!!aToken) {
        getRefreshTime = localStorage.getItem('refreshTime');
        currentRefreshTime = moment().format('MM-DD-YYYY hh:mm');
        if (currentRefreshTime === getRefreshTime) {
          return JWTService.refresh().then(
            (res) => {
              localStorage.setItem('aToken', res.data.refresh_token);
              let newRefreshTime = moment()
                .add(55, 'minutes')
                .format('MM-DD-YYYY hh:mm');
              localStorage.setItem('refreshTime', newRefreshTime);
            },
            (error) => {
              authService.logout();
              history.push(routesURL.LOGIN);
              return error;
            }
          );
        }
      }
    }, 1 * 60 * 1000);
  },

  ATOKEN() {
    const aToken = localStorage.getItem('aToken');
    return aToken !== undefined ? aToken : null;
  },
};
