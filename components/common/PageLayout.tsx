import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: Props) => {
  return (
    <div className="bg-white">
      <Navbar />
      <main className="flex flex-col justify-center  max-w-2xl mx-auto px-4 mb-16">
        {children}
      </main>
    </div>
  );
};
