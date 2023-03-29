export const handleErrorResponse = (
  status?: number,
  code?: string | null | undefined,
) => {
  console.log('Network >>> 오류가 발생했습니다.', status, code);
};