import { Link } from "react-router-dom";

export const ListQuiz = () => {
  return (
    <div className="w-[200px] mx-auto mt-12">
      <div className="flex justify-center flex-col gap-4">

        <Link to="/english/plural-singular" className="bg-indigo-700 text-center hover:bg-indigo-600 text-slate-100 font-semibold text-lg px-6 py-2 shadow-md rounded-sm">
          Plural & Singular
        </Link>
        <Link to="/english/plural-singular" className="bg-indigo-700 text-center hover:bg-indigo-600 text-slate-100 font-semibold text-lg px-6 py-2 shadow-md rounded-sm">
          Part of Speech

        </Link>


      </div>
    </div>



  )
}
