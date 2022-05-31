import { authService } from '../services';
import { authConstant } from '../constants';
import routesURL from '../routesURL';
import { history } from '../utils/helpers';
import { alertAction } from './alert.action';
import { commonAction } from './common.action';
import * as moment from 'moment';

export const authActions = {
  authConstantRequest(request, data) {
    return {
      type: authConstant[request],
      data,
    };
  },

  userLogin(email, password) {
    return (dispatch) => {
      dispatch(this.authConstantRequest('LOGIN_REQUEST'));
      dispatch(commonAction.SHOW_LOADER());
      authService.userLogin(email, password).then(
        (user) => {
          if (!!user && !!user.success && user.success) {
            localStorage.setItem(
              'user',
              JSON.stringify({
                email: user.data.productData.email,
                name: user.data.productData.name,
                id: user.data.productData.id,
              })
            );
            localStorage.setItem('aToken', user.data.token);

            let refreshTime = moment()
              .add(55, 'minutes')
              .format('MM-DD-YYYY hh:mm');
            localStorage.setItem('refreshTime', refreshTime);

            dispatch(this.authConstantRequest('LOGIN_SUCCESS', user));
            dispatch(this.getUserDetail(user.data.productData.id));
            dispatch(
              commonAction.toastSetUnset({
                title: 'Success',
                type: 'success',
                message: 'Login successfully',
                show: true,
              })
            );
            history.push(routesURL.HOME);
            dispatch(commonAction.HIDE_LOADER());
          } else {
            if (user.errorlist) {
              dispatch(alertAction.error(user.errorlist));
            } else {
              // dispatch(commonAction.toastSetUnset({
              // 	title: 'Error',
              // 	type: 'error',
              // 	message: user.message,
              // 	show: true
              // }));
              dispatch(alertAction.error(user.message));
            }

            dispatch(this.authConstantRequest('LOGIN_FAILURE'));

            dispatch(commonAction.HIDE_LOADER());
          }
        },
        (error) => {
          //dispatch(alertAction.error('Server is not responding. Please try after some time'))
          dispatch(
            commonAction.toastSetUnset({
              title: 'Error',
              type: 'error	',
              message: 'Server is not responding. Please try after some time',
              show: true,
            })
          );
          dispatch(this.authConstantRequest('LOGIN_FAILURE'));
          dispatch(commonAction.HIDE_LOADER());
        }
      );
    };
  },

  register(name, email, password, confirmPassword) {
    return (dispatch) => {
      dispatch(this.authConstantRequest('REGISTER_REQUEST'));
      dispatch(commonAction.SHOW_LOADER());
      authService.register(name, email, password, confirmPassword).then(
        (registerUser) => {
          if (!!registerUser.success && registerUser.success) {
            dispatch(
              this.authConstantRequest('REGISTER_SUCCESS', registerUser)
            );
            history.push(routesURL.LOGIN);
            dispatch(
              commonAction.toastSetUnset({
                title: 'Success',
                type: 'success',
                message: registerUser.message,
                show: true,
              })
            );
            dispatch(commonAction.HIDE_LOADER());
          } else {
            dispatch(alertAction.error(registerUser.errorlist));
            dispatch(this.authConstantRequest('REGISTER_FAILURE'));
            dispatch(commonAction.HIDE_LOADER());
          }
        },
        (error) => {
          dispatch(
            alertAction.error(
              'Server is not responding. Please try after some time'
            )
          );
          dispatch(this.authConstantRequest('REGISTER_FAILURE'));
          dispatch(commonAction.HIDE_LOADER());
        }
      );
    };
  },

  forgotPassword(email) {
    return (dispatch) => {
      dispatch(this.authConstantRequest('FORGOTPASSWORD_REQUEST'));
      dispatch(commonAction.SHOW_LOADER());
      authService.forgotPassword(email).then(
        (forgotPassword) => {
          if (!!forgotPassword.success && forgotPassword.success) {
            dispatch(
              this.authConstantRequest('FORGOTPASSWORD_SUCCESS', forgotPassword)
            );
            history.push(routesURL.LOGIN);
            dispatch(commonAction.HIDE_LOADER());
            dispatch(
              commonAction.toastSetUnset({
                title: 'Success',
                type: 'success',
                message: forgotPassword.message,
                show: true,
              })
            );
          } else {
            dispatch(alertAction.error(forgotPassword.message));
            dispatch(this.authConstantRequest('FORGOTPASSWORD_FAILURE'));
            dispatch(commonAction.HIDE_LOADER());
          }
        },
        (error) => {
          dispatch(
            alertAction.error(
              'Server is not responding. Please try after some time'
            )
          );
          dispatch(this.authConstantRequest('FORGOTPASSWORD_FAILURE'));
          dispatch(commonAction.HIDE_LOADER());
        }
      );
    };
  },

  resetPassword(token, password, confirmPassword) {
    return (dispatch) => {
      dispatch(this.authConstantRequest('RESETPASSWORD_REQUEST'));
      dispatch(commonAction.SHOW_LOADER());
      authService.resetPassword(token, password, confirmPassword).then(
        (resetPassword) => {
          if (!!resetPassword.success && resetPassword.success) {
            dispatch(
              this.authConstantRequest('RESETPASSWORD_SUCCESS', resetPassword)
            );
            history.push(routesURL.LOGIN);
            dispatch(commonAction.HIDE_LOADER());
            dispatch(
              commonAction.toastSetUnset({
                title: 'Success',
                type: 'success',
                message: resetPassword.message,
                show: true,
              })
            );
          } else {
            dispatch(alertAction.error(resetPassword.errorlist));
            dispatch(this.authConstantRequest('RESETPASSWORD_FAILURE'));
            dispatch(commonAction.HIDE_LOADER());
          }
        },
        (error) => {
          dispatch(
            alertAction.error(
              'Server is not responding. Please try after some time'
            )
          );
          dispatch(this.authConstantRequest('RESETPASSWORD_FAILURE'));
          dispatch(commonAction.HIDE_LOADER());
        }
      );
    };
  },

  getUserDetail(userid) {
    return (dispatch) => {
      dispatch(commonAction.SHOW_LOADER());
      dispatch(this.authConstantRequest('USER_DETAILS_REQUEST'));

      authService.getUserDetail(userid).then(
        (userDetail) => {
          if (!!userDetail && !!userDetail.success) {
            dispatch(
              this.authConstantRequest('USER_DETAILS_SUCCESS', userDetail.data)
            );
            dispatch(commonAction.HIDE_LOADER());
          } else {
            if (!!userDetail.status_code && userDetail.status_code === 401) {
              authService.logout();
              window.location.reload();
            } else {
              dispatch(this.authConstantRequest('USER_DETAILS_FAILURE'));
              dispatch(commonAction.HIDE_LOADER());
            }
          }
        },
        (error) => {
          dispatch(
            alertAction.error(
              'Server is not responding. Please try after some time'
            )
          );
          dispatch(this.authConstantRequest('RESETPASSWORD_FAILURE'));
          dispatch(commonAction.HIDE_LOADER());
        }
      );
    };
  },

  logout() {
    return (dispatch) => {
      authService.logout();
      history.push(routesURL.LOGIN);
      dispatch(this.authConstantRequest('USER_LOGOUT'));
    };
  },

  addtoFavourite(product_id, user_id, status) {
    return (dispatch) => {
      authService
        .addToFavourite(product_id, user_id, status)
        .then((favouriteData) => {
          if (status) {
            dispatch(
              this.authConstantRequest('ADDTO_FAVOURITE', favouriteData)
            );
          } else {
            dispatch(
              this.authConstantRequest('REMOVE_FAVOURITE', favouriteData)
            );
          }
        });
    };
  },

  updateProfile(name, email) {
    return (dispatch) => {
      dispatch(this.authConstantRequest('UPDATEPROFILE_REQUEST'));
      dispatch(commonAction.SHOW_LOADER());
      authService.updateProfile(name, email).then(
        (updatedData) => {
          if (updatedData.success) {
            dispatch(
              this.authConstantRequest('UPDATEPROFILE_SUCCESS', updatedData)
            );
            dispatch(this.getUserDetail(updatedData.data.data.id));
            dispatch(
              commonAction.toastSetUnset({
                title: 'Success',
                type: 'success',
                message: updatedData.message,
                show: true,
              })
            );
            dispatch(commonAction.HIDE_LOADER());
          } else {
            dispatch(
              commonAction.toastSetUnset({
                title: 'Error',
                type: 'error	',
                message: updatedData.message,
                show: true,
              })
            );
            dispatch(alertAction.error(updatedData.errorlist));
            dispatch(this.authConstantRequest('UPDATEPROFILE_FAILURE'));
            dispatch(commonAction.HIDE_LOADER());
          }
        },
        (error) => {
          dispatch(
            commonAction.toastSetUnset({
              title: 'Error',
              type: 'error	',
              message: 'Server is not responding. Please try after some time',
              show: true,
            })
          );
          dispatch(this.authConstantRequest('UPDATEPROFILE_FAILURE'));
          dispatch(commonAction.HIDE_LOADER());
        }
      );
    };
  },

  changePassword(password, confirm_password) {
    return (dispatch) => {
      dispatch(this.authConstantRequest('CHANGEPASSWORD_REQUEST'));
      dispatch(commonAction.SHOW_LOADER());
      authService.changePassword(password, confirm_password).then(
        (changepassword) => {
          if (changepassword.success) {
            dispatch(
              this.authConstantRequest('CHANGEPASSWORD_SUCCESS', changepassword)
            );
            dispatch(
              commonAction.toastSetUnset({
                title: 'Success',
                type: 'success',
                message: changepassword.message,
                show: true,
              })
            );
            dispatch(commonAction.HIDE_LOADER());
          } else {
            dispatch(
              commonAction.toastSetUnset({
                title: 'Error',
                type: 'error	',
                message: changepassword.message,
                show: true,
              })
            );
            dispatch(alertAction.error(changepassword.errorlist));
            dispatch(this.authConstantRequest('CHANGEPASSWORD_FAILURE'));
            dispatch(commonAction.HIDE_LOADER());
          }
        },
        (error) => {
          dispatch(
            commonAction.toastSetUnset({
              title: 'Error',
              type: 'error	',
              message: 'Server is not responding. Please try after some time',
              show: true,
            })
          );
          dispatch(this.authConstantRequest('CHANGEPASSWORD_FAILURE'));
          dispatch(commonAction.HIDE_LOADER());
        }
      );
    };
  },
};
