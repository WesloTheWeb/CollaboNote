import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Pool } from "pg"
import bcrypt from "bcrypt"

// Extend NextAuth types to include role and tier
declare module "next-auth" {
  interface User {
    id: string
    role: string
    accountTier: string
  }
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
      accountTier: string
    }
  }
};

// Create connection pool for NextAuth
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const authOptions: AuthOptions = {
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
          // Query your existing User table with role and tier
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
            role: user.role,
            accountTier: user.accountTier,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (user) {
        token.uid = user.id
        token.name = user.name
        token.role = user.role
        token.accountTier = user.accountTier
      }
      
      // When session is updated (via update() function), refetch user data
      if (trigger === "update" && token.uid) {
        try {
          const result = await pool.query(
            'SELECT "firstName", "lastName", role, "accountTier" FROM "User" WHERE id = $1',
            [token.uid]
          )
          
          if (result.rows.length > 0) {
            const user = result.rows[0]
            token.name = `${user.firstName} ${user.lastName}`
            token.role = user.role
            token.accountTier = user.accountTier
          }
        } catch (error) {
          console.error("Error updating session:", error)
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.uid as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.accountTier = token.accountTier as string
      }
      return session
    },
  },
};