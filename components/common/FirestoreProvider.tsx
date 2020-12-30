import React, { useEffect, useState } from "react";
import { useFirebaseApp, preloadFirestore } from "reactfire";

export const FirestoreProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const firebaseApp = useFirebaseApp();
  const [database, setDatabase] = useState(undefined);
  useEffect(() => {
    preloadFirestore({
      firebaseApp: firebaseApp,
      setup: async (firestore) => {
        await firestore().enablePersistence();
        setDatabase(firestore());
      },
    });
  }, []);

  if (!database) {
    return <div>Loading...</div>;
  } else {
    return <>{children}</>;
  }
};
