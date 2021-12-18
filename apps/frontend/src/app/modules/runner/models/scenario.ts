import { IScenario } from '../../shared/public-api';

export interface IResolvedScenario extends IScenario {
  index: number;
  length: number;
  next?: IScenario & { index: number };
  previous?: IScenario & { index: number };
}
