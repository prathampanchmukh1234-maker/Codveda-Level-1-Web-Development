import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found — please login again.");
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { "x-auth-token": token }
      })
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setAvatar(res.data.avatar || avatar);
        setNewUsername(res.data.username);
        setError("");
      })
      .catch((err) => {
        console.log("Profile error:", err);
        setError("Failed to load profile. Make sure backend is running.");
      });
  }, []);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/auth/profile",
        { username: newUsername, avatar },
        { headers: { "x-auth-token": token } }
      );

      alert("Profile Updated Successfully ✅");
      setUsername(newUsername);
    } catch (error) {
      alert("Error updating profile ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Your Profile 🌌</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <img src={avatar} alt="avatar" style={styles.avatar} />
        <input type="file" accept="image/*" onChange={changeAvatar} />

        <h3 style={styles.label}>Username</h3>
        <input
          style={styles.input}
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <h3 style={styles.label}>Email</h3>
        <p style={styles.value}>{email}</p>

        <button style={styles.btn} onClick={updateProfile}>
          Save Changes
        </button>

        <button style={styles.back} onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
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
    width: "450px",
    boxShadow: "0px 10px 40px rgba(0,0,0,0.6)",
    textAlign: "center",
    border: "1px solid #1f2937",
  },
  title: {
    color: "#e5e7eb",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "3px solid #6366f1",
    objectFit: "cover",
  },
  label: {
    color: "#9ca3af",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #1f2937",
    background: "#0b1220",
    color: "#e5e7eb",
  },
  value: {
    color: "#e5e7eb",
  },
  btn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    cursor: "pointer",
  },
  back: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#374151",
    color: "white",
    cursor: "pointer",
  },
};

export default Profile;
