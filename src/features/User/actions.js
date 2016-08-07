import { get } from 'axios';
import config from 'env';

export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_USER_CHARACTERS = 'FETCHING_USER_CHARACTERS';
export const FETCHING_USER_RESULT = 'FETCHING_USER_RESULT';
export const FETCHING_USER_CHARACTERS_RESULT = 'FETCHING_USER_CHARACTERS_RESULT';
export const FETCH_PVP_STATS_RESULT = 'FETCH_PVP_STATS_RESULT';
export const FETCH_PVP_GAMES_RESULT = 'FETCH_PVP_GAMES_RESULT';
export const FETCH_PVP_STANDINGS_RESULT = 'FETCH_PVP_STANDINGS_RESULT';

const fetchingUser = (fetching) => ({
  type: FETCHING_USER,
  payload: fetching,
});

const fetchUserResult = (user) => ({
  type: FETCHING_USER_RESULT,
  payload: user,
});

const fetchUserCharactersResult = (alias, characters) => ({
  type: FETCHING_USER_CHARACTERS_RESULT,
  payload: {
    alias,
    characters,
  },
});

const fetchingUserCharacters = (fetching) => ({
  type: FETCHING_USER_CHARACTERS,
  payload: fetching,
});

export const fetchUserCharacters = (alias) => (dispatch) => {
  dispatch(fetchingUserCharacters(true));

  return get(`${config.api.endpoint}users/${alias}/characters`)
    .then((response) => {
      dispatch(fetchUserCharactersResult(alias, response.data));
      dispatch(fetchingUserCharacters(false));
    });
};

export const fetchUser = (alias) => (dispatch) => {
  dispatch(fetchingUser(true));

  return get(`${config.api.endpoint}users/${alias}`)
    .then((response) => {
      dispatch(fetchUserResult(response.data));
      dispatch(fetchingUser(false));
    });
};

export const fetchPvpStatsSuccess = (alias, data) => ({
  type: FETCH_PVP_STATS_RESULT,
  payload: {
    alias,
    data,
  },
});

export const fetchPvpGamesSuccess = (alias, data) => ({
  type: FETCH_PVP_GAMES_RESULT,
  payload: {
    alias,
    data,
  },
});

export const fetchPvpStandingsSuccess = (alias, data) => ({
  type: FETCH_PVP_STANDINGS_RESULT,
  payload: {
    alias,
    data,
  },
});

export const fetchPvpStats = (alias) => (dispatch) =>
  get(`${config.api.endpoint}users/${alias}/pvp/stats`)
  .then((response) => {
    dispatch(fetchPvpStatsSuccess(alias, response.data));
  });

export const fetchPvpGames = (alias) => (dispatch) =>
  get(`${config.api.endpoint}users/${alias}/pvp/games`)
  .then((response) => {
    dispatch(fetchPvpGamesSuccess(alias, response.data));
  });

export const fetchPvpStandings = (alias) => (dispatch) =>
  get(`${config.api.endpoint}users/${alias}/pvp/standings`)
  .then((response) => {
    const standings = response.data;

    // standings.forEach((standing) => dispatch(fetchPvpSeason(standing.season_id)));

    dispatch(fetchPvpStandingsSuccess(alias, standings));
  });
