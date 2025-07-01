import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import LandingPage from "@/components/LandingPage/LandingPage";
import Dashboard from "@/components/Dashboard/Dashboard";

export default async function Home() {
  try {
    const session = await getServerSession(authOptions);
    console.log('session:', session);

    if (session) {
      // User is logged in - show dashboard
      return (
        <Dashboard loggedUser={session.user?.name} />
      );
    };

    // User is not logged in - show landing page
    return (
      <div>
        <LandingPage />
      </div>
    );
  } catch (err) {
    console.error(err);
  };
};
