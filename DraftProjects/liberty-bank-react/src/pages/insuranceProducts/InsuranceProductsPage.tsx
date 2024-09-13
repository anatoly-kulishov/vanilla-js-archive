import { InsuranceCategory } from '@/shared';
import { CATEGORIES } from './constants';
import styles from './InsuranceProductsPage.module.scss';

const InsuranceCategoriesPage = () => {
  return (
    <div className={styles['categories-container']}>
      {CATEGORIES.map((category) => (
        <InsuranceCategory
          key={category.name}
          icon={category.icon}
          name={category.name}
          link={category.link}
        />
      ))}
    </div>
  );
};

export default InsuranceCategoriesPage;
