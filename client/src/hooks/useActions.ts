import { bindActionCreators } from '@reduxjs/toolkit';
import rootAction from '@store/rootAction';
import { useDispatch } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  return bindActionCreators(rootAction, dispatch);
};
