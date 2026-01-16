import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5000/api/auth/dashboard?token=${token}`)
      .then((res) => setMsg(res.data.msg))
      .catch(() => {
        alert("Session expired");
        navigate("/");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dashboard 🌌</h1>

        <div style={styles.welcomeBox}>
          <h3 style={styles.welcome}>Welcome Back</h3>
          <p style={styles.text}>{msg}</p>
        </div>

        <div style={styles.buttons}>
          <button style={styles.profileBtn} onClick={() => navigate("/profile")}>
            View Profile
          </button>

          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at top, #1f2937, #0b1220)",
  },
  card: {
    background: "#111827",
    padding: "30px",
    borderRadius: "16px",
    width: "500px",
    boxShadow: "0px 10px 40px rgba(0,0,0,0.6)",
    textAlign: "center",
    border: "1px solid #1f2937",
    animation: "fadeIn 0.8s ease-in-out",
  },
  title: {
    color: "#e5e7eb",
    marginBottom: "20px",
  },
  welcomeBox: {
    background: "#0b1220",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  welcome: {
    color: "#818cf8",
  },
  text: {
    color: "#e5e7eb",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  profileBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
};

export default Dashboard;
