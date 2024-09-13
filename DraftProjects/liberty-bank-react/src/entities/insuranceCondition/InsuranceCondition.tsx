import { FC, Fragment } from 'react';
import { Icon, Text, Tooltip, TSvgIconNames } from '@/shared';
import { TooltipCostCalc } from '../insuranceTooltips/ui/tooltipCostCalc/TooltipCostCalc';
import styles from './InsuranceCondition.module.scss';
import { ICON_HEIGHT, ICON_WIDTH, TOOLTIP_PARAMS } from './constants';

export interface IInsuranceConditionProps {
  title?: string;
  description: string;
  fixedTooltip?: boolean;
  tooltipPosition?: 'right' | 'left';
  details?: {
    content: {
      title?: string;
      description: string | string[];
    }[];
    costCalc?: boolean;
  };
  icon: string;
  handleAction?: () => void;
}

export interface IInsuranceCondition {
  [type: string]: IInsuranceConditionProps;
}

export const InsuranceCondition: FC<IInsuranceConditionProps> = ({
  title,
  fixedTooltip,
  details,
  description,
  tooltipPosition,
  icon,
  handleAction,
}) => {
  return (
    <div className={styles['condition-item']} key={`condition-${title}`}>
      <div className={styles[`condition-item-inner-${icon}`]}>
        <Icon icon={icon as TSvgIconNames} width={ICON_WIDTH} height={ICON_HEIGHT} />
        <div className={styles['condition-title']}>
          <Text tag='h5' size='m' weight='bold'>
            {title?.split('\n').map((line) => (
              <Fragment key={line}>
                {line}
                <br />
              </Fragment>
            ))}
          </Text>
          {details && (
            <Tooltip
              {...(fixedTooltip && TOOLTIP_PARAMS)}
              className={styles.tooltip}
              positionX={tooltipPosition || 'right'}
              elementTooltip={<Icon icon={'info-circle'} className={styles['info-circle']} />}
            >
              <div className={styles['tooltip-content']}>
                {details.content.map(
                  ({ title: detailsTitle, description: detailsDescription }, i) => (
                    <div className={styles['tooltip-item']} key={`${title}-${detailsTitle}-${i}`}>
                      <Text
                        className={styles['tooltip-itemtooltip-content-title']}
                        tag='h6'
                        weight='bold'
                      >
                        {detailsTitle}
                      </Text>
                      <Text className={styles['tooltip-item-description']} tag='p'>
                        {typeof detailsDescription === 'string' ? (
                          detailsDescription.split('\n').map((line) => (
                            <Fragment key={line}>
                              {line.split(/(\*\*.+?\*\*)/g).map((part, partIndex) =>
                                part.startsWith('**') && part.endsWith('**') ? (
                                  <Text
                                    key={partIndex}
                                    tag='span'
                                    className={styles['tooltip-bold-span']}
                                  >
                                    {part.substring(2, part.length - 2)}
                                  </Text>
                                ) : (
                                  part
                                ),
                              )}
                              <br />
                            </Fragment>
                          ))
                        ) : (
                          <ul className={styles['tooltip-list']}>
                            {detailsDescription.map((item, i) => (
                              <li key={`${title}-item-${i}`}>
                                <Text className={styles['tooltip-item-description']} tag='span'>
                                  {item}
                                </Text>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Text>
                    </div>
                  ),
                )}
                {details.costCalc && <TooltipCostCalc handleClick={handleAction} />}
              </div>
            </Tooltip>
          )}
        </div>
        <Text tag='p' size='s' weight='regular' className={styles['condition-description']}>
          {description}
        </Text>
      </div>
    </div>
  );
};
