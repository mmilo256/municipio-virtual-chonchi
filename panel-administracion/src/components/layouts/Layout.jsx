import { Outlet } from 'react-router-dom';
import Container from '../ui/Container';
import Sidebar from '../ui/Sidebar';
import { useState } from 'react';

const Layout = ({procedures}) => {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  
  const navigation = procedures.map(tramite => ({
    slug: tramite.nombre,
    titulo: tramite.titulo
  }))

  return (
    <div className="flex">
      <Sidebar state={toggleSidebar} setState={setToggleSidebar} navigation={navigation} />
      <Container
        sidebar={toggleSidebar}
        className={`transition-all ${toggleSidebar ? 'pl-80' : 'pl-16'}`}
      >
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
