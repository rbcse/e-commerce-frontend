import "@testing-library/jest-dom"
import { beforeEach, describe, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react"

vi.mock("../services/CountryService", () => ({
    getCountries: () => [
        {
            name: "India",
            dialCode: "+91"
        },
        {
            name: "USA",
            dialCode: "+1"
        },
    ]
}));

vi.mock("../services/SignupService", () => ({
    createCustomerAccount: vi.fn()
}))

vi.mock("../services/PasswordService", () => ({
    PasswordService: ({ password }) => ({
        rules: [],
        score: password === "Rahul@1234" ? 6 : 0,
        strength: password === "Rahul@1234" ? "High" : "Very Low",
        color: password === "Rahul@1234" ? "green" : "gray",
    })
}));

vi.mock("../services/ValidationService", () => ({
    ValidateName: (name) => ({
        rules: [{ id: 1, label: "Name required", error: "Name is required", test: v => v.length > 0 }],
        passed: name.length > 0,
    }),
    ValidateEmail: (email) => ({
        rules: [{ id: 1, label: "Invalid email", error: "Email must contain @", test: v => v.includes("@") }],
        passed: email.includes("@"),
    }),
    ValidatePhoneNumber: (phone) => ({
        rules: [{ id: 1, label: "Invalid phone", error: "Phone must be 10 digits", test: v => v.length >= 10 }],
        passed: phone.length >= 10,
    }),
}));

import { createCustomerAccount } from "../services/SignupService";
import { UseSignup } from "./UseSignup";

describe("UseSignup hook", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    })
    it("Should return empty customer details initially", () => {
        const { result } = renderHook(() => UseSignup())
        expect(result.current.customerDetails).toEqual({
            name: "",
            email: "",
            phoneCode: null,
            phoneNumber: "",
            password: "",
        })
    })

    it("Should return country options correctly", () => {
        const { result } = renderHook(() => UseSignup());
        expect(result.current.options).toEqual([
            {
                label: "+91 India",
                value: "+91"
            },
            {
                label: "+1 USA",
                value: "+1"
            },
        ])
    })

    it("Should return false for showPassword initially", () => {
        const { result } = renderHook(() => UseSignup());
        expect(result.current.showPassword).toEqual(false);
    })

    it("Should toggle the password", () => {
        const { result } = renderHook(() => UseSignup());
        act(() => {
            result.current.togglePassword();
        })
        expect(result.current.showPassword).toEqual(true);
    })

    it("Should return all values as false intially for touched", () => {
        const { result } = renderHook(() => UseSignup());
        expect(result.current.touched).toEqual({
            name: false,
            email: false,
            phoneNumber: false,
            password: false,
        })
    })

    it("Should set the name field to be true when name is blurred", () => {
        const { result } = renderHook(() => UseSignup());
        act(() => {
            result.current.handleBlur("name");
        })

        expect(result.current.touched.name).toEqual(true);
        expect(result.current.touched.email).toEqual(false);
    })

    it("Should set email to rahul@gmail.com when handleFieldChange(email) is called", () => {
        const { result } = renderHook(() => UseSignup());
        expect(result.current.customerDetails.email).toBe("");
        act(() => {
            result.current.handleFieldChange("email", "rahul@gmail.com");
        })
        expect(result.current.customerDetails.email).toBe("rahul@gmail.com");
    })

    it("Should return isSignupFormValid = true when all details are valid",() => {
        const {result} = renderHook(() => UseSignup());
        act(() => {
            result.current.handleFieldChange("name", "rahul");
            result.current.handleFieldChange("email", "rahul@gmail.com");
            result.current.handleFieldChange("phoneNumber", "7665718067");
            result.current.handleFieldChange("password", "Rahul@1234");
        })
        expect(result.current.isSignupFormValid).toEqual(true);
    })

    it("Should return isSignupFormValid = false when any of the detail is not valid",() => {
        const {result} = renderHook(() => UseSignup());
        act(() => {
            result.current.handleFieldChange("name", "rahul");
            result.current.handleFieldChange("email", "rahulgmail.com");
            result.current.handleFieldChange("phoneNumber", "7665718067");
            result.current.handleFieldChange("password", "Rahul@1234");
        })
        expect(result.current.isSignupFormValid).toEqual(false);
    })

    it("Should not call the createCustomerAccount when any of the detail is not valid",() => {
        const {result} = renderHook(() => UseSignup());
        const mockEvent = {
            preventDefault : vi.fn()
        }
        act(() => {
            result.current.handleFieldChange("name", "rahul");
            result.current.handleFieldChange("email", "rahulgmail.com");
            result.current.handleFieldChange("phoneNumber", "7665718067");
            result.current.handleFieldChange("password", "Rahul@1234");
        })
        act(() => {
            result.current.handleSubmit(mockEvent);
        })
        expect(createCustomerAccount).not.toHaveBeenCalled();
    })

    it("Should call the createCustomerAccount when all details are valid",() => {
        const {result} = renderHook(() => UseSignup());
        const mockEvent = {
            preventDefault : vi.fn()
        }

        act(() => {
            result.current.handleFieldChange("name", "rahul");
            result.current.handleFieldChange("email", "rahul@gmail.com");
            result.current.handleFieldChange("phoneCode", {value : "+91"});
            result.current.handleFieldChange("phoneNumber", "7665718067");
            result.current.handleFieldChange("password", "Rahul@1234");
        })

        act(() => {
            result.current.handleSubmit(mockEvent)
        })

        expect(createCustomerAccount).toHaveBeenCalled();
        expect(createCustomerAccount).toHaveBeenCalledWith({
            name : "rahul",
            email : "rahul@gmail.com",
            phone_number : "+917665718067",
            password : "Rahul@1234"
        })
    })

    it("Should give the error email must contain @ when an email without @ is passed",() => {
        const invalidEmail = "rahulgmail.com";
        const {result} = renderHook(() => UseSignup());

        act(() => {
            result.current.handleFieldChange("email",invalidEmail);
        })

        expect(result.current.validationErrors.email).toEqual("Email must contain @")
    })
})