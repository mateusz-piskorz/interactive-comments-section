/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useEffect, useRef } from 'react';
import c from './main.module.scss';
import arrowRight from '@/assets/arrow-right.svg';
import { tsr } from '@/global/utils/ts-client';

type Props = {
  parentId: string;
  operation: 'edit' | 'add';
  fixedPosition?: boolean;
  onSubmit?: () => void;
  initialContent?: string;
};

export const Form = ({
  parentId,
  operation,
  fixedPosition,
  onSubmit,
  initialContent,
}: Props) => {
  const input = useRef<HTMLSpanElement>(null);
  const FormClassName = `${c.Form}${` ${fixedPosition ? c.Form___fixed : ''}`}`;

  const addMutation = tsr.comments.createNewComment.useMutation({
    mutationKey: ['createNewComment'],
    onSuccess: () => {
      input.current!.innerText = '';
      onSubmit && onSubmit();
    },
  });

  const editMutation = tsr.comments.editComment.useMutation({
    onSuccess: onSubmit,
    mutationKey: ['editComment'],
  });

  const { status } = operation === 'add' ? addMutation : editMutation;

  const submitHandler = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const content = input.current!.innerText?.replace(
      /(\r\n|\n|\r){2,}/gm,
      '\n\n'
    );
    if (!content || content === '') return;
    if (operation === 'add') {
      addMutation.mutate({ body: { content, parentId, bookId: 'bookIdTest' } });
    } else {
      editMutation.mutate({ body: { content }, params: { id: parentId } });
    }
  };

  useEffect(() => {
    if (!input.current) return;
    const inputRef = input.current;
    inputRef.textContent = initialContent || '';

    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.code === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        submitHandler();
      }
    };

    inputRef.addEventListener('keydown', keyDownHandler);
    return () => {
      inputRef.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <form className={FormClassName} onSubmit={submitHandler}>
      <span
        autoFocus
        ref={input}
        className={c.Form_input}
        role="textbox"
        contentEditable
      />
      <button
        type="submit"
        className={c.Form_button}
        disabled={status === 'pending'}
      >
        <img src={arrowRight} alt="send icon" />
      </button>
    </form>
  );
};
