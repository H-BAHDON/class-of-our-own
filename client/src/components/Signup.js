import { useState } from "react";

const Signup = () => {
  const [trainee, setTrainee] = useState(true);

  const viewTrainee = (status) => {
    setTrainee()
  }
  return (
    <div>
      <form>
        <h2>
          {trainee
            ? "please Enter your information to track your progress"
            : "please skip this step"}
        </h2>

        <input type="text" placeholder="Codewars username" />
        <input type="text" placeholder="Codility username" />
        <input type="submit" />
      </form>
      <div className="signup-option">
        <button>Trainee</button>
        <button>Volunteer</button>
      </div>
    </div>
  );
};

export default Signup;
