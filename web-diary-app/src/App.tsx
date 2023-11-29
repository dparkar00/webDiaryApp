import "./App.css";
import DateComponent from './DateComponent';

const App = () => {
  return (
    <div className="app-container">
      <form className="diaryEntry-form">
        <input placeholder="Title" required />
        <DateComponent />
        <textarea placeholder="Journal Entry"  required />

        <button type="submit">Add Journal Entry</button>
      </form>
      <div className="diaryEntry-grid">
        <div className="diaryEntry-item">
          <div className="diaryEntry-header">
            <button>x</button>
          </div>
          <h2>Moods of the day</h2>
          <p>Diary Content</p>
        </div>
      </div>
    </div>
  );
};

export default App;
