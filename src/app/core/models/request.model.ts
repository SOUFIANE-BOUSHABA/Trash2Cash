export interface Request {
  id: number;
  userId: string;
  type: string;
  weight: number;
  address: string;
  date: string;
  time: string;
  notes?: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
}
