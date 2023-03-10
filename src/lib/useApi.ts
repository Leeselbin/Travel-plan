import {Alert} from 'react-native';
import {AxiosResponse} from 'axios';
import {QueryKey, useMutation, useQuery} from '@tanstack/react-query';
import {SERVICE_ERROR_MESSAGES} from './constants';
import {apiClient} from './network';

interface IQuery {
  quyeryKey?: QueryKey;
  url: string;
  config?: ApiConfig;
}

interface ApiConfig {
  callback?: () => void;
  errorCallback?: () => void;
}

interface ApiData {
  errorCode: string;
  message: string;
  data: any;
}

const useApi = ({url, quyeryKey, config}: IQuery) => {
  const {callback, errorCallback} = config;

  const onError = (error: any) => {
    const {status} = error.response;
    const errorMessage =
      SERVICE_ERROR_MESSAGES[status] || SERVICE_ERROR_MESSAGES.default;
    Alert.alert(errorMessage);
  };

  const onSuccess = (res: AxiosResponse<ApiData> | any) => {
    if (res.status === 200 && !res.data.errorCode) {
      if (callback) {
        callback();
      }
    } else {
      const errorMessage =
        SERVICE_ERROR_MESSAGES[res.errorCode] || SERVICE_ERROR_MESSAGES.default;
      Alert.alert(errorMessage);
      if (errorCallback) {
        errorCallback();
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
    const {data} = await apiClient.get(url);
    return data;
  };

  const useMutationFn = async (data: any) => {
    await apiClient.post(url, data);
  };

  const useQueryInstance = useQuery(quyeryKey, useQueryFn, useQueryOptions);
  const useMutationInstance = useMutation(useMutationFn, useMutationOptions);

  return {
    useQuery: useQueryInstance,
    useMutation: useMutationInstance,
  };
};

export default useApi;
