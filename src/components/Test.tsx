/* eslint-disable react-hooks/rules-of-hooks */
// import {Alert} from 'react-native';
// import client from './clients';
// import axios from 'axios';
// import {resolvePlugin} from '@babel/core';
import moment from 'moment';
import {city} from '../types/data';
import {useQuery} from 'react-query';
import React from 'react';

import {Text, View} from 'react-native';

const initCity: city = {
  city: '서울특별시',
  gu: '',
  dong: '',
  xVal: 60,
  yVal: 127,
};

const cityData = require('../json/city.json');

const Test = () => {
  const cityName = '서울특별시';
  let cityInfo: city = initCity;
  cityData.forEach((item: city) => {
    if (item.city === cityName && !item.dong && !item.gu) {
      cityInfo = item;
    }
  });
  const today = moment().format('YYYYMMDD');
  const now = moment().subtract(1, 'hour').format('HH');
  const x = cityInfo.xVal || 55;
  const y = cityInfo.yVal || 127;
  const finalUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=8brCjDoKXb6BTQEjJkTPWRDbSL8UvGYNcAQdyBKylJpZ1Ddfjv1d8KQg6XUVe%2Bw0iVN%2BVgcs241ZLBZtBr%2FfEQ%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${today}&base_time=${now}30&nx=${x}&ny=${y}`;
  let rstCd = 'not';
  console.log('url', finalUrl);
  const {isLoading, error, data, isFetching} = useQuery(finalUrl, () =>
    fetch(finalUrl).then(res => res.json()),
  );

  console.log('react query', isLoading, data);

  if (isLoading) {
    return <Text>{'Loading...'}</Text>;
  }

  if (error) {
    return <Text>{'날씨 정보가 존재하지 않습니다'}</Text>;
  }
  const temp = data.response.body.items.item.filter((item: any) => {
    return item.category === 'T1H';
  });
  rstCd = data.response.header.resultCode + '//' + temp[0].fcstValue;

  return <Text>{isFetching ? 'Updating...' : rstCd + cityName}</Text>;
};

export default Test;
