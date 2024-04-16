import CommentsTable from "@/components/CommentsTable";

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl flex flex-col items-center p-4">
      <h1 className="font-bold py-4">Reseñas página Principal</h1>
      <CommentsTable></CommentsTable>
    </div>
  );
};
export default Home;
