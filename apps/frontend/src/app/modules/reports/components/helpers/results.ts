import { IScenarioReport } from '../../../shared/public-api';

export type IStatusReport = [
  {
    label: 'Valid';
    data: number[];
    backgroundColor: '#A3E635';
    hoverBackgroundColor: '#BEF264';
  },
  {
    label: 'Failed';
    data: number[];
    backgroundColor: '#F87171';
    hoverBackgroundColor: '#FCA5A5';
  },
  {
    label: 'Pending';
    data: number[];
    backgroundColor: '#FBBF24';
    hoverBackgroundColor: '#FCD34D';
  }
];

export const getStatusReport = (items: IScenarioReport[]): IStatusReport => {
  return items.reduce(
    (acc, item) => {
      const index =
        item.report.valid === undefined ? 2 : item.report.valid ? 0 : 1;
      acc[index].data[0] += 1;
      return acc;
    },
    [
      {
        label: 'Valid',
        data: [0],
        backgroundColor: '#A3E635',
        hoverBackgroundColor: '#BEF264',
      },
      {
        label: 'Failed',
        data: [0],
        backgroundColor: '#F87171',
        hoverBackgroundColor: '#FCA5A5',
      },
      {
        label: 'Pending',
        data: [0],
        backgroundColor: '#FBBF24',
        hoverBackgroundColor: '#FCD34D',
      },
    ]
  );
};
