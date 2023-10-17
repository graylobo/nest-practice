const hscodes = [
  {
    originCode: '010221',
    additionalCode: '',
    hscode: '010221',
    country: '한국',
    year: '2023',
    name: '번식용',
    standardTariff: 0.1,
    aseanTariff: 0.3,
  },
  {
    originCode: '010221',
    additionalCode: '',
    hscode: '010221',
    country: '미국',
    year: '2023',
    name: '번식용',
    standardTariff: 0.1,
    aseanTariff: 0.3,
  },
  {
    originCode: '010221',
    additionalCode: '1000',
    hscode: '0102211000',
    country: '한국',
    year: '2023',
    name: '젖소',
    standardTariff: 0.1,
    aseanTariff: 0.3,
  },
  {
    originCode: '010221',
    additionalCode: '1000',
    hscode: '0102211000',
    country: '미국',
    year: '2023',
    name: '암소',
    standardTariff: 0.1,
    aseanTariff: 0.3,
  },
];

// 0. nestjs, typeorm 을 사용하는 환경에서 hscode 데이터에 대한 데이터베이스를 구성할 계획임
// 1. 위 json 배열 데이터는 Hscode에 대한 데이터를 표현한 것이고, 위에는 간략하게 표현하기 위해 소량의 데이터만 있으나 실제로는 국가별로 약 20,000개의 hscode 데이터가 있음
// 2. originCode는 국제표준코드, additionalCode는 각 country 마다의 코드이며 2개를 합친 값이 hscode가 됨
// 3. originCode는 모든 국가가 동일한 name을 갖고 있으며, originCode에 붙는 additionalCode에 따라 국가별로 상이한 name을 가질수 있음
// 4. year에 따라 hscode의 값이 바뀔 수 있음


