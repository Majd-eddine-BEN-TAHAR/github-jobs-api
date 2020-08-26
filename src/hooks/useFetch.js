import { useEffect, useReducer } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make_request",
  GET_DATA: "loading",
  ERROR: "error",
  HAS_NEXT_PAGE: "has_next_page",
};

const CORS_URL = "https://majd-cors-anywhere.herokuapp.com/";
const API_URL = "https://jobs.github.com/positions.json";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { jobs: [], loading: true };

    case ACTIONS.GET_DATA:
      return { ...state, jobs: action.payload.jobs, loading: false };

    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error };

    case ACTIONS.HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };

    default:
      return state;
  }
};

const useFetch = (params, page) => {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
    // error: null,
  });

  useEffect(() => {
    const cancelRequestTimer1 = setTimeout(() => {
      dispatch({ type: ACTIONS.MAKE_REQUEST });
      axios(`${CORS_URL}${API_URL}`, {
        params: { mardown: true, page: page, ...params },
      })
        .then((res) => {
          dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
          // dispatch({ type: ACTIONS.MAKE_REQUEST, payload: { data: res } });
          // console.log(res);
        })
        .catch((err) => {
          dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
        });
    });

    const cancelRequestTimer2 = setTimeout(() => {
      axios(`${CORS_URL}${API_URL}`, {
        params: { mardown: true, page: page + 1, ...params },
      })
        .then((res) => {
          dispatch({
            type: ACTIONS.HAS_NEXT_PAGE,
            payload: { hasNextPage: res.data.length !== 0 },
          });
        })
        .catch((err) => {
          dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
        });
    });
    return () => {
      clearTimeout(cancelRequestTimer1);
      clearTimeout(cancelRequestTimer2);
    };
  }, [params, page]);

  return [state.jobs, state.loading, state.error, state.hasNextPage];
};

export default useFetch;
