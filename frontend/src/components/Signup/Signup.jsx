import { useState } from "react"
import Select from "react-select"
import { Input } from "../utils/Input"
import { getCountries } from "./services/CountryService"
import { Globe } from "lucide-react"

const selectStyles = {
    control: (base, state) => ({
        ...base,
        background: "#1a1a1a",
        borderColor: state.isFocused ? "#e11d48" : "#3a3a3a",
        borderWidth: "1px",
        borderRadius: "6px",
        boxShadow: state.isFocused ? "0 0 0 1px #e11d48" : "none",
        padding: "2px 4px",
        minWidth: "150px",
        "&:hover": { borderColor: "#e11d48" },
    }),
    menu: (base) => ({
        ...base,
        background: "#1a1a1a",
        border: "1px solid #3a3a3a",
        borderRadius: "6px",
        overflow: "hidden",
    }),
    menuList: (base) => ({
        ...base,
        padding: 0,
        maxHeight: "180px",
    }),
    option: (base, state) => ({
        ...base,
        background: state.isFocused ? "#2a2a2a" : "#1a1a1a",
        color: state.isFocused ? "#e11d48" : "#ccc",
        cursor: "pointer",
        fontSize: "13px",
        padding: "8px 12px",
    }),
    singleValue: (base) => ({ ...base, color: "#f1f1f1", fontSize: "14px" }),
    placeholder: (base) => ({ ...base, color: "#555", fontSize: "13px" }),
    input: (base) => ({ ...base, color: "#f1f1f1" }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({ ...base, color: "#555", "&:hover": { color: "#e11d48" } }),
}

export const Signup = () => {
    const countries = getCountries()
    const [selectedCountry, setSelectedCountry] = useState(null)

    const options = countries.map(country => ({
        value: country.code,
        label: `${country.dialCode}  ${country.name}`,
    }))

    return (
        <div className="flex min-h-screen w-full bg-[#0d0d0d]">

            <div className="relative hidden md:flex w-[48%] flex-col justify-end p-12 overflow-hidden">

                <div
                    className="absolute inset-0 z-0 bg-center bg-cover"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80')",
                        filter: "brightness(0.35) saturate(0.8)"
                    }}
                />

                <div
                    className="absolute inset-0 z-10"
                    style={{ background: "linear-gradient(160deg, transparent 30%, rgba(225,29,72,0.18) 100%)" }}
                />

                <div className="relative z-20">
                    <span className="inline-block bg-rose-600 text-white text-[10px] font-medium tracking-[3px] uppercase px-3 py-1 rounded-sm mb-5">
                        New arrivals daily
                    </span>

                    <h1
                        className="text-white leading-none tracking-wide mb-5"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 6vw, 80px)" }}
                    >
                        Shop<br />With<br />
                        <span className="text-rose-600">Style.</span>
                    </h1>

                    <p className="text-[#888] text-sm leading-relaxed max-w-xs mb-8">
                        Join thousands of shoppers who discover curated fashion, electronics, and lifestyle products every day.
                    </p>

                    {/* Dots */}
                    <div className="flex items-center gap-1.5">
                        <span className="w-5 h-1.5 rounded-sm bg-rose-600" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-center items-center px-6 py-16 md:px-12 bg-[#111]">

                <div className="w-full max-w-sm mb-8">
                    <h2
                        className="text-white text-4xl tracking-wide leading-none mb-2"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        Create Account
                    </h2>
                    <p className="text-[#555] text-sm">
                        Already have one?{" "}
                        <a href="/login" className="text-rose-600 font-medium no-underline hover:text-rose-500 transition-colors">
                            Sign in →
                        </a>
                    </p>
                </div>

                <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={e => e.preventDefault()}>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#555] text-[11px] font-medium tracking-[1.5px] uppercase">
                            Full Name
                        </label>
                        <Input inputType="text" placeholder="John Doe" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#555] text-[11px] font-medium tracking-[1.5px] uppercase">
                            Email Address
                        </label>
                        <Input inputType="email" placeholder="john@example.com" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#555] text-[11px] font-medium tracking-[1.5px] uppercase">
                            Phone Number
                        </label>
                        <div className="flex gap-2 items-center">
                            <Select
                                options={options}
                                value={selectedCountry}
                                onChange={setSelectedCountry}
                                placeholder={
                                    <div className="flex items-center gap-1.5 text-[#555]">
                                        <Globe size={14} className="text-rose-600" />
                                        <span>Code</span>
                                    </div>
                                }
                                isSearchable
                                styles={selectStyles}
                            />
                            <div className="flex-1">
                                <Input inputType="text" placeholder="Phone number" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#555] text-[11px] font-medium tracking-[1.5px] uppercase">
                            Password
                        </label>
                        <Input inputType="password" placeholder="Min. 8 characters" />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white text-lg tracking-[2px] rounded-md transition-all duration-200 cursor-pointer"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        Create My Account
                    </button>

                </form>
            </div>
        </div>
    )
}