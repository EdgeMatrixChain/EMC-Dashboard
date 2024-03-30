import moment from 'moment';
export type ScheduleDataItem = {
  days: number;
  e: number;
  pi: number;
  decayFactor: number;
  periodicReward: number;
  epochReward: number;

  name: string;
  beginDate: Date;
  endDate: Date;
};

export type ScheduleData = {
  beginDate: Date;
  data: ScheduleDataItem[];
};

function getScheduleData() {
  const begin = moment.utc([2024, 0, 1]).toDate();

  const list: any[] = [
    {
      decayPeriod: 'TestNetv3',
      days: '180',
      e: '0',
      pi: '0',
      decayFactor: '0',
      periodicReward: '5400000.00',
      epochReward: '30000.00',
    },
    {
      decayPeriod: '1',
      days: '90',
      e: '2.0000',
      pi: '3.1416',
      decayFactor: '1',
      periodicReward: '4500000.00',
      epochReward: '50000.00',
    },
    {
      decayPeriod: '2',
      days: '90',
      e: '2.2500',
      pi: '3.1416',
      decayFactor: '0.7162',
      periodicReward: '3222880.06',
      epochReward: '35809.78',
    },
    {
      decayPeriod: '3',
      days: '90',
      e: '2.3704',
      pi: '3.1416',
      decayFactor: '0.7545',
      periodicReward: '2431697.03',
      epochReward: '27018.86',
    },
    {
      decayPeriod: '4',
      days: '90',
      e: '2.4414',
      pi: '3.1416',
      decayFactor: '0.7771',
      periodicReward: '1889725.09',
      epochReward: '20996.95',
    },
    {
      decayPeriod: '5',
      days: '180',
      e: '2.4883',
      pi: '3.1416',
      decayFactor: '0.7921',
      periodicReward: '2993532.42',
      epochReward: '16630.74',
    },
    {
      decayPeriod: '6',
      days: '180',
      e: '2.5216',
      pi: '3.1416',
      decayFactor: '0.8027',
      periodicReward: '2402778.94',
      epochReward: '13348.77',
    },
    {
      decayPeriod: '7',
      days: '180',
      e: '2.5465',
      pi: '3.1416',
      decayFactor: '0.8106',
      periodicReward: '1947630.45',
      epochReward: '10820.17',
    },
    {
      decayPeriod: '8',
      days: '180',
      e: '2.5658',
      pi: '3.1416',
      decayFactor: '0.8167',
      periodicReward: '1590654.46',
      epochReward: '8836.97',
    },
    {
      decayPeriod: '9',
      days: '360',
      e: '2.5812',
      pi: '3.1416',
      decayFactor: '0.8216',
      periodicReward: '2613800.10',
      epochReward: '7260.56',
    },
    {
      decayPeriod: '10',
      days: '360',
      e: '2.5937',
      pi: '3.1416',
      decayFactor: '0.8256',
      periodicReward: '2157984.56',
      epochReward: '5994.40',
    },
    {
      decayPeriod: '11',
      days: '360',
      e: '2.6042',
      pi: '3.1416',
      decayFactor: '0.8289',
      periodicReward: '1788840.49',
      epochReward: '4969.00',
    },
    {
      decayPeriod: '12',
      days: '360',
      e: '2.6130',
      pi: '3.1416',
      decayFactor: '0.8318',
      periodicReward: '1487873.48',
      epochReward: '4132.98',
    },
    {
      decayPeriod: '13',
      days: '720',
      e: '2.6206',
      pi: '3.1416',
      decayFactor: '0.8342',
      periodicReward: '2482252.71',
      epochReward: '3447.57',
    },
    {
      decayPeriod: '14',
      days: '720',
      e: '2.6272',
      pi: '3.1416',
      decayFactor: '0.8362',
      periodicReward: '2075774.79',
      epochReward: '2883.02',
    },
    {
      decayPeriod: '15',
      days: '720',
      e: '2.6329',
      pi: '3.1416',
      decayFactor: '0.8381',
      periodicReward: '1739643.26',
      epochReward: '2416.17',
    },
    {
      decayPeriod: '16',
      days: '720',
      e: '2.6379',
      pi: '3.1416',
      decayFactor: '0.8397',
      periodicReward: '1460738.01',
      epochReward: '2028.80',
    },
    {
      decayPeriod: '17',
      days: '1440',
      e: '2.6424',
      pi: '3.1416',
      decayFactor: '0.8411',
      periodicReward: '2457267.07',
      epochReward: '1706.44',
    },
    {
      decayPeriod: '18',
      days: '1440',
      e: '2.6464',
      pi: '3.1416',
      decayFactor: '0.8424',
      periodicReward: '2069956.40',
      epochReward: '1437.47',
    },
    {
      decayPeriod: '19',
      days: '1440',
      e: '2.6500',
      pi: '3.1416',
      decayFactor: '0.8435',
      periodicReward: '1746070.63',
      epochReward: '1212.55',
    },
    {
      decayPeriod: '20',
      days: '1440',
      e: '2.6533',
      pi: '3.1416',
      decayFactor: '0.8446',
      periodicReward: '1474676.98',
      epochReward: '1024.08',
    },
    {
      decayPeriod: '21',
      days: '2880',
      e: '2.6563',
      pi: '3.1416',
      decayFactor: '0.8455',
      periodicReward: '2493716.72',
      epochReward: '865.87',
    },
    {
      decayPeriod: '22',
      days: '2880',
      e: '2.6590',
      pi: '3.1416',
      decayFactor: '0.8464',
      periodicReward: '2110618.03',
      epochReward: '732.85',
    },
    {
      decayPeriod: '23',
      days: '2880',
      e: '2.6615',
      pi: '3.1416',
      decayFactor: '0.8472',
      periodicReward: '1788039.40',
      epochReward: '620.85',
    },
    {
      decayPeriod: '24',
      days: '2880',
      e: '2.6637',
      pi: '3.1416',
      decayFactor: '0.8479',
      periodicReward: '1516060.75',
      epochReward: '526.41',
    },
    {
      decayPeriod: '25',
      days: '5760',
      e: '2.6658',
      pi: '3.1416',
      decayFactor: '0.8486',
      periodicReward: '2572937.25',
      epochReward: '446.69',
    },
    {
      decayPeriod: '26',
      days: '5760',
      e: '2.6678',
      pi: '3.1416',
      decayFactor: '0.8492',
      periodicReward: '2184887.74',
      epochReward: '379.32',
    },
    {
      decayPeriod: '27',
      days: '5760',
      e: '2.6696',
      pi: '3.1416',
      decayFactor: '0.8498',
      periodicReward: '1856621.83',
      epochReward: '322.33',
    },
    {
      decayPeriod: '28',
      days: '5760',
      e: '2.6713',
      pi: '3.1416',
      decayFactor: '0.8503',
      periodicReward: '1578670.99',
      epochReward: '274.07',
    },
    {
      decayPeriod: '29',
      days: '11520',
      e: '2.6728',
      pi: '3.1416',
      decayFactor: '0.8508',
      periodicReward: '2686242.30',
      epochReward: '233.18',
    },
    {
      decayPeriod: '30',
      days: '11520',
      e: '2.6743',
      pi: '3.1416',
      decayFactor: '0.8513',
      periodicReward: '2286690.93',
      epochReward: '198.50',
    },
    {
      decayPeriod: '31',
      days: '11520',
      e: '2.6757',
      pi: '3.1416',
      decayFactor: '0.8517',
      periodicReward: '1947571.45',
      epochReward: '169.06',
    },
    {
      decayPeriod: '32',
      days: '11520',
      e: '2.6770',
      pi: '3.1416',
      decayFactor: '0.8521',
      periodicReward: '1659545.95',
      epochReward: '144.06',
    },
    {
      decayPeriod: '33',
      days: '23040',
      e: '2.6782',
      pi: '3.1416',
      decayFactor: '0.8525',
      periodicReward: '2829519.13',
      epochReward: '122.81',
    },
    {
      decayPeriod: '34',
      days: '23040',
      e: '2.6794',
      pi: '3.1416',
      decayFactor: '0.8529',
      periodicReward: '2413193.10',
      epochReward: '104.74',
    },
    {
      decayPeriod: '35',
      days: '23040',
      e: '2.6804',
      pi: '3.1416',
      decayFactor: '0.8532',
      periodicReward: '2058956.45',
      epochReward: '89.36',
    },
    {
      decayPeriod: '36',
      days: '23040',
      e: '2.6815',
      pi: '3.1416',
      decayFactor: '0.8535',
      periodicReward: '1757390.65',
      epochReward: '76.28',
    },
    {
      decayPeriod: '37',
      days: '46080',
      e: '2.6824',
      pi: '3.1416',
      decayFactor: '0.8538',
      periodicReward: '3001073.99',
      epochReward: '65.13',
    },
    {
      decayPeriod: '38',
      days: '46080',
      e: '2.6834',
      pi: '3.1416',
      decayFactor: '0.8541',
      periodicReward: '2563328.17',
      epochReward: '55.63',
    },
    {
      decayPeriod: '39',
      days: '46080',
      e: '2.6842',
      pi: '3.1416',
      decayFactor: '0.8544',
      periodicReward: '2190147.23',
      epochReward: '47.53',
    },
    {
      decayPeriod: '40',
      days: '46080',
      e: '2.6851',
      pi: '3.1416',
      decayFactor: '0.8547',
      periodicReward: '1871875.83',
      epochReward: '40.62',
    },
    {
      decayPeriod: '41',
      days: '92160',
      e: '2.6859',
      pi: '3.1416',
      decayFactor: '0.8549',
      periodicReward: '3200655.46',
      epochReward: '34.73',
    },
    {
      decayPeriod: '42',
      days: '92160',
      e: '2.6866',
      pi: '3.1416',
      decayFactor: '0.8552',
      periodicReward: '2737114.56',
      epochReward: '29.70',
    },
    {
      decayPeriod: '43',
      days: '92160',
      e: '2.6873',
      pi: '3.1416',
      decayFactor: '0.8554',
      periodicReward: '2341335.15',
      epochReward: '25.41',
    },
  ];

  function initData() {
    const beginMoment = moment(begin).utc();
    const results: ScheduleDataItem[] = [];
    list.forEach((item, index) => {
      const name = index === 0 ? item.decayPeriod : `${item.decayPeriod}th`;
      const days = Number(item.days);
      const beginDate = beginMoment.toDate();
      const endDate = beginMoment.add(Number(item.days), 'day').toDate();
      const e = Number(item.e);
      const pi = Number(item.pi);
      const decayFactor = Number(item.decayFactor);
      const periodicReward = Number(item.periodicReward);
      const epochReward = Number(item.epochReward);
      results.push({ name, days, beginDate, endDate, e, pi, decayFactor, periodicReward, epochReward });
    });
    return results;
  }

  return {
    beginDate: begin,
    data: initData(),
  };
}

const scheduleData: ScheduleData = getScheduleData();

export default scheduleData;
