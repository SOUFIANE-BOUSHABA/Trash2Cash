import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RequestService } from '../../core/services/request.service';
import * as RequestActions from './requests.actions';

@Injectable()
export class RequestsEffects {

  constructor(
    private actions$: Actions,
    private requestService: RequestService
  ) {}




  loadRequestsForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestActions.loadRequestsForUser),
      mergeMap(({ userId }) =>
        this.requestService.getRequestsForUser(userId).pipe(
          map(requests => RequestActions.loadRequestsForUserSuccess({ requests }))
        )
      )
    )
  );




  addRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestActions.addRequest),
      mergeMap(({ request }) =>
        this.requestService.addRequest(request).pipe(
          map(newRequest => RequestActions.addRequestSuccess({ request: newRequest }))
        )
      )
    )
  );




  deleteRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestActions.deleteRequest),
      mergeMap(({ id }) =>
        this.requestService.deleteRequest(id).pipe(
          map(() => RequestActions.deleteRequestSuccess({ id }))
        )
      )
    )
  );





  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestActions.updateRequest),
      mergeMap(({ request }) =>
        this.requestService.updateRequest(request).pipe(
          map(updatedRequest => RequestActions.updateRequestSuccess({ request: updatedRequest })),
          //catchError(error => of(RequestActions.updateRequestFailure({ error: error.message })))
        )
      )
    )
  );


}
