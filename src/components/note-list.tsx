import { useMemo, useState } from "react";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import NoteCard from "./note-card";

interface IProps {
  availableTags: Tag[];
  notes: Note[];
}

const NoteList = ({ availableTags, notes }: IProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (tags.length === 0 ||
          tags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id),
          ))
      );
    });
  }, [notes, title, tags]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>Notes</h2>
        <div className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit tags
          </button>
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <ReactSelect
            isMulti
            options={availableTags.map((tag) => {
              return { value: tag.id, label: tag.label };
            })}
            value={tags.map((tag) => {
              return { value: tag.id, label: tag.label };
            })}
            onChange={(values) => {
              setTags(
                values.map((value) => {
                  return { id: value.value, label: value.label };
                }),
              );
            }}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        {filteredNotes.map((note) => {
          return (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              tags={note.tags}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NoteList;
