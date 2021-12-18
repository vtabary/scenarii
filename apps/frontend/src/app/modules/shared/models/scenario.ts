export interface IScenario {
  id: string;
  message: string;
  dependency?: string;
  comment?: string;
  category?: string;
  subcategory?: string;
}
