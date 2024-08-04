import { Tag } from "../App";

interface IProps {
  id: string;
  title: string;
  tags: Tag[];
}

const NoteCard = ({ id, title, tags }: IProps) => {
  return <div>NoteCard</div>;
};

export default NoteCard;
