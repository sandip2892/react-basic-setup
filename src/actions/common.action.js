import { commonConstant } from '../constants';

export const commonAction = {
  SHOW_MENU() {
    return { type: commonConstant.LEFTMENU_SHOW };
  },
  HIDE_MENU() {
    return { type: commonConstant.LEFTMENU_HIDE };
  },

  toastSetUnset(toastData) {
    return { type: commonConstant.TOAST_DATA, toastData };
  },

  SHOW_LOADER() {
    return { type: commonConstant.SHOW_LOADER };
  },
  HIDE_LOADER() {
    return { type: commonConstant.HIDE_LOADER };
  },

  BUYER_FILTER_TOGGLE() {
    return { type: commonConstant.BUYER_FILTER_TOGGLE };
  },

  SAVED_FILTER_TOGGLE() {
    return { type: commonConstant.SAVED_FILTER_TOGGLE };
  },

  SHOW_DIALOG(data) {
    return { type: commonConstant.SHOW_DIALOG, data };
  },
  HIDE_DIALOG(data) {
    return { type: commonConstant.HIDE_DIALOG, data };
  },
  INVESTMENT_FILTER_TOGGLE() {
    return { type: commonConstant.INVESTMENT_FILTER_TOGGLE };
  },

  TOGGLE_SIDEPANEL(data) {
    return { type: commonConstant.TOGGLE_SIDEPANEL, data };
  },
};
