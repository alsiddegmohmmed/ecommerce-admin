import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  // Render the Component with its pageProps directly
  return <Component {...pageProps} />;
}
