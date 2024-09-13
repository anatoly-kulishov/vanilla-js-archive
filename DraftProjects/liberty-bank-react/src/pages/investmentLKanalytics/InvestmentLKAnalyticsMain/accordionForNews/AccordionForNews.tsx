import { useState } from 'react';
import styles from './AccordionForNews.module.scss';
import { AccordionItem, INewsItem } from './accordionItem/AccordionItem';

interface IAccordionForNews {
  newsList: INewsItem[];
}
export const AccordionForNews = ({ newsList }: IAccordionForNews) => {
  const [openId, setId] = useState<string>(newsList[0].id);

  return (
    <ul className={styles['accordion']}>
      {newsList.map((item) => {
        const id = item.id;
        return (
          <AccordionItem
            onClick={() => (id !== openId ? setId(id) : setId(openId))}
            item={item}
            isOpen={id === openId}
            key={id}
          />
        );
      })}
    </ul>
  );
};
