import { FC } from '..';

export interface ContainerProps<T extends FC<any, any> | string> {
  children?: T | T[];
}
