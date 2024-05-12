import { Provider } from "react-redux";
import FolderContent from "./components/FolderContent";
import FolderTree from "./components/FolderTree";
import { store } from "./state/store";
import ActionHeader from "./components/ActionHeader";

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col gap-10">
        <ActionHeader />
        <div className="flex flex-row gap-40">
          <FolderTree />
          <FolderContent />
        </div>
      </div>
    </Provider>
  )
}

export default App;
