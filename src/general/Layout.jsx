import { Navbar } from '../components/Navbar'

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full items-center text-black">
      <Navbar/>
      {children}
    </div>
  );
};