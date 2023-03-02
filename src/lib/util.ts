// HTTP 응답 status 코드에 따른 에러 처리
export const handleErrorResponse = (status, errorCode) => {
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
