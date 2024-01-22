import React from 'react';
import styles from './SearchInput.module.scss';

type Props = {
  areaName: string
  inputValue: string,
  setInputValue: (v: string) => void
};

export const SearchInput: React.FC<Props> = ({
  areaName,
  inputValue,
  setInputValue,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form>
      <input
        className={styles.input}
        placeholder={`Search in ${areaName}...`}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
};
