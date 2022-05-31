import { investmentTrackerService } from '../services';
import { investmentTrackerConstant } from '../constants';
import routesURL from '../routesURL';
import { history } from '../utils/helpers';
import { alertAction } from './alert.action';
import { commonAction } from './common.action';

export const investmentTrackerActions = {
  investmentTrackerConstantRequest(request, data) {
    return {
      type: investmentTrackerConstant[request],
      data,
    };
  },

  investmentFilterData() {
    return (dispatch) => {
      dispatch(
        this.investmentTrackerConstantRequest(
          'INVESTMENT_TRACKER_FILTER_DATA_REQUEST'
        )
      );
      investmentTrackerService.investmentFilterData().then(
        (investmentFilterData) => {
          if (investmentFilterData !== undefined) {
            if (investmentFilterData.status_code === 200) {
              dispatch(
                this.investmentTrackerConstantRequest(
                  'INVESTMENT_TRACKER_FILTER_DATA_SUCCESS',
                  investmentFilterData
                )
              );
            } else {
              dispatch(
                this.investmentTrackerConstantRequest(
                  'INVESTMENT_TRACKER_FILTER_DATA_FAILURE'
                )
              );
            }
          } else {
            history.push(routesURL.LOGIN);
          }
        },
        (error) => {
          dispatch(
            this.investmentTrackerConstantRequest(
              'INVESTMENT_TRACKER_FILTER_DATA_FAILURE'
            )
          );
        }
      );
    };
  },

  investmentFilterApplyData(filterData) {
    return {
      type: investmentTrackerConstant.INVESTMENT_FILTER_APPLY_DATA,
      filterData,
    };
  },

  filterDataSave(user_id, filter_name, filter_data, filter_type) {
    return (dispatch) => {
      // dispatch(this.investmentTrackerConstantRequest('FILTER_SAVE_REQUEST'));
      investmentTrackerService
        .filterDataSave(user_id, filter_name, filter_data, filter_type)
        .then(
          (investmentFilterSave) => {
            if (investmentFilterSave.success) {
              dispatch(
                this.investmentTrackerConstantRequest(
                  'INVESTMENT_FILTER_SAVE_SUCCESS',
                  investmentFilterSave
                )
              );
              dispatch(commonAction.HIDE_DIALOG(null));
              //history.push(routesURL.BUYER_LIST)
              // dispatch(this.getSavedFilter());
              dispatch(
                commonAction.toastSetUnset({
                  title: 'Success',
                  type: 'success',
                  message: 'Filter save successfully.',
                  show: true,
                })
              );
            } else {
              dispatch(alertAction.error(investmentFilterSave.message));
              dispatch(
                commonAction.toastSetUnset({
                  title: 'Error',
                  type: 'error',
                  message: investmentFilterSave.errorlist,
                  show: true,
                })
              );
            }
          },
          (error) => {
            dispatch(
              commonAction.toastSetUnset({
                title: 'Error',
                type: 'error',
                message: error.message,
                show: true,
              })
            );
          }
        );
    };
  },
  savedInvestmentColumnFilter(column_array, select_column, user_id) {
    return (dispatch) => {
      investmentTrackerService
        .investmentColumnFilterSave(column_array, select_column, user_id)
        .then(
          (getInvestmentFilterColumn) => {
            if (getInvestmentFilterColumn.success) {
              dispatch(
                this.investmentTrackerConstantRequest(
                  'INVESTMENT_COLUMN_FILTER_SAVE_SUCCESS',
                  getInvestmentFilterColumn
                )
              );
              dispatch(commonAction.HIDE_DIALOG(null));
              dispatch(
                commonAction.toastSetUnset({
                  title: 'Success',
                  type: 'success',
                  message: 'Filter save successfully.',
                  show: true,
                })
              );
            } else {
              dispatch(
                commonAction.toastSetUnset({
                  title: 'Error',
                  type: 'error',
                  message: getInvestmentFilterColumn.message,
                  show: true,
                })
              );
            }
          },
          (error) => {
            dispatch(alertAction.error(error.message));
          }
        );
    };
  },

  getSavedFilter(filter_type) {
    return (dispatch) => {
      dispatch(
        this.investmentTrackerConstantRequest(
          'GET_SAVED_FILTER_INVESTMENT_REQUEST'
        )
      );
      investmentTrackerService.getSavedFilter(filter_type).then(
        (savedFilterInvestment) => {
          if (savedFilterInvestment.success) {
            dispatch(
              this.investmentTrackerConstantRequest(
                'GET_SAVED_FILTER_INVESTMENT_SUCCESS',
                savedFilterInvestment
              )
            );
          } else {
            dispatch(
              this.investmentTrackerConstantRequest(
                'GET_SAVED_FILTER_INVESTMENT_FAILURE'
              )
            );
          }
        },
        (error) => {
          dispatch(
            this.investmentTrackerConstantRequest(
              'GET_SAVED_FILTER_INVESTMENT_FAILURE'
            )
          );
        }
      );
    };
  },

  editSavedFilter(filter_type, filter_name, filter_id) {
    return (dispatch) => {
      //dispatch(this.investmentTrackerConstantRequest('EDIT_SAVED_FILTER_REQUEST'));
      investmentTrackerService
        .filterDataEdit(filter_type, filter_name, filter_id)
        .then(
          (editFilter) => {
            if (editFilter.success) {
              dispatch(alertAction.clear());
              dispatch(
                this.investmentTrackerConstantRequest(
                  'INVESTMENT_FILTER_EDIT_SUCCESS',
                  editFilter
                )
              );
              dispatch(commonAction.HIDE_DIALOG(null));
              dispatch(
                commonAction.toastSetUnset({
                  title: 'Success',
                  type: 'success',
                  message: 'Filter name update successfully.',
                  show: true,
                })
              );
            } else {
              dispatch(alertAction.error(editFilter.message));
              // dispatch(commonAction.toastSetUnset({
              //     title: 'Error',
              //     type: 'error',
              //     message: editFilter.errorlist,
              //     show: true
              // }));
            }
          },
          (error) => {
            dispatch(alertAction.error(error.message));
            dispatch(
              commonAction.toastSetUnset({
                title: 'Error',
                type: 'error',
                message: error.message,
                show: true,
              })
            );
          }
        );
    };
  },
  deleteFilter(filter_id) {
    return (dispatch) => {
      investmentTrackerService.filterDataDelete(filter_id).then(
        (deleteFilter) => {
          if (deleteFilter.success) {
            dispatch(alertAction.clear());
            dispatch(
              this.investmentTrackerConstantRequest(
                'INVESTMENT_FILTER_DELETE_SUCCESS',
                deleteFilter
              )
            );
            dispatch(commonAction.HIDE_DIALOG(null));
            dispatch(
              commonAction.toastSetUnset({
                title: 'Success',
                type: 'success',
                message: 'Filter delete successfully.',
                show: true,
              })
            );
          } else {
            dispatch(alertAction.error(deleteFilter.message));
            dispatch(
              commonAction.toastSetUnset({
                title: 'Error',
                type: 'error',
                message: deleteFilter.message,
                show: true,
              })
            );
          }
        },
        (error) => {
          dispatch(
            commonAction.toastSetUnset({
              title: 'Error',
              type: 'error',
              message: error.message,
              show: true,
            })
          );
        }
      );
    };
  },

  getinvestmentColumnFilter(user_id) {
    return (dispatch) => {
      investmentTrackerService.getinvestmentColumnFilter(user_id).then(
        (getInvestmentFilterColumn) => {
          if (getInvestmentFilterColumn.success) {
            dispatch(
              this.investmentTrackerConstantRequest(
                'GET_SAVED_INVESTMENT_COLUMN_SUCCESS',
                getInvestmentFilterColumn
              )
            );
          } else {
            dispatch(
              this.investmentTrackerConstantRequest(
                'GET_SAVED_INVESTMENT_COLUMN_FAILURE'
              )
            );
          }
        },
        (error) => {
          dispatch(
            this.investmentTrackerConstantRequest(
              'GET_SAVED_INVESTMENT_COLUMN_FAILURE'
            )
          );
        }
      );
    };
  },
};
