import { Link, Text } from '@/shared';
import styles from './newsCard.module.scss';

interface Props {
  tags: string[];
  image: string;
  title: string;
  description: string;
  instant: number;
}

export function NewsCard({ tags, image, title, description, instant }: Props) {
  const tagElements = tags.map((ele) => (
    <Text tag='span' key={ele} className={styles.tag}>
      {ele}
    </Text>
  ));
  const date = new Date(instant).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className={styles.card}>
      <div className={styles.tags}>{tagElements}</div>
      <div className={styles.content}>
        <img src={image} className={styles.image} />
        <div className={styles.news}>
          <Text tag='h2' className={styles.header}>
            {title}
          </Text>
          <Text tag='p' className={styles.brief}>
            {description}
          </Text>
        </div>
      </div>
      <div className={styles.footer}>
        <Link to='#'>Подробнее</Link>
        <Text tag='p'>{date}</Text>
      </div>
    </article>
  );
}
