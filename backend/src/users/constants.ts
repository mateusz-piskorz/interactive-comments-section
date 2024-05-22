export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const selectUserFields = {
  avatar: true,
  id: true,
  username: true,
  color: true,
};

//15 min
export const JwtExpiresIn = 900;
