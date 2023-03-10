export default function Button({ buttonText }) {
    return (
        <button href="#_" className="relative inline-block my-2 px-4 py-2 font-medium  shadow1 group">
            <span className="absolute inset-0 w-full h-full transition duration-100 ease-in transform translate-x-1 translate-y-1 bg-magenta1 group-hover:translate-x-0 group-hover:-translate-y-1 group-active:translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full transition duration-100 ease-in transform translate-x-1 translate-y-1 bg-blue1 group-hover:-translate-x-1 group-hover:translate-y-0 group-active:translate-x-0"></span>
            <span className="absolute inset-0 w-full h-full transition duration-100 ease-in transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black transition duration-100 ease-in group-active:border-2 group-active:border-white"></span>
            <span className="relative text-black group-hover:text-white">{buttonText}</span>
        </button>
    );
}