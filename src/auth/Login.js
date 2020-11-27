import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardContent, FormControl } from "@material-ui/core";
// import Alert from "@material-ui/lab/Alert";
// import AlertTitle from "@material-ui/lab/AlertTitle";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("로그인에 실패했습니다.");
    }

    setLoading(false);
  }
  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>


      <>
        <Card
        style={{marginTop: "400px" }}
        
        >
        
          <CardContent style={{ flexDirection: "flex-start", }}>
            {error && (
              <section>
                <p>에러</p>
                로그인 실패— <strong>{error}</strong>
              </section>
            )}
            <form onSubmit={handleSubmit}>
              <FormControl>
                <label htmlFor="standard-adornment-email">이메일</label>
                <input
                  id="standard-adornment-email"
                  type="email"
                  ref={emailRef}
                  required
                />
              </FormControl>
              <FormControl>
                <label htmlFor="standard-adornment-password">비밀번호</label>
                <input
                  id="standard-adornment-password"
                  type="password"
                  ref={passwordRef}
                  required
                />
              </FormControl>

              <button
                disabled={loading}
                variant="contained"
                color="secondary"
                className="w-100"
                type="submit"
              >
                로그인
              </button>
            </form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">비밀번호 재설정</Link>
            </div>
          </CardContent>
        </Card>
        <div className="w-100 text-center mt-2">
          계정이 없으신가요? <Link to="/signup">가입하기</Link>
        </div>
      </>
    </div>
  );
}
