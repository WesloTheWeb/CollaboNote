import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route";
import LandingPage from "@/components/LandingPage/LandingPage";

export default async function Home() {
  try {
    const session = await getServerSession(authOptions);

    if (session) {
      // User is logged in - show dashboard
      return (
        <div>
          <h1>Dashboard will go here</h1>
          <p>Welcome back, {session.user.name}!</p>
        </div>
      );
    }

    // User is not logged in - show landing page
    return (
      <div>
        <LandingPage />
      </div>
    );
  } catch (err) {
    console.error(err);
  }

};

// TODO: This becomes the root page. Not logged in users see LandingPage. Logged in see Dashboard component. 
// TODO: it checks on the authSlice.

// ! Note it does not fix or re-route yet after logging in but if reload it persists. Handle the TODOs