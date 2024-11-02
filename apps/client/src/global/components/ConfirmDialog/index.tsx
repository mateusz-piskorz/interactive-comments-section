import { useEffect, useRef, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import c from './main.module.scss';

type Props = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  onConfirm: () => Promise<void>;
  description: string;
};

export const ConfirmDialog = ({
  setOpen,
  open,
  onConfirm,
  description,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const { current } = dialogRef;
    if (!current) return;
    current[open ? 'showModal' : 'close']();
  }, [open]);

  const confirmHandler = async () => {
    setLoading(true);
    await onConfirm();
    setOpen(false);
    setLoading(false);
  };

  return (
    <RemoveScroll>
      <dialog
        className={c.ConfirmDialog}
        ref={dialogRef}
        onCancel={() => setOpen(false)}
      >
        <p>{description}</p>
        <button autoFocus onClick={confirmHandler} disabled={loading}>
          confirm
        </button>
        <button onClick={() => setOpen(false)} disabled={loading}>
          cancel
        </button>
        <button
          className={c.ConfirmDialog_xBtn}
          onClick={() => setOpen(false)}
          disabled={loading}
        >
          x
        </button>
      </dialog>
    </RemoveScroll>
  );
};
