import { NoteData, Tag } from "../App";
import { NoteForm } from "../components";

interface IProps {
  onSubmit: (data: NoteData) => void;
  availableTags: Tag[];
  onAddTag: (tag: Tag) => void;
}

const NewNote = ({ onSubmit, availableTags, onAddTag }: IProps) => {
  return (
    <div>
      <h1 className="text-4xl font-semibold">New note</h1>
      <NoteForm
        onSubmit={onSubmit}
        availableTags={availableTags}
        onAddTag={onAddTag}
      />
    </div>
  );
};

export default NewNote;
