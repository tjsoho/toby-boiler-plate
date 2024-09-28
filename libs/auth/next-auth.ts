import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { Adapter } from "@auth/core/adapters";
import config from "@/appConfig";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { User } from "@/libs/database/types";
import { emailClient } from "@/libs/email";
import { Database } from "@/libs/database";
import { DatabaseType } from "../types";
import { MongooseAdapter } from "@/libs/database/mongodb/adapter";

interface NextAuthOptionsExtended extends NextAuthOptions {
  adapter: any;
}

export const authOptions: NextAuthOptionsExtended = {
  // Set any random key in .env.local
  secret: process.env.NEXTAUTH_SECRET,
  adapter: getActiveAdapter(config.database.provider),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile): Promise<User> {
        return {
          id: profile.sub,
          name: profile.given_name ? profile.given_name : profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: new Date(),
          customerId: "",
          products: [],
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      async profile(profile): Promise<User> {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture.data.url,
          createdAt: new Date(),
          customerId: "",
          products: [],
        };
      },
    }),
    // Used for sending "magic links" to users' email for login.
    // Requires a database setup.
    EmailProvider({
      sendVerificationRequest: emailClient.sendVerificationRequest,
      maxAge: config.auth.magicLinkExpirationTime,
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  events: {
    async signIn(message) {
      // Enrich new user data with default values if signed in with email
      if (message.isNewUser && message.account.provider === "email") {
        const db = new Database();
        const user: User = {
          customerId: "",
          id: message.user.id,
          name: message.user.name || "",
          email: message.user.email || "",
          image: message.user.image || "",
          createdAt: new Date(),
          products: [],
        };

        await db.updateUserById(message.user.id, user);
      }

      // console.log("signIn", message);
    },
    // async signOut(message) {
    //   console.log("signOut", message);
    // },
    // async createUser(message) {
    // console.log("createUser", message);
    // },
    // async updateUser(message) {
    //   console.log("updateUser", message);
    // },
    // async linkAccount(message) {
    //   console.log("linkAccount", message);
    // },
    // async session(message) {
    //   console.log("session", message);
    // },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: config.theme.auth,
    logo: `${config.website.url}/static/images/logo.png`,
  },
};

function getActiveAdapter(databaseProvider: string): Adapter {
  const databaseProviderLowercase = databaseProvider.toLowerCase();

  if (databaseProviderLowercase === DatabaseType.FIRESTORE) {
    return FirestoreAdapter({
      credential: cert({
        projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
        clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  } else if (databaseProviderLowercase === DatabaseType.MONGODB) {
    return MongoDBAdapter(new MongooseAdapter().client);
  }
}
