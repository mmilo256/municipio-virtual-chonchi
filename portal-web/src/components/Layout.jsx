import { NAVEGACION } from '../data/constantes';
import Footer from './ui/Footer';
import Navbar from './ui/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="flex-grow">
        <Navbar navegacion={NAVEGACION} logeado />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
