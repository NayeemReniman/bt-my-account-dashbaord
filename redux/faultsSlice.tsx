import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DATA_FETCH_STATUS, Fault, fetchFaults, TabId } from "../api";

import { AccessTokenState } from "./accessTokenSlice";

export interface FaultsState {
  faultsFetchStatus: DATA_FETCH_STATUS;
  faults: Fault[];
}
const initialState: FaultsState = {
  faultsFetchStatus: "LOADING",
  faults: [],
};

const slice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addFaults(state, { payload }: PayloadAction<Fault[]>) {
      return {
        ...state,
        ...{ faults: [...state.faults, ...payload] },
        ...{ faultsFetchStatus: "RESOLVED" },
      };
    },
  },
});

export const { addFaults } = slice.actions;

export const getFaults =
  (accessToken: AccessTokenState, groupKey: string, tabId: TabId) =>
  async (dispatch: (arg0: { payload: Fault[]; type: string }) => void) => {
    const response = await fetchFaults(accessToken, groupKey, tabId);
    dispatch(addFaults(response.result.Faults));
  };

export default slice.reducer;
