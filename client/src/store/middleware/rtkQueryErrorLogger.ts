import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { logout } from '@store/actions/authActions';
import { RootStateType } from '@store/rootReducer';
import { toastError, toastWarn } from '@utils';

const rtkQueryErrorLogger: Middleware<{}, RootStateType> =
  (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if ((action.payload as any).data?.message === 'Invalid token') {
        api.dispatch(logout() as any);
        toastWarn('Re-log in', 'Token expired', 6000);
        return next(action);
      }
      toastError(action.error);
    }
    return next(action);
  };

export default rtkQueryErrorLogger;
