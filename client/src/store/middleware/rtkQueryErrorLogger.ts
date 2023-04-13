import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { toastError } from '@utils';

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toastError(action.error, 'RTK error');
  }
  return next(action);
};

export default rtkQueryErrorLogger;
