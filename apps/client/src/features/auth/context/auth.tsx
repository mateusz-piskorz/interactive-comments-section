import { useContext, createContext, ReactNode, useState } from 'react';
import { rUser } from '../types/user';

export type AuthContext<UserGuarantee extends boolean = false> = {
  user: UserGuarantee extends true ? rUser : rUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<rUser | undefined>>;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<rUser | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = <ValidateUser extends boolean = false>(
  validateUser?: ValidateUser
): AuthContext<ValidateUser> => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  let result = context as AuthContext<ValidateUser>;

  if (validateUser && !context.user) {
    result = {
      ...context,
      user: {
        color: 'orange',
        avatar: 'avatar1',
        username: 'unknown username',
        id: 'unknown id',
      } as const,
    };
  }

  return result;
};
