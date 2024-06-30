import Layout from "@/components/Layout";

export default function Home() {
  // Simulate session data for testing purposes (replace with your actual session handling)
  const session = {
    user: {
      name: "Admin User",
      image: "/path/to/admin-image.jpg",
      email: "alsiddeg.omer19990@gmail.com", // Replace with your admin email
    },
  };

  // Check if session exists (simulating logged-in state)
  const isLoggedIn = !!session;

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="bg-blue-900 w-screen h-screen flex items-center">
          <div className="text-center w-full">
            <p className="text-white text-lg">
              You are not logged in. Please log in to access the application.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Render admin dashboard content
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>Hello, <b>{session.user.name}</b></h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session.user.image} alt="" className="w-6 h-6" />
          <span className="px-2">{session.user.name}</span>
        </div>
      </div>
    </Layout>
  );
}
