export default function InputTextFloatingLabel({
  label,
  placeholder,
  iconPath,
}) {
  return (
    <div className="relative z-0 group">
      {iconPath && 
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {iconPath}
        </svg>
      </div>
      }
      <input
        type="text"
        name="floating_email"
        id="floating_email"
        className={(iconPath ? "pl-10 " : " ") + "block rounded-md w-full py-2.5 pr-2 text-sm text-gray-900 bg-transparent border border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-black focus:border-black placeholder-transparent focus:placeholder-gray-500 peer"}
        placeholder={placeholder}
        required
      />
      <label
        htmlFor="floating_email"
        className={(iconPath ? "peer-placeholder-shown:ml-8 " : "") + "mr-2 ml-2 px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-black bg-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:bg-transparent peer-focus:scale-75 peer-focus:translate-x-2 peer-focus:mx-0 peer-focus:px-2 peer-focus:bg-white peer-focus:-translate-y-6"}
      >
        {label}
      </label>
    </div>
  );
}
