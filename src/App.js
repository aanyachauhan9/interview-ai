import React, { useState } from "react";
import { askInterviewQuestion } from "./services/InterviewService";
import "./index.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const response = await askInterviewQuestion(question);
    setAnswer(response);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Interview Taker AI</h1>
      <textarea
        placeholder="Ask a technical interview question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Asking..." : "Ask"}
      </button>
      <div className="answer">
        <h3>Answer:</h3>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default App;
