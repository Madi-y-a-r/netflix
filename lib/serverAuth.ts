import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb'

const serverAuth = async(req: NextApiRequest) => {
    const session = await getSession({ req });

    console.log("SESSION:", session);
    console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
    console.log("GITHUB_ID:", process.env.GITHUB_ID);
    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    })

    if(!currentUser){
        throw new Error('Not signed in');
    }

    return { currentUser}
}
export default serverAuth;