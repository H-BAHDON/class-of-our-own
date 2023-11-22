import githubImage from "../assets/github.png";
const Login = () => {
  return (
    <div className="login">
      <div className="login-title">
        <h3>Log in With GitHub Account</h3>
      </div>

      <div className="loginButton">
        <img src={githubImage} alt="Github icon" className="icon" />
        GitHub
      </div>
    </div>
  );
};

export default Login;
