type Header = {
  key: string; // Corresponds to the keys of the Row type
  label: string; // Display name for the table header
};

type Row = {
  id: number;
  name: string;
  price: number;
  image: string;
  // Keeping as string per your specification
  // Add any other properties that rowsData might have
};

interface TableComponentProps {
  headers: Header[];
  rowsData: Row[];
}
