export const handleErrorResponse = (
  status: number,
  errorCode: string | null | undefined,
  request?: any,
) => {
  console.log('>>> error : ', status, '//', errorCode, '//', request);
  if (request) {
    console.log('서버 상태가 off');
  } else {
    console.log('오류 발생');
  }
};
