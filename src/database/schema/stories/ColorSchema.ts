import { ObjectSchema } from 'realm';

export const ColorSchema: ObjectSchema = {
  name: 'ColorSchema',
  properties: {
    background: 'string',
    detail: 'string',
    primary: 'string',
    secondary: 'string',
  },
};
