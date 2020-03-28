import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback((text) => {
    if (global.M && text) {
      global.M.toast({ html: text });
    }
  }, []);
};
