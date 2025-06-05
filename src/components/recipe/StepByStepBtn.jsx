import { useNavigate } from "react-router-dom";
import amuStepBtn from "src/assets/icons/amu-stepBtn.png";

export function StepByStepBtn({ id }) {
  const navigate = useNavigate();

  return (
    <button className="step-by-step-btn" onClick={() => navigate(`/step-by-step/${id}`)}>
      <img src={amuStepBtn} alt="step-by-step button" className="h-16 w-16" />
      Steps
    </button>
  );
}
