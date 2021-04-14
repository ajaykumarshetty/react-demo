import Main from "./views/index";
import { Provider } from 'react-redux';
import store from "./redux/store"


const Home = () => {
  return (
        <Provider store={store}>
          <Main />
        </Provider>
  )
}

export default Home;