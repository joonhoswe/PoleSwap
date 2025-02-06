import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen h-auto w-full px-4 lg:px-12 items-center text-black">
      <Navbar/>
      <main className="flex-1 min-w-full min-h-screen flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};