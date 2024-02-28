import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { db } from "./db";

export const currentUser = async () => {
  const session = await getServerSession(authOptions);

  if(!session?.user.email) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      email: session?.user.email as string,
    },
  });

  return user;
};
