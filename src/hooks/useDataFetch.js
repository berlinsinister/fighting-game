import { useEffect, useReducer } from "react";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isFirstRequestLoaded: true,
        error: null,
        data: action.payload?.data,
        fullResponse: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isFirstRequestLoaded: true,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

async function fetchWithStatuses(
  promise,
  dispatch,
  opts = { didCancel: false }
) {
  dispatch({ type: "FETCH_INIT", payload: null });

  try {
    const result = await promise;

    if (!opts.didCancel) {
      dispatch({ type: "FETCH_SUCCESS", payload: result });
    }

    return result;
  } catch (error) {
    if (!opts.didCancel) {
      dispatch({ type: "FETCH_FAILURE", payload: error });
    }
  }
}

export const useDataFetch = ({
  fetchHandler,
  initialData = {},
  isLazy = false,
  isLoadingInitial = false,
}) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: isLoadingInitial,
    isFirstRequestLoaded: false,
    error: null,
    data: initialData,
    fullResponse: null,
  });

  const fetchCallBack = (opts) =>
    fetchWithStatuses(fetchHandler(opts), dispatch);

  useEffect(() => {
    const opts = { didCancel: false };

    if (!isLazy && !opts.didCancel) {
      fetchWithStatuses(fetchHandler(), dispatch, opts);
    }

    return () => {
      opts.didCancel = true;
    };
  }, []);

  return [state, fetchCallBack];
};
