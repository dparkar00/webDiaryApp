import { useEffect, useState } from "react";
import "./App.css";
import DateComponent from './DateComponent';
import SearchBar from './SearchBar'

type DiaryEntry = {
  id: number;
  title: string;
  content: string;
  selectedDate: string;
};

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Initial date value
  const [selectedDiaryEntry, setSelectedDiaryEntry] = useState<DiaryEntry | null>(null);
  const [filteredDiaryEntries, setFilteredDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/diaryEntries");
        const { diaryEntries } = await response.json();        
        setDiaryEntries(diaryEntries);
      } catch (e) {
        console.log('Error Fetching Diary Entries:', e);
      }
    };
  
    fetchDiaryEntries();
  }, []);

  const handleDiaryEntryClick = (diaryEntry: DiaryEntry) => {
    setSelectedDiaryEntry(diaryEntry);
    setTitle(diaryEntry.title);
    setContent(diaryEntry.content);
    setSelectedDate(diaryEntry.selectedDate);
  };
  const handleAddDiaryEntry = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/diaryEntries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title ,
            content: content ,
            selectedDate: selectedDate ,
          }),
        }
      );
  
      const newDiaryEntry = await response.json();
  
      setDiaryEntries([newDiaryEntry, ...diaryEntries]);
      setTitle("");
      setContent("");
      setSelectedDate("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateDiaryEntry = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!selectedDiaryEntry) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/diaryEntries/${selectedDiaryEntry.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
           selectedDate,
          }),
        }
      );

      const updatedEntry= await response.json();

      const updatedEntriesList = diaryEntries.map((diaryEntry) =>
        diaryEntry.id === selectedDiaryEntry.id
          ? updatedEntry
          : diaryEntry
      );

      setDiaryEntries(updatedEntriesList);
      setTitle("");
      setContent("");
     setSelectedDate("");
      setSelectedDiaryEntry(null);
    } catch (e) {
      console.log(e);
    }
  };
  

  const deleteDiaryEntry = async (
    event: React.MouseEvent,
    diaryEntryID: number
  ) => {
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/diaryEntries/${diaryEntryID}`,
        {
          method: "DELETE",
        }
      );
      const updatedDiaryEntry = diaryEntries.filter(
        (diaryEntry) => diaryEntry.id !== diaryEntryID
      );

      setDiaryEntries(updatedDiaryEntry);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedDate("");
    setSelectedDiaryEntry(null);
  };
  const handleSearch = (searchTerm: string, searchType: string) => {

    // Update the filtering logic based on the selected search type
    const filteredEntries = diaryEntries.filter((entry) => {
      if (searchType === "title") {
        return entry.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchType === "date") {
        return entry.selectedDate.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });

    setFilteredDiaryEntries(filteredEntries);
    setDiaryEntries(filteredEntries);
  };



  return (
    <div className="app-container">
      
      
      
      <SearchBar onSearch={handleSearch} />
      <form 
      className="diaryEntry-form" 
      onSubmit={(event) => 
      selectedDiaryEntry 
      ? handleUpdateDiaryEntry(event) : handleAddDiaryEntry(event)
      }>
        
      
     
        <input
          value={title}
          onChange={(event) => 
            setTitle(event.target.value)
          }
          placeholder="Title"
          required
        />
        <DateComponent
          selectedDate={selectedDate}
          onSelectDate={(selectedDate) => setSelectedDate(selectedDate)}
        />
        <textarea
          value={content}
          onChange={(event) => 
            setContent(event.target.value)
          }
          placeholder="Journal Entry"
          required
        > </textarea>
        {selectedDiaryEntry ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit">Add Journal Entry</button>
        )}
      </form>


      <div className="diaryEntries-grid">
        {diaryEntries.map((diaryEntry) => (
          <div
            key={diaryEntry.id}
            className="diaryEntry-item"
            onClick={() => handleDiaryEntryClick(diaryEntry)}
          >
            <div className="diaryEntry-header">
              <button
                onClick={(event) =>
                  deleteDiaryEntry(event, diaryEntry.id)
                }
              >
                x
              </button>
            </div>
            <h2>{diaryEntry.title}</h2>
            <h3>{diaryEntry.selectedDate}</h3>
            <p>{diaryEntry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
