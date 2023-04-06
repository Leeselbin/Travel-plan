# node_module 설치(필수)

yarn install

# ios 연동

cd ios && pod install

# ios build ( 안해도 상관없음 안되면 하세요 )

yarn build:ios 

# local 환경 구동

yarn start

# 안드로이드 실기기 연결
1. yarn start 로 서버실행
2. 안드로이드폰과 노트북 연결 (유선으로)
3. adb devices (프로젝트 루트경로에서 )명령어로 연결확인
4. adb reverse tcp:8081 tcp:8081   (프로젝트 루트경로에서 ) 명렁어 실행 

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

# api fetch - 3/29 수정본

# api 호출

```    
const { status, data, isLoading, isFetching, refetch } = useApi({
        quyeryKey: ['test', 'second'],
        url: '/branch/find?page=1&pageSize=2&sort=',
        //method: 'post'   => useQuery는 'get', useMutation은 'post' 가 dafault입니다
        //다만 조회목적의 쿼리인데 post를 사용해야할 때 넣으시면 됩니다.
        config: {
            callback: (res:Data) => {
                //success
            },
            errorCallback: () => {
                //service errror
            }
        }
    }).useQuery
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

# 꺠알 팁
React native Modal 2개 사용시
 - 1개의 모달을 사용하여 버튼을 이용하여 2번째 모달을 사용할시에
 - android 에서는 잘작동하지만
 - ios 에서는 첫번째 modal이 완전히 종료된뒤에 2번째modal을 띄어줘야 modal이 표시된다
   
   
ios에서 꼬인 디펜던시를 푸는 방법
1. ios 프로젝트에서 Pods, Podfile.lock 날리고 pod install 다시 하기
2. Xcode열고 Product -> ‘Clean Build Folder’ (cmd + Shift + K)
3. 3. metro 종료 후 재시작
   
   
onchange event 관리 react.js 와 react-native 차이가 있음
```
- React JS
 onChange={(event)=> console.log(event.target.value)}
- ReactNative
 onChange={(event) => console.log(event.nativeEvent.text)}
```







# 꺠알 팁
React native Modal 2개 사용시
 - 1개의 모달을 사용하여 버튼을 이용하여 2번째 모달을 사용할시에
 - android 에서는 잘작동하지만
 - ios 에서는 첫번째 modal이 완전히 종료된뒤에 2번째modal을 띄어줘야 modal이 표시된다
   
   
ios에서 꼬인 디펜던시를 푸는 방법
1. ios 프로젝트에서 Pods, Podfile.lock 날리고 pod install 다시 하기
2. Xcode열고 Product -> ‘Clean Build Folder’ (cmd + Shift + K)
3. 3. metro 종료 후 재시작
   
   
onchange event 관리 react.js 와 react-native 차이가 있음
```
- React JS
 onChange={(event)=> console.log(event.target.value)}
- ReactNative
 onChange={(event) => console.log(event.nativeEvent.text)}
```


test