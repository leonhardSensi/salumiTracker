export default function LoadingCard() {
  return (
    <div className="w-2/3 bg-white rounded overflow-hidden shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
      {/* <div className="w-full h-32 bg-gray-500 rounded animate-pulse"></div> */}
      <div className="w-2/5 h-1/2 px-6 py-4 m-4 bg-gray-500 rounded animate-pulse"></div>
      <div className="animate-pulse">
        <div className="h-4 px-6 m-4 bg-gray-500 rounded w-1/4"></div>
        <div className="h-4 px-6 m-4 bg-gray-500 rounded w-1/2"></div>
      </div>
    </div>
  );
}
