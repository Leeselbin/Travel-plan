export const ERROR_MESSAGES: { [key: string]: string } = {
  '401': '인증이 실패하였습니다.',
  '404': '데이터를 찾을 수 없습니다.',
  '500': '서버 오류가 발생하였습니다.',
  default: '오류가 발생하였습니다.',
};

export const ErrorCode = {
  FAIL: 'ESYS000',
  INVALID_INPUT: 'ESYS001',
  INTERNAL: 'ESYS002',
  FILE_NOT_FOUND: 'ESYS003',
  PAGE_NOT_FOUND: 'ESYS004',
  BAD_REQUEST: 'ESYS005',
  NO_SESSION: 'ESYS006',
  NO_URL_AUTH: 'ESYS007',
  NO_DATA_AUTH: 'ESYS008',
  EXCEL_NO_FILENAME: 'ESYS009',
  EXCEL_NO_DATA: 'ESYS010',
  EXCEL_NO_COLUMN: 'ESYS011',
  EXCEL_NO_MATCH_DATA: 'ESYS012',
  EXCEL_EXCEED_MAX_SIZE: 'ESYS013',
  EXCEL_NOT_FOUND: 'ESYS014',
  EXCEL_CREATION_ERROR: 'ESYS015',
  EXCEL_CONVERT_ERROR: 'ESYS016',
  MISS_REQUIRED_COLUMN: 'ESYS017',
  ACCESS_TOKEN_EXPIRE: 'ESYS018',
  REFRESH_TOKEN_EXPIRE: 'ESYS019'
};

export const isError = (errorCode: string): boolean => {
  return Object.values(ErrorCode).includes(errorCode);
}