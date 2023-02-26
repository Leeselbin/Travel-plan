# node_module 설치(필수)

yarn install

# ios 연동

pod install

# ios build

yarn build:ios

# local 환경 구동

yarn start

# 신규 개발 시 screen template

> screens

> > components(options)

> > > atomic(options)

# axois base url

Appinner 안에 axios.defaults.baseURL = ''; 통해서 설정가능

# 화면 이동

const navigation = useNavigation<RootStackNavigationProp>();

1. navigation.navigate("navigationComponentName");
2. navigation.navigate("navigationComponentName", {
   param1: param1,
   param2: param2,
   });
3. navigation.reset({
   routes: [
   {
   name: "navigatorName",
   params: {screen: "screenName"},
   },
   ],
   });

# api fetch

```
get 호출 : useQuery
param : (key:string | Array<string>, api : any, param?: any, options?: any)

get 외 : useMutation
param : (key: string | Array<string>, api : any, param?: any, option?: any)


const { isLoading, isError, data, error } = useQuery("getRapport", fetchRapportList, {
refetchOnWindowFocus: false, // react-query는 focus가 달랃졋을때 재실행 여부 옵션
retry: 0, // 실패시 재호출 몇번 할지
onSuccess: data => {  // 성공시 호출  },
onError: e => {
// 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
// 강제로 에러 발생시키려면 api단에서 throw Error 날립니다.}
});
enabled: true // true 가 되면 useQuery 수행 ( 동기적으로 처리 가능 )

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
```

# api re -fetch

```
import { useQueryClient } from 'react-query';
const queryClient = useQueryClient();
queryClient.invalidateQueries(지정한key); //을 실행하면 이전에 가져온 데이터를 다시 re-fetch 한다.
```

# api 여러개

```
const result = useQueries([
  {
    queryKey: ["getRapport", rapportParam],
    queryFn: () => api.getRapport(rapportParam)
  },
  {
    queryKey: ["getMember", memberParam],
    queryFn: () => api.getMember(memberParam)
  }
]);
```

# react-query QueryCache 전처리

```
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log(error, query);
      if (query.state.data !== undefined) {
        toast.error(`에러가 났어요!!: ${error.message}`);
      },
    },
    onSuccess: data => {
      console.log(data)
    }
  })
});
```
