import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full px-4 lg:px-12 items-center text-black">
      <Navbar/>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};