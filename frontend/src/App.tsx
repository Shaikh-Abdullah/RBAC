import { useAuth } from "./auth/useAuth";

function App() {
  const { user, isLoading } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <p>Auth wired up ✅</p>
      <p>user: {user ? user.email : "null (not logged in yet)"}</p>
      <p>isLoading: {String(isLoading)}</p>
    </div>
  );
}

export default App;
