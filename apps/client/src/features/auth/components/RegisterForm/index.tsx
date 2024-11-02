import c from './main.module.scss';
import { RadioInputAvatar } from './RadioInputAvatar';
import { RadioInputColor } from './RadioInputColor';
import { RegisterFormSchema, registerFormSchema } from '../../zod/registerForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, Color } from '@prisma/client';
import { useNavigate } from '@tanstack/react-router';
import { isUnknownErrorResponse } from '@ts-rest/react-query/v5';
import { toast } from 'sonner';
import { LS_PASSWORD, LS_USERNAME } from '@/global/constants/localStorage';
import { ErrorText } from '@/global/components/ErrorText';
import { tsr } from '@/global/utils/ts-client';

export const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate, contractEndpoint } = tsr.users.createNewUser.useMutation({
    mutationKey: ['createNewUser'],
    onSuccess: ({ body: { username, password } }) => {
      localStorage.setItem(LS_USERNAME, username);
      localStorage.setItem(LS_PASSWORD, password);
      navigate({ to: '/' });
    },
    onError: (error) => {
      if (isUnknownErrorResponse(error, contractEndpoint)) {
        toast.error('something wrong');
        return;
      }

      if ('status' in error) {
        const { message } = error.body;
        toast.error(message);
        if (error.status === 409) {
          form.setError('username', { message });
        }
        return;
      }

      toast.error(error.message);
    },
  });

  const { avatar, color, username } = form.formState.errors;
  const selectedAvatar = form.watch('avatar');
  const selectedColor = form.watch('color');

  return (
    <form
      onSubmit={form.handleSubmit((formData) =>
        mutate({ body: { ...formData } })
      )}
      className={c.Form}
    >
      <div>
        <label className={c.Form_nameLabel}>
          Name
          <input
            autoFocus
            {...form.register('username')}
            className={c.Form_input}
            type="text"
          />
        </label>
        <ErrorText error={username?.message} />
      </div>

      <fieldset className={c.Form_fieldset}>
        <legend>Avatar</legend>
        {Object.values(Avatar).map((avatar) => {
          return (
            <RadioInputAvatar
              key={avatar}
              displayedAvatar={avatar}
              isSelected={avatar === selectedAvatar}
              name="avatar"
              register={form.register}
            />
          );
        })}
        <ErrorText error={avatar?.message} />
      </fieldset>

      <fieldset className={c.Form_fieldset}>
        <legend>Color</legend>
        {Object.values(Color).map((color) => {
          return (
            <RadioInputColor
              key={color}
              displayedColor={color}
              isSelected={color === selectedColor}
              name="color"
              register={form.register}
              errorMessage={form.formState.errors.color?.message}
            />
          );
        })}
        <ErrorText error={color?.message} />
      </fieldset>

      <button
        type="submit"
        className={c.Form_button}
        disabled={form.formState.isSubmitting}
      >
        Create Account
      </button>
    </form>
  );
};
