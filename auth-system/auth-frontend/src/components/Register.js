import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/register?username=${username}&email=${email}&password=${password}`
      );

      setMsg(res.data);

      if (res.data.includes("successfully")) {
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      setMsg("Error registering");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>
        <p style={styles.subtitle}>Join the dark side</p>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={register} disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        {msg && <p style={styles.message}>{msg}</p>}

        <p style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at top, #1f2937, #0b1220)",
  },
  card: {
    background: "#111827",
    padding: "30px",
    borderRadius: "16px",
    width: "360px",
    boxShadow: "0px 10px 40px rgba(0,0,0,0.6)",
    textAlign: "center",
    border: "1px solid #1f2937",
    animation: "fadeIn 0.8s ease-in-out",
  },
  title: {
    margin: "0",
    fontSize: "26px",
    color: "#e5e7eb",
  },
  subtitle: {
    color: "#9ca3af",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #1f2937",
    background: "#0b1220",
    color: "#e5e7eb",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  message: {
    marginTop: "10px",
    color: "#e5e7eb",
  },
  footer: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#9ca3af",
  },
  link: {
    color: "#818cf8",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Register;
