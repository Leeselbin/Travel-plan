//퇴근전 pr테스트

//TODO: axios error handlring , token, refresh 검사

//TODO: refreshToken 갱신 주기 생각하기

// HTTP 응답 status 코드에 따른 에러 처리
// 지정된 오류가 아닐 시 interceptor에서 throw처리 필요
export const handleErrorResponse = (
  status: number,
  errorCode: string | null | undefined,
) => {
  switch (status) {
    case 400:
      console.error(`Error: ${status} - ${errorCode}`);
      break;
    case 401:
      console.error(`Error: ${status} - ${errorCode}`);
      break;
    case 403:
      console.error(`Error: ${status} - ${errorCode}`);
      break;
    case 404:
      console.error(`Error: ${status} - ${errorCode}`);
      break;
    case 500:
      console.error(`Server Error: ${status}`);
      break;
    default:
      console.error(`Error: ${status} - ${errorCode}`);
      break;
  }
};
