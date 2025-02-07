import { Request } from '../../core/models/request.model';

export interface RequestState {
  requests: Request[];
}

export const initialRequestState: RequestState = {
  requests: [],
};
