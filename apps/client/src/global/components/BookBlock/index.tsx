import c from './main.module.scss';
import { Calendar, BookText, UserPen } from 'lucide-react';
import { Link } from '@tanstack/react-router';

type Props = {
  cover: string;
  title: string;
  release_date: string;
  pages: number;
  author: string;
  slug: string;
};

export const BookBlock = ({
  author,
  cover,
  pages,
  release_date,
  title,
  slug,
}: Props) => {
  return (
    <div className={c.BookBlock}>
      <img className={c.BookBlock_cover} alt={`${title} cover`} src={cover} />
      <div className={c.BookBlock_infoBox}>
        <h1>{title}</h1>
        <div>
          <Calendar width={14} /> {release_date}
        </div>
        <div>
          <BookText width={13} /> {pages}
        </div>
        <div>
          <UserPen width={13} /> {author}
        </div>
        <Link to={`/books/${slug}`}>
          <button>View Book</button>
        </Link>
      </div>
    </div>
  );
};
