export default function InputSelect({options, label}) {
    return (
        <>
            <label for="options" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <select id="options" className="bg-gray-50 border border-black text-gray-900 text-sm focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {options.map(option => (
                    <option value={option.value}>{option.viewValue}</option>
                ))}
            </select>
        </>
    );
}