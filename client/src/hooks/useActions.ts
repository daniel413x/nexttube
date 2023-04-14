import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootAction from '@store/rootAction';

export default () => {
  const dispatch = useDispatch();
  return bindActionCreators(rootAction, dispatch);
};
