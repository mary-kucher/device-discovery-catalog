import React, {
  Children, ReactNode, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { Icon } from '../Icon';

type Props = {
  label: string,
  children: ReactNode,
  current: string,
  onChange: (value: string) => void,
};

export const Dropdown:React.FC<Props> = ({
  label,
  children,
  onChange,
  current,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const value = ev.currentTarget.innerText;

    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: Event) => {
    if (selectorRef.current
      && !selectorRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={selectorRef}>
      <div className={styles.label}>
        {label}
      </div>
      <button
        type="button"
        className={classNames(styles.select, {
          [styles.open]: isOpen,
        })}
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        {current}
        <Icon className={styles.icon} id={isOpen ? 'arrow-up' : 'arrow-down'} />
      </button>
      {isOpen
          && (
            <div className={styles.list}>
              {
                Children.toArray(children).map((child, i) => (
                  <button
                    type="button"
                    className={styles.option}
                    onClick={handleChange}
                    key={+i}
                  >
                    {child}
                  </button>
                ))
              }
            </div>
          )}
    </div>
  );
};
