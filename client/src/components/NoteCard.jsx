export default function NoteCard({ note, onToggleDone, onTogglePin, onDelete }) {
  return (
    <div className={`note ${note.done ? "done" : ""}`} style={{ "--note-color": note.color }}>
      <div className="note-top">
        <button
          className={`check ${note.done ? "on" : ""}`}
          onClick={() => onToggleDone(note)}
          aria-label="Toggle done"
        />
        <button
          className={`icon-btn ${note.pinned ? "on" : ""}`}
          onClick={() => onTogglePin(note)}
          aria-label="Pin note"
          title="Pin"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 2l6 6-4.5 4.5L19 17l-2 2-4.5-4.5L8 19l-2-2 4.5-4.5L6 8l6-6z" />
          </svg>
        </button>
      </div>
      <h3>{note.title}</h3>
      {note.content && <p>{note.content}</p>}
      <div className="note-actions">
        <span style={{ fontSize: 11, color: "#B9AF95" }}>
          {new Date(note.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </span>
        <button className="icon-btn danger" onClick={() => onDelete(note)} aria-label="Delete note" title="Delete">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
