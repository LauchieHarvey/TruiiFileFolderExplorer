import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // assuming you have a store setup

export const ROOT_FOLDER_ID = 1;

// Define the initial state
interface InitialState {
  currentFileId: number | null;
  // Ordered list from root to leaf.
  currentFolderPath: Array<{name: string, id: number}>;
}

const initialState: InitialState = {
  currentFolderPath: [{name: 'root', id: ROOT_FOLDER_ID}],
  currentFileId: null,
};

// Create a slice
const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setCurrentFolder(state, action: PayloadAction<Array<{name: string, id: number}>>) {
      state.currentFolderPath = action.payload;
    },
    setCurrentFile(state, action: PayloadAction<number>) {
      state.currentFileId = action.payload;
    }
  },
});

export const folderActions = folderSlice.actions;
export default folderSlice.reducer;

export const selectCurrentFolder = (state: RootState) =>
  state.folderSlice.currentFolderPath[state.folderSlice.currentFolderPath.length - 1];

export const selectCurrentFolderPath = (state: RootState) => state.folderSlice.currentFolderPath;

export const selectCurrentFile = (state: RootState) => state.folderSlice.currentFileId;