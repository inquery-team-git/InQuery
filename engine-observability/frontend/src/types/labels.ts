export type Label = {
  _id: string;
  createdBy: string;
  company: string;
  name: string;
  urlName: string;
  entryCount: number;
  createdAt: Date;
};

export interface LabelState {
  isLoading: boolean;
  error: string;
  labels: Label[];
}
