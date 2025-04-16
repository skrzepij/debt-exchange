export interface ApiResponse<DataType> {
  data: DataType;
  status: number;
}

export interface Debt {
  Id: number;
  Name: string;
  NIP: string;
  Date: string;
  Value: number;
  Address: string;
  DocumentType: string;
  Price: number;
  Number: string;
}

export interface DebtFilterParams {
  phrase: string;
}
