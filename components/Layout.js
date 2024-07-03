import Nav from "@/components/Nav";

export default function Layout({ children }) {
  // Simulate session data for testing purposes (replace with your actual session handling)
  const session = {
    user: {
      name: "Siddeg Omer",
      image: "https://lh3.googleusercontent.com/ogw/AF2bZyhhOdiUSDOcitII29_hcoAk8HwLB4g2lcBo1kiVUxX-3HA=s64-c-mo",
      email: "alsiddeg.omer19990@gmail.com", // Replace with your admin email
    },
  };

  // Check if session exists (simulating logged-in state)
  const isLoggedIn = !!session;

  if (!isLoggedIn) {
    // Replace with your desired behavior if no session is available
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <p className="text-white text-lg">
            You are not logged in. Please log in to access the application.
          </p>
        </div>
      </div>
    );
  }

  // Render the layout with navigation and children
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-1 rounded-lg p-4 mb-2">
        {children}
      </div>
    </div>
  );
}
