import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BACKEND_URL = process.env.BACKEND_URL;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // return { email: "bodu@gmail.com", name: "Bodu", id: 1 };

        const res = await fetch(`${BACKEND_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        console.log("USER");
        console.log(user[0]);

        // If no error and we have user data, return it
        if (res.ok && user && user[0]) {
          const sessionObject = {
            name: user[0].name,
            email: user[0].id,
            id: user[0].id,
            image: user[0].photo_id,
          };
          console.log(sessionObject);
          return sessionObject;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  events: {
    signOut: async ({ session, token }) => {},
  },
});

export { handler as GET, handler as POST };
