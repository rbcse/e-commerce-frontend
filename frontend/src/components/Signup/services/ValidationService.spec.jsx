import "@testing-library/jest-dom"
import {describe , it} from "vitest";
import { ValidateEmail, ValidateName, ValidatePhoneNumber } from "./ValidationService";

describe("TestNameValidation",() => {

    it("Should have exactly 3 rules and each rule must have exactly four parameters (id,label,test,error)",() => {
        const {rules , passed} = ValidateName("Rahul")
        expect(rules.length).toBe(3);
        rules.forEach(rule => {
            expect(rule).toHaveProperty("id")
            expect(rule).toHaveProperty("label")
            expect(rule).toHaveProperty("test")
            expect(rule).toHaveProperty("error")
        })
    })

    it("Should return passed = false when the lenth of name is <3",() => {
        const {rules , passed} = ValidateName("ra");
        expect(passed).toBe(false);
    })

    it("Should return passed = false when the lenth of name is >30",() => {
        const {rules , passed} = ValidateName("rahulbirawat svnit computer science branch 123 mic testing");
        expect(passed).toBe(false);
    })

    it("Should return passed = false When the name contain characters other than alphabets",() => {
        const {rules , passed} = ValidateName("ra+hul-");
        expect(passed).toBe(false);
    })

    it("Should return passed = true When the name entered is a valid one",() => {
        const {rules , passed} = ValidateName("Rahul Birawat");
        expect(passed).toBe(true);
    })

})

describe("TestEmailValidation",() => {

    it("Should have exactly 1 rule to validate email and that rule must have exactly four parameters (id,label,test,error)",() => {
        const {rules , passed} = ValidateEmail("rahul@gmail.com");
        expect(rules.length).toBe(1);
        rules.forEach(rule => {
            expect(rule).toHaveProperty("id")
            expect(rule).toHaveProperty("label")
            expect(rule).toHaveProperty("test")
            expect(rule).toHaveProperty("error")
        })
    })

    it("Should return passed = false when the email does not have @ character",() => {
        const {rules , passed} = ValidateEmail("rahulgmail.com");
        expect(passed).toBe(false);
    })

    it("Should return passed = false when the email does not have . character",() => {
        const {rules , passed} = ValidateEmail("rahul@gmailcom");
        expect(passed).toBe(false);
    })

    it("Should return passed = false when the email has more than 1 @ character",() => {
        const {rules , passed} = ValidateEmail("rahul@@@gmail.com");
        expect(passed).toBe(false);
    })

    it("Should return passed = true when the email is valid",() => {
        const {rules , passed} = ValidateEmail("rahul@gmail.com");
        expect(passed).toBe(true);
    })

})

describe("TestPhoneNumberValidation",() => {

    it("Should have exactly 3 rules and each rule must have exactly four parameters (id,label,test,error)",() => {
        const {rules , passed} = ValidatePhoneNumber("7665718067");
        expect(rules.length).toBe(3);
        rules.forEach(rule => {
            expect(rule).toHaveProperty("id")
            expect(rule).toHaveProperty("label")
            expect(rule).toHaveProperty("test")
            expect(rule).toHaveProperty("error")
        })
    })

    it("Should return passed = false when the phone number contain characters other than digits",() => {
        const {rules,passed} = ValidatePhoneNumber("766a571345")
        expect(passed).toBe(false);
    })

    it("Should return passed = false when the phone number starts with 0",() => {
        const {rules,passed} = ValidatePhoneNumber("0766571345")
        expect(passed).toBe(false);
    })

    it("Should return passed = false when the phone number length is less than 10",() => {
        const {rules,passed} = ValidatePhoneNumber("766571345")
        expect(passed).toBe(false);
    })

    it("Should return passed = false when the phone number length is greater than 10",() => {
        const {rules,passed} = ValidatePhoneNumber("766571345123")
        expect(passed).toBe(false);
    })

    it("Should return passed = true when the phone number is valid",() => {
        const {rules,passed} = ValidatePhoneNumber("7665713451")
        expect(passed).toBe(true);
    })

})