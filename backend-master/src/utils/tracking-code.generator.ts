const TRACKING_CODE_LENGTH = 12;
const TRACKING_CODE_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateTrackingCode = async (): Promise<string> => {
  const { customAlphabet } = await import('nanoid');
  const nanoid = customAlphabet(TRACKING_CODE_ALPHABET, TRACKING_CODE_LENGTH);
  return nanoid();
};
