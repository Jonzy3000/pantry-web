import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: Props) => {
  return (
    <main className="container mx-auto">
      <Navbar />
      <div className="px-2 md:px-16">{children}</div>
    </main>
  );
};
