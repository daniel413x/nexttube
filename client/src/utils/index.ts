import { BasicToastrOptions, toastr } from 'react-redux-toastr';
import { ISerializedError, IUser } from '@types';

export const errorCatch = (error: any): string => {
  if (error.response && error.response.data) {
    if (typeof error.response.data.message === 'object') {
      return error.response.data.message[0];
    }
    return error.response.data.message;
  }
  return error.message;
};

export const toastSuccess = (
  message: string,
  options?: BasicToastrOptions,
  title = 'Success'
) => {
  toastr.success(title, message, options);
};

export const toastWarn = (
  message: string,
  options?: BasicToastrOptions,
  title = 'Warning'
) => {
  toastr.warning(title, message, options);
};

export const toastError = (
  error: any,
  options?: BasicToastrOptions,
  title = 'Error'
) => {
  toastr.error(title, typeof error === 'string' ? error : errorCatch(error), {
    ...options,
    timeOut: options?.timeOut || 6000,
  });
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

// for writing css rules for a child component from a parent component's scss module file. caveat: selector chain must exist in child component scss file, e.g.: ChannelInfoSmall.module.scss .channelInfoSmall { ... .name { ... } ... } then this becomes possible: CommentItem.module.scss .commentItem { .channelInfoSmall { ... .name { ... } ... } }
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
  for (let k = 0; k < defaultStylesKeys.length; k += 1) {
    const dk = defaultStylesKeys[k];
    if (parentStylesKeys.indexOf(dk) >= 0) {
      newStylesObj[dk] = `${defaultStyles[dk]} ${parentStyles[dk]}`;
    } else {
      newStylesObj[dk] = defaultStyles[dk];
    }
  }
  for (let k = 0; k < parentStylesKeys.length; k += 1) {
    if (defaultStylesKeys.indexOf(parentStylesKeys[k]) === -1) {
      newStylesObj[k] = parentStylesKeys[k];
    }
  }
  const newStylesKeys = Object.keys(newStylesObj);
  if (newStylesKeys.length === 0) {
    return defaultStyles;
  }
  return newStylesObj;
};

export const createUserDto = (user: IUser) => {
  const { description, avatarPath, email, username, id, flags } = user;
  return {
    description,
    avatarPath,
    email,
    username,
    id,
    flags,
  };
};

export function getMaxPage(itemsInDb: number, itemsPerPage: number) {
  return Math.ceil(itemsInDb / itemsPerPage);
}
