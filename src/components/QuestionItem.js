import React from 'react';

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleCorrectAnswerChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value);

    // Send PATCH request to update correct answer
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Failed to update correct answer:', response.status, response.statusText);
          return;
        }

        // Update the correct answer in the question object
        question.correctIndex = newCorrectIndex;
      })
      .catch((error) => {
        console.error('Error updating correct answer:', error);
      });
  };

  const handleDeleteClick = () => {
    // Send DELETE request to remove the question
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Failed to delete question:', response.status, response.statusText);
          return;
        }

        // Call the onDelete callback to update the state and remove the question
        onDelete(id);
      })
      .catch((error) => {
        console.error('Error deleting question:', error);
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
