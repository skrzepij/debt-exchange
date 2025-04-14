export interface ApiResponse<DataType> {
  data: DataType;
  status: number;
}

export interface Debt {
  id: number;
  name: string;
  nip: string;
  date: string;
  value: number;
  address: string;
  documentType: string;
  price: number;
  number: string;
}

export interface DebtFilterParams {
  phrase: string;
}