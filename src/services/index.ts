/**
 * Services Index
 * Central export point for all services
 */

export { authService } from './auth.service';
export { matchService } from './match.service';
export { refereeService } from './referee.service';

export type { LoginCredentials, RegisterData, AuthResponse } from './auth.service';
export type { Match, MatchCreate, MatchUpdate } from './match.service';
export type { Referee, RefereeCreate, RefereeUpdate } from './referee.service';

