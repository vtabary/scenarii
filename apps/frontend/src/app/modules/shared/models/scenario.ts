export interface IScenario {
  id: string;
  message: string;
  dependency: string | null;
  comment: string | null;
  category: string | null;
  subcategory: string | null;
}
