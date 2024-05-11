import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // assuming you have a store setup

// Define the initial state
interface InitialState {
  currentFolderId: number;
  currentFileId: number | null;
}

const initialState: InitialState = {
  currentFolderId: 1, // Default to selecting the root folder.
  currentFileId: null,
};

export const ROOT_FOLDER_ID = 1;

// Create a slice
const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setCurrentFolder(state, action: PayloadAction<number>) {
      state.currentFolderId = action.payload;
    },
    setCurrentFile(state, action: PayloadAction<number>) {
      state.currentFileId = action.payload;
    }
  },
});

export const folderActions = folderSlice.actions;
export default folderSlice.reducer;

export const selectCurrentFolder = (state: RootState) => state.folderSlice.currentFolderId;

export const selectCurrentFile = (state: RootState) => state.folderSlice.currentFileId;