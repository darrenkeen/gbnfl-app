import { PLATFORM_TYPE } from '../constants';

export const getPlatformType = (platformType: keyof typeof PLATFORM_TYPE) =>
  PLATFORM_TYPE[platformType];
