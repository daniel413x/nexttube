import { toastr } from 'react-redux-toastr';
import { ISerializedError } from '@types';

export const errorCatch = (error: any): string => {
  if (error.response && error.response.data) {
    if (typeof error.response.data.message === 'object') {
      return error.response.data.message[0];
    }
    return error.response.data.message;
  }
  return error.message;
};

export const toastError = (error: any, title = 'Error request') => {
  const message = errorCatch(error);
  toastr.error(title, message);
};

export const serializeError = (error: any) => {
  const serializedError: ISerializedError = {};
  if (error.message) {
    serializedError.message = error.message;
  }
  if (error.response.data) {
    serializedError.response = {
      data: error.response.data,
    };
  }
  return serializedError;
};

export const formatNumber = (number: number): string | number => {
  if (number >= 1000000000) {
    return `${(number / 1000000000).toFixed(1).replace(/\.0$/, '')}G`;
  }
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return number;
};

// to easily write css rules for a child component from a parent component's scss module file
export const cobbleStyles = (
  defaultStyles: Record<string, string>,
  parentStyles: Record<string, string> | undefined
) => {
  if (!parentStyles) {
    return defaultStyles;
  }
  const defaultStylesKeys = Object.keys(defaultStyles);
  const parentStylesKeys = Object.keys(parentStyles);
  const newStylesObj: Record<string, string> = {};
  for (let pk = 0; pk < parentStylesKeys.length; pk += 1) {
    if (defaultStylesKeys.indexOf(parentStylesKeys[pk]) >= 0) {
      newStylesObj[parentStylesKeys[pk]] = `${
        defaultStyles[parentStylesKeys[pk]]
      } ${parentStyles[parentStylesKeys[pk]]}`;
    }
  }
  return newStylesObj;
};
