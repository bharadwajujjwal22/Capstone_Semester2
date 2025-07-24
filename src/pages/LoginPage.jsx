import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo">🛒</div>
        <h2 style={{ marginBottom: 8 }}>{isRegister ? "Create Account" : "Sign In"}</h2>
        <p style={{ color: '#888', marginBottom: 24 }}>{isRegister ? "Register to start shopping!" : "Login to your account"}</p>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? (isRegister ? "Registering..." : "Logging in...") : (isRegister ? "Register" : "Login")}
          </button>
        </form>
        <div className="auth-switch">
          <span>{isRegister ? "Already have an account?" : "Don't have an account?"}</span>
          <button type="button" className="auth-link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </button>
        </div>
      </div>
      <style>{`
        .auth-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #f8fafc 0%, #e3f0ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 6px 32px 0 rgba(0,0,0,0.08);
          padding: 40px 32px 32px 32px;
          width: 100%;
          max-width: 370px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1);
        }
        .auth-logo {
          font-size: 2.6rem;
          margin-bottom: 12px;
        }
        .auth-field {
          width: 100%;
          margin-bottom: 18px;
        }
        .auth-label {
          display: block;
          margin-bottom: 6px;
          color: #222;
          font-weight: 500;
          font-size: 15px;
        }
        .auth-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #dbeafe;
          border-radius: 7px;
          font-size: 15px;
          background: #f6faff;
          transition: border 0.2s;
        }
        .auth-input:focus {
          border: 1.5px solid #007AFF;
          outline: none;
          background: #fff;
        }
        .auth-btn {
          width: 100%;
          padding: 12px 0;
          background: linear-gradient(90deg, #007AFF 0%, #0051c7 100%);
          color: #fff;
          border: none;
          border-radius: 7px;
          font-size: 16px;
          font-weight: 600;
          margin-top: 8px;
          margin-bottom: 8px;
          cursor: pointer;
          box-shadow: 0 2px 8px 0 rgba(0,122,255,0.08);
          transition: background 0.2s, box-shadow 0.2s;
        }
        .auth-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .auth-btn:hover:not(:disabled) {
          background: linear-gradient(90deg, #0051c7 0%, #007AFF 100%);
          box-shadow: 0 4px 16px 0 rgba(0,122,255,0.13);
        }
        .auth-error {
          color: #ff3b30;
          background: #fff0f0;
          border-radius: 6px;
          padding: 8px 12px;
          margin-bottom: 10px;
          width: 100%;
          text-align: center;
          font-size: 14px;
        }
        .auth-switch {
          margin-top: 10px;
          text-align: center;
          font-size: 15px;
        }
        .auth-link {
          background: none;
          border: none;
          color: #007AFF;
          font-weight: 600;
          margin-left: 6px;
          cursor: pointer;
          text-decoration: underline;
          font-size: 15px;
          transition: color 0.2s;
        }
        .auth-link:hover {
          color: #0051c7;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage; 