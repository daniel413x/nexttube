import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { logout } from '@store/actions/authActions';
import { RootStateType } from '@store/rootReducer';
import { toastError } from '@utils';

const rtkQueryErrorLogger: Middleware<{}, RootStateType> =
  (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      toastError(action.error, 'RTK error');
      if ((action.payload as any).data.message === 'Invalid token') {
        api.dispatch(logout as any);
      }
    }
    return next(action);
  };

export default rtkQueryErrorLogger;
