import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authNode, AuthState } from '../reducers/auth.reducer';

export const selectAuthFeature = createFeatureSelector<AuthState>(authNode);

export const selectAuth = createSelector(
  selectAuthFeature,
  (state: AuthState) => state
);

export const isAuthenticated = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.authenticated
);

export const isLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.loading
);
