import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';


export default NextAuth({
    session: {
        jwt: true, // використовується для створення сесії
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const userCollection = client.db().collection('users');

                const user = await userCollection.findOne({ email: credentials.email });

                if(!user) {
                    throw new Error('No user found!');
                }
                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    throw new Error('Invalid password!');
                }



                return { email: user.email };


                client.close();
                
            }
        })
    ],
});