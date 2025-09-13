import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="w-[200px] mx-auto mt-12">
      <div className="flex justify-center flex-col gap-6">

        <Link to="/english" className="text-center border-slate-300 border-1 bg-indigo-50 hover:border-blue-400  text-slate-700 hover:text-indigo-600 font-semibold text-lg px-6 py-2 shadow-md rounded-sm">
          English
        </Link>
        <Link to="/math" className="text-center border-slate-300 border-1 bg-indigo-50 hover:border-blue-400  text-slate-700 hover:text-indigo-600 font-semibold text-lg px-6 py-2 shadow-md rounded-sm">
          Math
        </Link>


      </div>
    </div>



  )
}
