import { Outlet } from 'react-router-dom';
import Container from '../ui/Container';
import Sidebar from '../ui/Sidebar';
import { useState } from 'react';

const Layout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const NAVIGATION = [
    { label: 'Gestionar funcionarios', href: 'funcionarios' },
    { label: 'Gestionar tramites', href: 'tramites' },
  ];

  return (
    <div className="flex">
      <Sidebar state={toggleSidebar} setState={setToggleSidebar} navigation={NAVIGATION} />
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
