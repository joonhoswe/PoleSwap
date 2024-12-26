import { Navbar } from '../components/Navbar'

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full px-12 items-center text-black">
      <Navbar/>
      {children}
    </div>
  );
};