import { useState } from 'react';
import { Button, RadioButton, Text, Checkbox, Icon } from '@/shared';
import { branchServes, schedule, services } from './const';
import classNames from 'classnames';
import styles from './MapControlsFilter.module.scss';
import { BranchServes, Schedule, Service } from './types';

interface MapControlsFilterProps {
  branchServes?: BranchServes[];
  schedule?: Schedule[];
  services?: Service[];
  onReset?: () => void;
  onApply?: () => void;
}

export function MapControlsFilter(props: MapControlsFilterProps) {
  const {
    branchServes: branchServesProps,
    schedule: scheduleProps,
    services: servicesProps,
    onReset,
    onApply,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={classNames(styles[`filter-wrapper-${isOpen ? 'open' : 'closed'}`])}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={styles['filter-button']}
        theme='secondary'
      >
        <div className={styles['filter-button-content']}>
          <Icon icon={'filterIcon'} widthAndHeight={'16'} fill={'#000'} />
          Фильтр
        </div>
      </Button>
      {isOpen && (
        <div className={styles['filter-list']}>
          <Text className={styles['branch-serves']} tag='span'>
            Отделение обслуживает
          </Text>

          {branchServesProps
            ? branchServesProps.map(({ type, value, isSelected, onChange }) => (
                <div key={type} className={styles['radio-button']}>
                  <RadioButton
                    width='auto'
                    inputSide='left'
                    name='branch_serves'
                    value={type}
                    checked={isSelected}
                    onChange={() => onChange(type)}
                  />
                  <Text tag='p'>{value}</Text>
                </div>
              ))
            : branchServes.map(({ client }) => {
                return (
                  <div key={client} className={styles['radio-button']}>
                    <RadioButton width='auto' inputSide='left' value={client} name={client} />
                    <Text tag='p'>{client}</Text>
                  </div>
                );
              })}

          <Text className={styles['schedule']} tag='span'>
            Время работы
          </Text>

          {scheduleProps
            ? scheduleProps.map(({ type, isSelected, onClick, value }) => (
                <div key={type} className={styles['checkbox']}>
                  <Checkbox checked={isSelected} name={type} onChange={() => onClick(type)} />
                  <Text className={styles['checkbox-text']} tag='p'>
                    {value}
                  </Text>
                </div>
              ))
            : schedule.map(({ time }) => {
                return (
                  <div key={time} className={styles['checkbox']}>
                    <Checkbox checked={false} name={time} onChange={() => {}} />
                    <Text className={styles['checkbox-text']} tag='p'>
                      {time}
                    </Text>
                  </div>
                );
              })}

          <Text className={styles['schedule']} tag='span'>
            Услуги отделения
          </Text>

          {servicesProps
            ? servicesProps.map(({ type, isSelected, onClick, value }) => (
                <div key={type} className={styles['checkbox']}>
                  <Checkbox checked={isSelected} name={type} onChange={() => onClick(type)} />
                  <Text className={styles['checkbox-text']} tag='p'>
                    {value}
                  </Text>
                </div>
              ))
            : services.map(({ type }) => {
                return (
                  <div key={type} className={styles['checkbox']}>
                    <Checkbox checked={false} name={type} onChange={() => {}} />
                    <Text className={styles['checkbox-text']} tag='p'>
                      {type}
                    </Text>
                  </div>
                );
              })}

          <div className={styles['apply-and-cancel']}>
            <Button theme='primary' onClick={onApply}>
              Применить фильтр
            </Button>
            <Button theme='secondary' onClick={onReset}>
              Сбросить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
