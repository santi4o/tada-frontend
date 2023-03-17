export default function InputText({ label, placeholder, myRef }) {
  return (
    <div className="flex items-center">
      {label && (
        <label
          htmlFor="floating_email"
          className="mr-2 text-gray-900 dark:text-gray-400 bg-white peer-focus:dark:text-blue-500"
        >
          {label}
        </label>
      )}
      <input
        ref={myRef}
        type="text"
        name="floating_email"
        id="floating_email"
        className="block rounded-md w-full py-2.5 pr-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-black focus:border-black  focus:placeholder-gray-500 peer"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
