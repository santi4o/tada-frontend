export default function InputSelect({ options, label, id, myRef }) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={
          "block mb-2 text-sm font-medium text-gray-900 dark:text-white" +
          (label ? "" : " hidden")
        }
      >
        {label}
      </label>
      <select
        id={id}
        ref={myRef}
        className="bg-gray-50 rounded-md border border-gray-300 text-gray-900 text-sm focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.viewValue}
          </option>
        ))}
      </select>
    </div>
  );
}
