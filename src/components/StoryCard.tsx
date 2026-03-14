interface StoryCardProps {
  title: string;
  summary: string;
}

export default function StoryCard({ title, summary }: StoryCardProps) {
  return (
    <div className="card w-64 m-4 cursor-pointer hover:bg-gradient-to-r from-yellow-200 to-pink-200">
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <p className="text-gray-700">{summary}</p>
    </div>
  );
}
