import { BACK, HEADER, ITEMS_PER_PAGE, TOTAL_PAGES, MOCK_DATA } from './const';
import styles from './WorkPage.module.scss';
import { FC, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BackButton, Button, Input, InputErrorMessage, Text, Wrapper } from '@/shared';
import WorkFilters from './ui/WorkPageFilters';

const WorkPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPage = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const { control, watch } = useForm({
    defaultValues: { work: '' },
  });
  const [searchError, setSearchError] = useState(false);

  const changeSearchInput = watch('work');

  useEffect(() => {
    if (searchError) {
      setSearchError(false);
    }
  }, [changeSearchInput]);

  return (
    <Wrapper size='l'>
      <div className={styles['work']}>
        <BackButton text={BACK} theme='blue' name='arrow-left-blue' height='24' width='24' />
        <div className={styles['body']}>
          <Text tag='h3' size='xl' weight='bold'>
            {HEADER}
          </Text>
          <form className={styles['form']}>
            <Controller
              control={control}
              name='work'
              render={({ field }) => (
                <Input.Search
                  className={styles['input']}
                  placeholder='Профессия, должность'
                  size='s'
                  {...field}
                  isError={searchError}
                />
              )}
            />
            {searchError && (
              <InputErrorMessage message='Нет данных, удовлетворяющих условию поиска' />
            )}
            <Button className={styles['button']} type='submit'>
              Найти работу
            </Button>
          </form>
          <div className={styles['main']}>
            <WorkFilters />
            <div>
              <div className={styles['results-container']}>
                {MOCK_DATA.slice(startIndex, endIndex).map((data, i) => (
                  <div key={i} className={styles['results']}>
                    <div>
                      <Text tag='p' size='ml' weight='bold'>
                        {data.title}
                      </Text>
                      <Text tag='p' size='ml' weight='bold'>
                        {data.salary}
                      </Text>
                    </div>
                    <Text tag='p' size='s' weight='medium' className={styles['description']}>
                      {data.city}
                    </Text>
                    <Text tag='p' size='s' weight='medium' className={styles['description']}>
                      {data.practice}
                    </Text>
                    <Button type='submit' className={styles['button']}>
                      Откликнуться
                    </Button>
                  </div>
                ))}
              </div>
              <div className={styles['pagination-buttons']}>
                {Array.from({ length: TOTAL_PAGES }, (_, i) => (
                  <Button
                    key={i}
                    theme={i + 1 === currentPage ? 'primary' : 'secondary'}
                    type='submit'
                    onClick={() => handleClickPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                {currentPage > 4 && (
                  <Button onClick={() => handleClickPage(currentPage + 1)}>Дальше</Button>
                )}
              </div>
            </div>
          </div>
          <div className={styles['city-confirm-modal']}>
            модалка с выбором города, в разработке customreact
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WorkPage;
