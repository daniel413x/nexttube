import cn from 'classnames';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Children } from '@types';
import Button from './Button';
import styles from './CopyButton.module.scss';
import IconSpan from './IconSpan';
import Popup from './Popup';

interface CopyButtonProps {
  copyText: string;
  label?: string;
  className?: string;
  children?: Children;
}

const CopyButton = ({
  copyText,
  label,
  className,
  children,
}: CopyButtonProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const copy = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 0);
    navigator.clipboard.writeText(copyText);
  };
  return (
    <Button
      className={cn(styles.copyButton, className, {
        [styles.clicked]: clicked,
      })}
      color="blank"
      onClick={() => copy()}
    >
      <Popup className={styles.popup} boolean={clicked}>
        <IconSpan className={styles.checkIcon} Icon={FaCheck} />
        Copied to clipboard
      </Popup>
      {label}
      {children as any}
    </Button>
  );
};

CopyButton.defaultProps = {
  label: '',
  children: undefined,
  className: '',
};

export default CopyButton;
