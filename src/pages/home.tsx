import { Note, Tag } from "../App";
import { NoteList } from "../components";

interface IProps {
  availableTags: Tag[];
  notes: Note[];
}

const Home = ({ availableTags, notes }: IProps) => {
  console.log(availableTags);
  return (
    <div>
      <h1>List</h1>
      <NoteList notes={notes} availableTags={availableTags} />
    </div>
  );
};

export default Home;
