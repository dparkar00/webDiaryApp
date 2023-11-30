import React, { useState } from "react";
import "./App.css";
import DateComponent from './DateComponent';

interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  date: Date;
}

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Initial date value
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
      date: new Date(),
    },
    // ... other entries
  ]);
  const [selectedDiaryEntry, setSelectedDiaryEntry] = useState<DiaryEntry | null>(null);

  const handleDiaryEntryClick = (diaryEntry: DiaryEntry) => {
    setSelectedDiaryEntry(diaryEntry);
    setTitle(diaryEntry.title);
    setContent(diaryEntry.content);
    setSelectedDate(diaryEntry.date);
  };

  const handleUpdateDiaryEntry = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedDiaryEntry) {
      return;
    }

    const updatedDiaryEntry: DiaryEntry = {
      id: selectedDiaryEntry.id,
      title: title,
      content: content,
      date: selectedDate, // Use the selected date
    };

    const updatedEntriesList = diaryEntries.map((diaryEntry) => (
      diaryEntry.id === selectedDiaryEntry.id ? updatedDiaryEntry : diaryEntry
    ));

    setDiaryEntries(updatedEntriesList);
    setTitle("");
    setContent("");
    setSelectedDate(new Date()); // Reset selected date
    setSelectedDiaryEntry(null);
  };

  const handleAddDiaryEntry = (event: React.FormEvent) => {
    event.preventDefault();

    const newDiaryEntry: DiaryEntry = {
      id: diaryEntries.length + 1,
      title: title,
      content: content,
      date: selectedDate, // Use the selected date
    };

    // Update the state with the new entry
    setDiaryEntries([...diaryEntries, newDiaryEntry]);

    // Clear the input fields
    setTitle("");
    setContent("");
    setSelectedDate(new Date()); // Reset selected date
  };

  return (
    <div className="app-container">
      <form className="diaryEntry-form" onSubmit={(event) => (selectedDiaryEntry ? handleUpdateDiaryEntry(event) : handleAddDiaryEntry(event))}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <DateComponent
          // Specify the date type
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Journal Entry"
          required
        />
        <button type="submit">Add Journal Entry</button>
      </form>
      <div className="diaryEntry-grid">
        {diaryEntries.map((diaryEntry) => (
          <div key={diaryEntry.id} className="diaryEntry-item" onClick={() => handleDiaryEntryClick(diaryEntry)}>
            <div className="diaryEntry-header">
              <button>x</button>
            </div>
            <h2>{diaryEntry.title}</h2>
            <h3> {diaryEntry.date.toDateString()}</h3>
            <p>{diaryEntry.content}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
