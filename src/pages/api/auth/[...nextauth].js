import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prisma';
import { prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const authOptions = {
  // Prisma Adapter for integrating with Prisma ORM
  adapter: PrismaAdapter(prisma),
  
  providers: [
    // Using CredentialsProvider for authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find the user by email in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        
        // If user is found, compare the password
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, email: user.email, role: user.role }; // Return user info if successful
        }
        // Return null if user is not found or password is incorrect
        return null;
      }
    })
  ],
  
  callbacks: {
    // Customize the session returned to the client
    async session({ session, token }) {
      // Add the role from token to session object
      session.user.role = token.role;
      return session;
    },
    // Customize token generation if necessary
    async jwt({ token, user }) {
      // Include role from the user object into the token
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  },
  
  // Set a secret to sign the JWT tokens (you can set this in an environment variable for production)
  secret: process.env.NEXTAUTH_SECRET,
  
  // Session configuration
  session: {
    jwt: true,  // Use JWT for session management
  },
  
  // Configure JWT
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure this secret is stored securely in an env variable
    encryption: true,  // Encrypt JWT to enhance security
  },

  pages: {
    signIn: '/auth/signin',  // Redirect to custom sign-in page
    error: '/auth/error',  // Custom error page (optional)
  }
};

export default NextAuth(authOptions);
