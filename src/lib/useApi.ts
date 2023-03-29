import { AxiosError, AxiosResponse } from 'axios';
import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import instance from '@lib/network';
import { isError } from '@lib/constants';
import CustomError from '@lib/CustomError';

interface IQuery {
  quyeryKey?: QueryKey;
  url: string;
  config?: ApiConfig;
  param?: any;
  method?: 'get' | 'post' | 'put' | 'delete'
}
interface ApiConfig {
  callback?: (res: ApiData) => void;
  errorCallback?: (res: ApiData) => void;
}

export interface ApiData {
  code: string;
  message: string;
  data: any;
  timestamp: string;
}

const useApi = ({ url, quyeryKey, method, param, config }: IQuery) => {

  const onError = (error: any) => {
    if (error instanceof CustomError) {
      if (config && config.errorCallback) {
        const serviceErrorData: ApiData = error.response?.data;
        if (isError(serviceErrorData.code)) {
          config.errorCallback(serviceErrorData);
        } else {
          console.log(`예상치 못한 서비스 오류가 발생했습니다, ${serviceErrorData.code}`)
        }
      }
    }
  };

  const onSuccess = (res: AxiosResponse<ApiData> | any) => {
    if (res.code === 'SUCCESS') {
      if (config && config.callback) {
        config.callback(res.data);
      }
    } else {
      if (isError(res.code)) {
        console.log(res.message);

        if (config && config.errorCallback) {
          config.errorCallback(res);
        }
      }

    }
  };

  const useQueryOptions = {
    onError,
    onSuccess,
  };
  const useMutationOptions = {
    onError,
    onSuccess,
  };

  const useQueryFn = async () => {
    let rst = null;

    if (method === 'post') {
      rst = await instance.post(url, param);
    } else if (method === 'put') {
      rst = await instance.put(url, param);
    } else if (method === 'delete') {
      rst = await instance.delete(url);
    } else {
      rst = await instance.get(url);

    }

    return rst.data;
  };

  const useMutationFn = async (body: any) => {

    let rst = null;

    if (method === 'put') {
      rst = await instance.put(url, body);
    } else if (method === 'delete') {
      rst = await instance.delete(url, body);
    } else {
      rst = await instance.post(url, body);
    }

    return rst.data;
  };

  const useQueryInstance = useQuery(quyeryKey || ['inputQueryKey'], useQueryFn, useQueryOptions);
  const useMutationInstance = useMutation(useMutationFn, useMutationOptions);

  return {
    useQuery: { ...useQueryInstance, data: useQueryInstance.error ? null : useQueryInstance.data?.data },
    useMutation: { ...useMutationInstance, data: useQueryInstance.error ? null : useQueryInstance.data?.data },
  };
};

export default useApi;
