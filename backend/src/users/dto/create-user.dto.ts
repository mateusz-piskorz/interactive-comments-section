import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Avatar, Color } from '@prisma/client';

const color: Color[] = [
  'burlywood',
  'orange',
  'seagreen',
  'teal',
  'tomato',
  'violet',
];

const avatar: Avatar[] = [
  'avatar1',
  'avatar2',
  'avatar3',
  'avatar4',
  'avatar5',
  'avatar6',
];

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEnum(color, { message: 'valid color required' })
  color: Color;

  @IsEnum(avatar, { message: 'valid avatar required' })
  avatar: Avatar;
}
