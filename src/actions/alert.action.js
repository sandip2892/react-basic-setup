import { alertConstant } from '../constants';

export const alertAction = {
  success(message) {
    return { type: alertConstant.SUCCESS, message };
  },
  error(message) {
    return { type: alertConstant.ERROR, message };
  },
  clear() {
    return { type: alertConstant.CLEAR };
  },
};
