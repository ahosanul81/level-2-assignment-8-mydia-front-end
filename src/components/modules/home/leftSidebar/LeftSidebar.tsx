import Category from "./Category";

export default function LeftSidebar() {
  return (
    <div className="relative flex h-[calc(100vh-20rem)] w-full max-w-[17rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <Category />
      </nav>
    </div>
  );
}
