import './assets/styles/index.scss';
import { Routing } from '../pages';
import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routing />
      <Footer />
    </div>
  );
};
