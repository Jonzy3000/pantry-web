import { connectToDatabase } from "../server/infrastructure/mongodb/mongodb";

interface Props {
  isConnected: boolean;
}

const SSR = ({ isConnected }: Props) => {
  return (
    <div>
      {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for
          instructions.
        </h2>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}

export default SSR;
