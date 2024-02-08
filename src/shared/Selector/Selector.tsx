import React from 'react';
import classNames from 'classnames';
import styles from './Selector.module.scss';

type Props = {
  label: string,
  optionsData: string[]
  current: string,
  onChange: (value: string) => void,
};

export const Selector:React.FC<Props> = ({
  label,
  optionsData = [],
  onChange,
  current,
}) => {
  const handleChange = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = ev.currentTarget;

    onChange(value);
  };

  const colorsSelector = label.includes('colors');

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.list}>
        {
          optionsData.map((option) => (
            colorsSelector
              ? (
                <button
                  type="button"
                  key={option}
                  value={option}
                  className={classNames(styles.optionColorsWrapper,
                    { [styles.selectedColor]: current === option })}
                  onClick={handleChange}
                >
                  <div
                    className={`${styles.optionColor} ${styles[option]}`}
                  />
                </button>
              )
              : (
                <button
                  type="button"
                  key={option}
                  value={option}
                  className={classNames(styles.optionCapacityWrapper,
                    { [styles.selectedCapacity]: current === option })}
                  onClick={handleChange}
                >
                  <div
                    className={`${styles.optionCapacity}`}
                  >
                    {option}
                  </div>
                </button>
              )
          ))
        }
      </div>
    </div>
  );
};
