import * as authActions from './authActions';
import * as userActions from './userActions';
import * as utilActions from './utilActions';

export default {
  ...authActions,
  ...userActions,
  ...utilActions,
};
