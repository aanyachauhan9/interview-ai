const API_URL = "http://localhost:5001/api/interview";

export const askInterviewQuestion = async (question) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("Error asking question:", error);
    return "Something went wrong. Please try again.";
  }
};
