import { useEffect, useState } from "react";
import axios from "axios";
import Composer from "./components/Composer.jsx";
import NoteCard from "./components/NoteCard.jsx";

export default function App() {
  const [notes, setNotes] = useState([]);

  const load = async () => {
    const { data } = await axios.get("/api/notes");
    setNotes(data);
  };

  useEffect(() => { load(); }, []);

  const addNote = async (note) => {
    const { data } = await axios.post("/api/notes", note);
    setNotes((prev) => [data, ...prev]);
  };

  const updateNote = async (note, patch) => {
    const { data } = await axios.put(`/api/notes/${note._id}`, patch);
    setNotes((prev) => prev.map((n) => (n._id === note._id ? data : n)));
  };

  const deleteNote = async (note) => {
    await axios.delete(`/api/notes/${note._id}`);
    setNotes((prev) => prev.filter((n) => n._id !== note._id));
  };

  const pinned = notes.filter((n) => n.pinned);
  const rest = notes.filter((n) => !n.pinned);

  return (
    <div className="app">
      <div className="masthead">
        <div className="masthead-copy">
          <h1>Shashank's Kept</h1>
          <h5>In the midst of difficulty, there is opportunity.</h5>
        </div>
        <span className="count">{notes.filter((n) => !n.done).length} open</span>
      </div>

      <Composer onAdd={addNote} />

      {notes.length === 0 ? (
        <div className="empty">Nothing kept yet — add your first note above.</div>
      ) : (
        <div className="board">
          {[...pinned, ...rest].map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onToggleDone={(n) => updateNote(n, { done: !n.done })}
              onTogglePin={(n) => updateNote(n, { pinned: !n.pinned })}
              onDelete={deleteNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}
