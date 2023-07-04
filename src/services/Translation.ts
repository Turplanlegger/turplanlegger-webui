import { useTranslation } from 'react-i18next';

export const useTranslationWrapper = () => {
  const { t } = useTranslation();
  /**
   * Look up key in `react-il18next.useTranslation`.
   *
   * Wrapper to avoid returning `null`.
   *
   * keys match public/locales/{en,no}/translation.json
   * @param {string}  key - Key from translation.json
   * @returns {string | undefined} Value from translation.json or undefined
   */
  return (key: string): string | undefined => t(key) || undefined;
};
