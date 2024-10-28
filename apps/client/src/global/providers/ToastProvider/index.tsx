import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { useSearch } from '@tanstack/react-router';

export const ToastProvider = () => {
  const searchParams = useSearch({ from: '__root__' });
  const { toastMsg } = searchParams;

  useEffect(() => {
    const { message, type } = toastMsg;
    if (message === '') return;

    switch (type) {
      case 'success': {
        toast.success(message);
        return;
      }

      case 'error': {
        toast.error(message);
        return;
      }

      default: {
        toast.info(message);
        return;
      }
    }
  }, [toastMsg]);

  return <Toaster />;
};
