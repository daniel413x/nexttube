import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { logout } from '@store/actions/authActions';
import { RootStateType } from '@store/rootReducer';
import { toastError, toastWarn } from '@utils';

const rtkQueryErrorLogger: Middleware<{}, RootStateType> =
  (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if ((action.payload as any).data?.message === 'Invalid token') {
        api.dispatch(logout() as any);
        toastWarn('Token expired', 'Re-log in', 7000);
        return next(action);
      }
      toastError(action.error, 'RTK error');
    }
    return next(action);
  };

export default rtkQueryErrorLogger;
