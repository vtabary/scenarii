import { IScenarioReport } from '../../shared/public-api';

export interface IResolvedScenario extends IScenarioReport {
  index: number;
  length: number;
  next?: IScenarioReport & { index: number };
  previous?: IScenarioReport & { index: number };
}
