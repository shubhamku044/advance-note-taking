import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";

interface IProps {
  onSubmit: (data: NoteData) => void;
  availableTags: Tag[];
  onAddTag: (tag: Tag) => void;
}

const NoteForm = ({ onSubmit, onAddTag, availableTags }: IProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags,
    });
    navigate("..");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-between">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              id="title"
              name="title"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <CreatableSelect
              options={availableTags.map((tag) => {
                return { value: tag.id, label: tag.label };
              })}
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setTags((prv) => [...prv, newTag]);
              }}
              isMulti
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
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            ref={markdownRef}
            id="content"
            name="content"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            rows={12}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
          <Link to="..">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
