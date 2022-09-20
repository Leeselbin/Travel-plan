declare module '*.json' {
  const value: any;
  export default value;
}

export interface city {
  city: string;
  gu?: string | null;
  dong?: string | null;
  xVal: number;
  yVal: number;
}

export interface weatherItem {
  category: string;
  fcstValue: string;
  fcstDate: string;
  fcstTime: string;
}

export interface chartData {
  values: number[];
  textTop: array;
  iconTop: array;
  textBottom: array;
  iconBottom: array;
}
