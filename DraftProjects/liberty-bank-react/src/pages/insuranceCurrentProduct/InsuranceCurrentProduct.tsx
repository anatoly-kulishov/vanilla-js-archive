import {
  BackButton,
  Preloader,
  Text,
  useGetStrapiInsuranceGroupsProductQuery,
  Wrapper,
} from '@/shared';
import { InsuranceList } from '@/widgets/insuranceList';
import { BACK_BTN, PRODUCT_ID, TITLES } from './constants';
import styles from './InsuranceCurrentProduct.module.scss';
import { useParams } from 'react-router-dom';

const InsuranceCurrentProduct = () => {
  const productType = useParams().productType as string;
  const { data, isLoading, isError, isSuccess } = useGetStrapiInsuranceGroupsProductQuery(
    PRODUCT_ID[productType],
  );

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      {isError && 'Что-то пошло не так'}
      {isSuccess && (
        <Wrapper size='l'>
          <div className={styles['wrapper']}>
            <div className={styles['frame']}>
              <div className={styles['containerBackBtn']}>
                <BackButton
                  text={BACK_BTN}
                  theme='blue'
                  name='arrow-left-blue'
                  width='24'
                  height='24'
                />
              </div>
              <div className={styles['containerTitle']}>
                <Text tag='h3' size='m' weight='medium'>
                  {TITLES[productType]}
                </Text>
              </div>
            </div>
            <InsuranceList insuranceData={data.data[0].attributes.Products_name.data} />
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default InsuranceCurrentProduct;
