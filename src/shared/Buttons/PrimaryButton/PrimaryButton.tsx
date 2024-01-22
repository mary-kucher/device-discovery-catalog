import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import styles from './PrimaryButton.module.scss';

// eslint-disable-next-line max-len
interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode,
  className?: string,
  isSelected?: boolean,
}

export const PrimaryButton: React.FC<Props> = ({
  children,
  className,
  isSelected,
  ...props
}) => {
  return (
    <button
      type="button"
      className={classNames(styles.button, className, {
        [styles.selected]: isSelected,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

PrimaryButton.defaultProps = {
  className: '',
  isSelected: false,
};
