export interface WasteItem {
  type: string;
  weight: number;
}

export interface Request {
  id: number;
  userId: string;
  wastes: WasteItem[];
  address: string;
  date: string;
  time: string;
  notes?: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
}
