import { FC } from 'react';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { uploadDayEmployee, uploadDayHandling } from 'utils/api/uploads';
import './styles.less';
import CardLoader from './CardLoader';

const className = cn('upload-from-wd-page');

const UploadFromWdPage: FC = () => {
  const viewItems = [
    {
      key: 'upload_hits_number',
      title: 'Загрузка количества обращений',
      uploadMethod: uploadDayHandling,
    },
    {
      key: 'upload_employees_number',
      title: 'Загрузка количества сотрудников',
      uploadMethod: uploadDayEmployee,
    },
  ];

  return (
    <div className={className()}>
      <div className={className('wrapper')}>
        {viewItems.map((item) => (
          <CardLoader
            key={item.key}
            title={item.title}
            uploadMethod={item.uploadMethod}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadFromWdPage;
