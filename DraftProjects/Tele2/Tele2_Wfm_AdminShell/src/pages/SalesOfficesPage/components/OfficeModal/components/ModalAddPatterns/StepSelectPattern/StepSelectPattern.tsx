import {
  FC,
  lazy,
  useCallback,
  useState,
  useMemo,
} from 'react';
import {
  Input,
  Form,
  Button,
  Spin,
  Typography,
  Empty,
} from 'antd';
import { useInfiniteQuery } from 'react-query';
import isNil from 'lodash.isnil';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { getAllPatterns, setPattern } from 'utils/api/offices';

import './styles.less';
import PatternsResponse from 'types/response/patterns';
import ModalAddPatterns from 'types/modalAddPatterns';

const { useForm, Item } = Form;
const { Text } = Typography;

// @ts-ignore
const ScrollBlock = lazy(() => import('tele2_wfm_uilibraryapp/components/ScrollBlock'));

const className = cn('step-select-pattern');

type FormState = {
  description?: string;
};

const pageSize = 20;

const StepSelectPattern: FC<ModalAddPatterns.StepProps> = ({
  onChangeStep,
  officeId,
  onClose,
}) => {
  const [formState] = useForm<FormState>();
  const officeModalForm = Form.useFormInstance();

  const [description, setDescription] = useState('');
  const [
    activePattern,
    setActivePattern,
  ] = useState<PatternsResponse.ShortPattern | undefined>(undefined);
  const [isLoadAllPatters, setIsLoadAllPatterns] = useState<boolean>(false);
  const [processSaving, setProcessSaving] = useState(false);

  const activeSearchKey = useMemo(() => (['patterns', description]), [description]);

  const {
    data: patternPages,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery<PatternsResponse.ShortPattern[]>({
    queryKey: activeSearchKey,
    queryFn: ({ pageParam = 0 }) => (
      !isLoadAllPatters ? (
        getAllPatterns({
          Description: description,
          PageIndex: pageParam + 1,
          PageSize: pageSize,
        }).then((response) => {
          setIsLoadAllPatterns(false);

          if (!response?.data || !response.data.length) {
            setIsLoadAllPatterns(true);
            return [];
          }

          if (response.data.length < pageSize) {
            setIsLoadAllPatterns(true);
          }

          return response.data;
        })
      ) : []
    ),
    enabled: !isLoadAllPatters,
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  const patterns = useMemo(() => (
    patternPages?.pages?.reduce<PatternsResponse.ShortPattern[]>((list, page) => {
      page.forEach((item) => {
        list.push(item);
      });

      return list;
    }, []) ?? []
  ), [patternPages]);

  const handleNameKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      formState.submit();
    }
  }, [formState]);

  const handleClear = useCallback(() => {
    formState.resetFields();
    formState.submit();
  }, [formState]);

  const handleFinish = useCallback((values: FormState) => {
    setIsLoadAllPatterns(false);
    setActivePattern(undefined);
    setDescription(values?.description || '');
  }, [setDescription]);

  const handleSavePattern = useCallback(() => {
    if (activePattern) {
      setProcessSaving(true);

      const formValues = officeModalForm.getFieldsValue();
      setPattern(officeId, {
        WorkTimePatternId: activePattern.patternId,
        Description: activePattern.description,
        officeCoordinateLatitude: +formValues?.officeCoordinateLatitude ?? undefined,
        officeCoordinateLongitude: +formValues?.officeCoordinateLongitude ?? undefined,
      })
        .then((responseSet) => {
          if (responseSet !== undefined) {
            onClose(activePattern.patternId);
          }
        })
        .finally(() => setProcessSaving(false));
    }
  }, [activePattern, officeModalForm, officeId, onClose]);

  return (
    <div className={className()}>
      <ScrollBlock
        className={className('body')}
        active={!isLoadAllPatters && !isFetching}
        onScrollToButtom={fetchNextPage}
      >
        <div className={className('title')}>
          <Form
            form={formState}
            name="searchPatterns"
            layout="vertical"
            onFinish={handleFinish}
            className={className('filters-form')}
          >
            <div className={className('filters')}>
              <Item name="description" label="Описание">
                <Input
                  allowClear
                  onKeyDown={handleNameKeyDown}
                />
              </Item>
            </div>
            <div className={className('toolbar')}>
              <Button htmlType="submit" type="primary">Найти</Button>
              <Button onClick={handleClear}>Сбросить</Button>
            </div>
          </Form>
          <Button
            type="primary"
            onClick={() => onChangeStep('create')}
          >
            Создать новый шаблон
          </Button>
        </div>
        <div
          className={className('patterns-list')}
        >
          <Spin size="large" spinning={isFetching || processSaving}>
            {patterns && patterns.length > 0 ? patterns.map((pattern, index) => (
              <div
                className={className('pattern', { active: activePattern?.patternId === pattern.patternId })}
                key={`pattern-${pattern.patternId}`}
                onClick={() => setActivePattern(pattern)}
                role="menuitem"
                tabIndex={index}
                onKeyDown={undefined}
              >
                <Text>{pattern.description}</Text>
              </div>
            )) : (
              <Empty
                description={
                  <Text>Ничего не найдено. Попробуйте изменить текст поиска</Text>
                }
              />
            )}
          </Spin>
        </div>
      </ScrollBlock>
      <div className={className('footer')}>
        <Button
          type="primary"
          disabled={isNil(activePattern) || processSaving}
          onClick={handleSavePattern}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default StepSelectPattern;
