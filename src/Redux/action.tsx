import { createSlice } from "@reduxjs/toolkit";

type State = {
  laps: number[];  
  time: number;
  running: boolean;
};

const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState: {
    time: 0,
    running: false,
    laps: [],
  },
  reducers: {
    start: (state) => {
      state.running = true;
    },
    stop: (state) => {
      state.running = false;
    },
    reset: (state) => {
      state.time = 0;
      state.laps = [];
    },
    tick: (state) => {
      if (state.running) state.time += 10;
    },
    addLap: (state: State) => {
      if (state.laps.length === 0) {
        // First lap
        state.laps.push(state.time);
      } else {
        // Calculate the time since the last lap
        const lastLapTime = state.laps[state.laps.length - 1];
        const currentLapTime = state.time - lastLapTime;
        state.laps.push(currentLapTime);
      }
    },
  },
});
    
export const { start, stop, reset, tick, addLap } = stopwatchSlice.actions;
export default stopwatchSlice.reducer;
