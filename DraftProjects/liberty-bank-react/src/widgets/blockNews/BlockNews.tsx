import styles from './BlockNews.module.scss';
import { Text, Link } from '@/shared';
import image from '@/shared/ui/icon/assets/images/image.png';
import React from 'react';

export const ARRAY_NEWS = [
  {
    path: '/',
    src: image,
    name: 'image',
    description: 'Сегодня изменился курс валют',
    time: '08:44',
  },
  {
    path: '/',
    src: image,
    name: 'image',
    description: 'Сегодня изменился курс валют',
    time: '08:44',
  },
  {
    path: '/',
    src: image,
    name: 'image',
    description: 'Сегодня изменился курс валют',
    time: '08:44',
  },
  {
    path: '/',
    src: image,
    name: 'image',
    description: 'Сегодня изменился курс валют',
    time: '08:44',
  },
  {
    path: '/',
    src: image,
    name: 'image',
    description: 'Сегодня изменился курс валют',
    time: '08:44',
  },
];

export const BlockNews = () => {
  return (
    <div className={styles.content__news}>
      <div className={styles.content__news_body}>
        {ARRAY_NEWS.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Link to={item.path}>
                <div className={styles.body__content}>
                  <div className={styles.body__content_image}>
                    <img className={styles.image__img} src={item.src} alt={item.name} />
                  </div>
                  <Text tag={'p'} className={styles.body__content_text}>
                    {item.description}
                  </Text>
                  <Text tag={'p'} className={styles.body__content_time}>
                    {item.time}
                  </Text>
                </div>
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
