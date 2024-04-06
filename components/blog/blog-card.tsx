import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookmarkPlus, MessagesSquare, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";

type Post = {
  title: string;
  summary: string;
  date: string;
  liked: number;
  href: string;
};

type Creator = {
  username: string;
  avatarLink: string;
};

type Props = {
  props: Post & Creator;
};

const PostCard = ({ props }: Props) => {
  return (
    <article>
      <Card className="mb-5 max-w-6xl rounded-2xl  border-0 md:border shadow-none lg:p-6">
        <section className="flex flex-col">
          <div className="">
            <div className="flex flex-row justify-items-center items-center gap-4 pb-4">
              <a href={props.href}>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={props.avatarLink} alt="@shadcn" />
                </Avatar>
              </a>
              <div className="flex flex-col">
                <a href={props.href}>
                  <p className="font-semibold text-sm">{props.username}</p>
                  <p className="text-xs text-slate-500">{props.date}</p>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="flex flex-col gap-4">
              <CardHeader className="p-0 ">
                <CardTitle className="leading-8 hover:underline text-slate-700 font-bold">
                  <a href={props.href}>{props.title}</a>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-500 p-0 md:w-[474px] line-clamp-3">
                <a href={props.href}>{props.summary}</a>
              </CardContent>
            </div>
            <div className="">
              <a href={props.href}>
                <Image
                  src="/cover.jpg"
                  alt=""
                  className="rounded-2xl w-[400px] hover:scale-105 transition-all"
                  width={500}
                  height={200}
                />
              </a>
            </div>
          </div>
        </section>
        <CardFooter className="p-0 block">
          <div className="flex p-0 py-4 text-sm text-muted-foreground text-slate-800 justify-start gap-4 lg:justify-between">
            <div className="flex flex-row gap-4">
              <div className="flex items-center">
                <ThumbsUpIcon className="mr-1 h-3 w-3" />
                Discuss
              </div>
              <div className="flex items-center m-0">
                <MessagesSquare className="h-3 w-3 mr-1" />
                {props.liked} likes
              </div>
            </div>
            <BookmarkPlus
              color="orange"
              strokeWidth={1}
              className="hidden lg:block"
            />
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};
export default PostCard;
