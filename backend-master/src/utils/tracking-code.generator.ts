const TRACKING_CODE_LENGTH = 12;
const TRACKING_CODE_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateTrackingCode = (): string => {
  let result = '';
  const alphabetLength = TRACKING_CODE_ALPHABET.length;

  for (let i = 0; i < TRACKING_CODE_LENGTH; i++) {
    result += TRACKING_CODE_ALPHABET.charAt(
      Math.floor(Math.random() * alphabetLength),
    );
  }

  return result;
};
