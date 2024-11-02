import { createContext, useContext, ReactNode } from 'react';

const BookSlugContext = createContext<{
  bookSlug: string;
} | null>(null);

type Props = {
  children: ReactNode;
  bookSlug: string;
};

export const BookSlugProvider = ({ children, bookSlug }: Props) => {
  return (
    <BookSlugContext.Provider value={{ bookSlug }}>
      {children}
    </BookSlugContext.Provider>
  );
};

export const useBookSlug = () => {
  const context = useContext(BookSlugContext);
  if (!context) {
    throw new Error('useBookSlug must be used within a BookSlugProvider');
  }
  return context;
};
