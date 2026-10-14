import { IConfigToLib } from "tool-config-to-lib-ang15";

export const configFromApp: IConfigToLib = {
  apiUrl: 'https://api.example.com',
  log: (m: any) => console.log('!!! Из приложения конфиг - ', m)
};
