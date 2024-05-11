import { Provider } from "react-redux";
import FolderContent from "./components/FolderContent";
import FolderTree from "./components/FolderTree";
import { store } from "./state/store";

const App = () => {

  return (
    <div>
      <Provider store={store}>
        <FolderTree/>
        <FolderContent />
      </Provider>
    </div>
  )
}

export default App;
