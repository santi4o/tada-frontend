export default function Button({ buttonText, handleClick }) {
  return (
      <button
        className="relative inline-block px-4 py-2 font-medium group w-full sm:w-fit"
        onClick={() => handleClick()}
      >
        <span className="absolute rounded-lg inset-0 w-full h-full transition duration-100 ease-in transform translate-x-1 translate-y-0.5 bg-magenta1 group-hover:translate-x-0 group-hover:-translate-y-0.5 group-active:translate-y-0"></span>
        <span className="absolute rounded-lg inset-0 w-full h-full transition duration-100 ease-in transform translate-x-1 translate-y-0.5 bg-blue1 group-hover:-translate-x-1 group-hover:translate-y-0 group-active:translate-x-0"></span>
        <span className="absolute rounded-md inset-0 w-full h-full transition duration-100 ease-in transform translate-x-1 translate-y-0.5 bg-black dark:bg-white group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute rounded-md inset-0 w-full h-full bg-white dark:bg-black border-2 border-black dark:border-white  group-hover:bg-black group-hover:dark:bg-white transition duration-100 ease-in"></span>
        <span className="relative text-black dark:text-white group-hover:text-white  group-hover:dark:text-black ">
          <p className="group-active:multicolortext0">{buttonText}</p>
        </span>
      </button>
  );
}
