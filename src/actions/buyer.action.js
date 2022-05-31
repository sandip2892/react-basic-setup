import { buyerListService } from '../services';
import { buyerConstant } from '../constants';
import { alertAction } from './alert.action';
import { commonAction } from './common.action';

export const buyerActions = {
  buyerConstantRequest(request, data) {
    return {
      type: buyerConstant[request],
      data,
    };
  },
  // get daynamic data for buyer filter field
  buyerFilterData() {
    return (dispatch) => {
      dispatch(this.buyerConstantRequest('BUYER_FILTER_DATA_REQUEST'));
      buyerListService.buyerFilterData().then(
        (buyerFilterData) => {
          if (!!buyerFilterData && buyerFilterData.status_code === 200) {
            dispatch(
              this.buyerConstantRequest(
                'BUYER_FILTER_DATA_SUCCESS',
                buyerFilterData
              )
            );
          } else {
            dispatch(
              commonAction.toastSetUnset({
                type: 'error',
                title: 'Error',
                message: buyerFilterData.message,
                show: true,
              })
            );
          }
        },
        (error) => {
          dispatch(this.buyerConstantRequest('BUYER_FILTER_DATA_FAILURE'));
        }
      );
    };
  },

  //save buyer filter data
  filterDataSave(user_id, filter_name, filter_data, filter_type) {
    return (dispatch) => {
      // dispatch(this.buyerConstantRequest('FILTER_SAVE_REQUEST'));
      buyerListService
        .filterDataSave(user_id, filter_name, filter_data, filter_type)
        .then(
          (buyerFilterSave) => {
            if (buyerFilterSave.status) {
              dispatch(
                this.buyerConstantRequest(
                  'FILTER_SAVE_SUCCESS',
                  buyerFilterSave
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
              dispatch(
                commonAction.toastSetUnset({
                  type: 'error',
                  title: 'Error',
                  message: buyerFilterSave.message,
                  show: true,
                })
              );
              // dispatch(this.buyerConstantRequest('FILTER_SAVE_FAILURE'));
            }
          },
          (error) => {
            dispatch(
              commonAction.toastSetUnset({
                type: 'error',
                title: 'Error',
                message: error.message,
                show: true,
              })
            );
            // dispatch(this.buyerConstantRequest('FILTER_SAVE_FAILURE'));
          }
        );
    };
  },

  getSavedFilter() {
    return (dispatch) => {
      dispatch(this.buyerConstantRequest('GET_SAVED_FILTER_REQUEST'));
      buyerListService.getSavedFilter().then(
        (savedFilter) => {
          if (savedFilter.status) {
            dispatch(
              this.buyerConstantRequest('GET_SAVED_FILTER_SUCCESS', savedFilter)
            );
          } else {
            dispatch(this.buyerConstantRequest('GET_SAVED_FILTER_FAILURE'));
          }
        },
        (error) => {
          dispatch(this.buyerConstantRequest('GET_SAVED_FILTER_FAILURE'));
        }
      );
    };
  },

  editSavedFilter(filter_name, filter_id) {
    return (dispatch) => {
      //dispatch(this.buyerConstantRequest('EDIT_SAVED_FILTER_REQUEST'));
      buyerListService.filterDataEdit(filter_name, filter_id).then(
        (editFilter) => {
          if (editFilter.status) {
            dispatch(alertAction.clear());
            dispatch(
              this.buyerConstantRequest('FILTER_EDIT_SUCCESS', editFilter)
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
            //dispatch(this.buyerConstantRequest('EDIT_SAVED_FILTER_FAILURE'));
          }
        },
        (error) => {
          dispatch(alertAction.error(error.message));
          //dispatch(this.buyerConstantRequest('EDIT_SAVED_FILTER_FAILURE'));
        }
      );
    };
  },

  deleteFilter(filter_id) {
    return (dispatch) => {
      //dispatch(this.buyerConstantRequest('EDIT_SAVED_FILTER_REQUEST'));
      buyerListService.filterDataDelete(filter_id).then(
        (deleteFilter) => {
          if (deleteFilter.status) {
            dispatch(alertAction.clear());
            dispatch(
              this.buyerConstantRequest('FILTER_DELETE_SUCCESS', deleteFilter)
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
            //dispatch(this.buyerConstantRequest('EDIT_SAVED_FILTER_FAILURE'));
          }
        },
        (error) => {
          dispatch(alertAction.error(error.message));
          //dispatch(this.buyerConstantRequest('EDIT_SAVED_FILTER_FAILURE'));
        }
      );
    };
  },

  // get buyer filter card data
  buyerCardView(filter_data, loadMoredata) {
    return (dispatch) => {
      dispatch(this.buyerConstantRequest('BUYER_CARD_VIEW_REQUEST'));
      buyerListService.buyerListCardView(filter_data).then(
        (buyerCardView) => {
          if (buyerCardView.status_code) {
            let load_more = false;
            if (loadMoredata !== undefined) {
              load_more = true;
            }
            dispatch(
              this.buyerConstantRequest('BUYER_CARD_VIEW_SUCCESS', {
                buyerCardView,
                loadMore: load_more,
              })
            );
            //history.push(routesURL.BUYER_LIST)
          } else {
            dispatch(this.buyerConstantRequest('BUYER_CARD_VIEW_FAILURE'));
          }
        },
        (error) => {
          dispatch(this.buyerConstantRequest('BUYER_CARD_VIEW_FAILURE'));
        }
      );
    };
  },

  currentFilterApplyData(filterData) {
    return { type: buyerConstant.CURRENT_FILTER_APPLY_DATA, filterData };
  },
};
