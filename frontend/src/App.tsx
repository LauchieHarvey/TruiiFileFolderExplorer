import { Provider } from "react-redux";
import FolderContent from "./components/FolderContent";
import FolderTree from "./components/FolderTree";
import { store } from "./state/store";
import ActionHeader from "./components/ActionHeader";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <ActionHeader />
        <FolderTree />
        <FolderContent />
      </Provider>
    </div>
  )
}

export default App;
