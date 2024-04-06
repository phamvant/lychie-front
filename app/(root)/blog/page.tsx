import PostCard from "@/components/blog/blog-card";
import { Separator } from "@/components/ui/separator";

// const props = {
//   title: "No Code? No Problem! Crafting AI Apps with AWS PartyRock",
//   summary:
//     "Generative AI, LLMs, & GPTs are the buzzwords these days. Every day numerous tools & websites are launched with AI ",
//   date: "Nov 29, 2023",
//   username: "PhamVanThuan",
//   avatarLink: "https://github.com/shadcn.png",
//   liked: 50,
href: "https://github.com/phamvant/dreamhacker-front";
// };

const mockDataArray = [
  {
    title: "Sample Title 1",
    summary:
      "Generative AI, LLMs, & GPTs are the buzzwords these days. Every day numerous tools & websites are launched with AI is a sample summary for the first mock data.",
    date: "Dec 4, 2023",
    username: "User1",
    avatarLink: "https://github.com/shadcn.png",
    liked: 15,
    href: "https://github.com/phamvant/dreamhacker-front",
  },
  {
    title: "Sample Title 2",
    summary:
      "Generative AI, LLMs, & GPTs are the buzzwords these days. Every day numerous tools & websites are launched with AI is a sample summary for the second mock data.",
    date: "Dec 4, 2023",
    username: "User2",
    avatarLink: "https://github.com/shadcn.png",
    liked: 30,
    href: "https://github.com/phamvant/dreamhacker-front",
  },
  {
    title: "Sample Title 3",
    summary:
      "Generative AI, LLMs, & GPTs are the buzzwords these days. Every day numerous tools & websites are launched with AI is a sample summary for the third mock data.",
    date: "Dec 4, 2023",
    username: "User3",
    avatarLink: "https://github.com/shadcn.png",
    liked: 25,
    href: "https://github.com/phamvant/dreamhacker-front",
  },
  {
    title: "Sample Title 4",
    summary:
      "Generative AI, LLMs, & GPTs are the buzzwords these days. Every day numerous tools & websites are launched with AI is a sample summary for the fourth mock data.",
    date: "Dec 4, 2023",
    username: "User4",
    avatarLink: "https://github.com/shadcn.png",
    liked: 10,
    href: "https://github.com/phamvant/dreamhacker-front",
  },
  {
    title: "Sample Title 5",
    summary:
      "Generative AI, LLMs, & GPTs are the buzzwords these days. Every day numerous tools & websites are launched with AI is a sample summary for the fifth mock data.",
    date: "Dec 4, 2023",
    username: "User5",
    avatarLink: "https://github.com/shadcn.png",
    liked: 40,
    href: "https://github.com/phamvant/dreamhacker-front",
  },
  {
    title: "Sample Title 6",
    summary:
      "Generative AI, LLMs, & GPTs are the buzzwords these days. Every day numerous tools & websites are launched with AI is a sample summary for the sixth mock data.",
    date: "Dec 4, 2023",
    username: "User6",
    avatarLink: "https://github.com/shadcn.png",
    liked: 18,
    href: "https://github.com/phamvant/dreamhacker-front",
  },
  {
    title: "Sample Title 7",
    summary:
      "Generative AI, LLMs, & GPTs are the buzzwords these days. Every day numerous tools & websites are launched with AI is a sample summary for the seventh mock data.",
    date: "Dec 4, 2023",
    username: "User7",
    avatarLink: "https://github.com/shadcn.png",
    liked: 22,
    href: "https://github.com/phamvant/dreamhacker-front",
  },
  {
    title: "Sample Title 8",
    summary:
      "Generative AI, LLMs, & GPTs are the buzzwords these days. Every day numerous tools & websites are launched with AI is a sample summary for the eighth mock data.",
    date: "Dec 4, 2023",
    username: "User8",
    avatarLink: "https://github.com/shadcn.png",
    liked: 28,
    href: "https://github.com/phamvant/dreamhacker-front",
  },
];

const blogPage = () => {
  return (
    <div className="flex xl:w-[1280px] pt-6 items-start justify-center gap-10 rounded-lg xl:grid xl:grid-cols-9 xl:max-w-screen-xl xl:px-20 md:w-[720px]">
      <div className="lg:col-span-6">
        <div className="flex flex-col p-6 lg:p-0 gap-4">
          {mockDataArray.map((props, index) => (
            <div key={index}>
              <PostCard props={props} />
              <Separator className="my-4 lg:hidden" />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-3 hidden xl:block">
        <div className="flex flex-col gap-5">
          <div className="h-40 bg-blue-200 rounded-3xl"></div>
          <div className="h-40 bg-blue-200 rounded-3xl"></div>
          <div className="h-40 bg-blue-200 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default blogPage;
