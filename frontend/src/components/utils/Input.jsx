export const Input = ({ inputType, placeholder }) => {
    return (
        <input
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md px-4 py-3 text-[#f1f1f1] text-sm placeholder-[#444] outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-all duration-200"
            type={inputType}
            placeholder={placeholder}
        />
    )
}