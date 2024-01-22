import { useNavigate } from 'react-router';
import { Icon } from '../Icon';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.text}
      onClick={() => navigate(-1)}
      data-cy="backButton"
    >
      <Icon className={styles.icon} id="arrow-left" />
      Back
    </button>
  );
};
