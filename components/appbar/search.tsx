import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Search = ({ className, ...props }: Props) => {
  return (
    <Input
      type="search"
      placeholder="Search..."
      className={cn("", className)}
    />
  );
};

export default Search;
