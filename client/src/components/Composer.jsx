import { useState } from "react";

const COLORS = ["#E7A83D", "#6FA88A", "#8B7FD1", "#D1717A", "#5AA6C9"];

export default function Composer({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  const submit = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), content: content.trim(), color });
    setTitle("");
    setContent("");
  };

  return (
    <div className="composer">
      <input
        type="text"
        placeholder="What needs doing?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), submit())}
      />
      <textarea
        placeholder="Add a note (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
      />
      <div className="composer-row">
        <div className="swatches">
          {COLORS.map((c) => (
            <div
              key={c}
              className={`swatch ${color === c ? "active" : ""}`}
              style={{ background: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <button className="add-btn" onClick={submit} disabled={!title.trim()}>
          Add note
        </button>
      </div>
    </div>
  );
}
