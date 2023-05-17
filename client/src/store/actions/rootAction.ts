import * as authActions from './authActions';
import * as userActions from './userActions';
import * as utilActions from './utilActions';
import * as videoActions from './videoActions';

export default {
  ...authActions,
  ...userActions,
  ...utilActions,
  ...videoActions,
};
