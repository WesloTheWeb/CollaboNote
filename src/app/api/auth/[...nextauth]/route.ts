import NextAuth from "next-auth"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import bcrypt from "bcrypt"

// Create connection pool for NextAuth
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const authOptions: AuthOptions = {
  adapter: PostgresAdapter(pool),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Query your existing User table
          const result = await pool.query(
            'SELECT * FROM "User" WHERE email = $1',
            [credentials.email.toLowerCase().trim()]
          )

          if (result.rows.length === 0) {
            return null
          }

          const user = result.rows[0]

          // Verify password
          const passwordMatch = await bcrypt.compare(credentials.password, user.password)

          if (!passwordMatch) {
            return null
          }

          // Return user object that matches NextAuth User type
          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            // Add any additional fields you want in the session
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/login", // Your custom login page
  },
  callbacks: {
    async session({ session, user }) {
      // Add user ID and other custom fields to session
      if (session?.user && user) {
        session.user.id = user.id
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };