import "@testing-library/jest-dom";
import { describe , expect, it } from "vitest";
import { PasswordService } from "./PasswordService";

describe("TestPasswordService",() => {

    it("Should contain the 6 rules for validating password", () => {
        const {rules} = PasswordService({password : ""})
        expect(rules.length).toBe(6)
    })

    it("Should have id , label , test , error fields for each rule", () => {
        const {rules} = PasswordService({password : ""});
        rules.forEach(rule => {
            expect(rule).toHaveProperty("id");
            expect(rule).toHaveProperty("label");
            expect(rule).toHaveProperty("test");
            expect(rule).toHaveProperty("error");
        })
    })

    it("Should return score 0 , strength as Very Low and color as gray for an empty password",() => {
        const {rules , score , strength , color} = PasswordService({password : ""})
        expect(score).toBe(0)
        expect(strength).toBe("Very Low")
        expect(color).toBe("gray")
    })

    it("Should return score 2 , strength as Low and color as red when the password folows two criterias such as lowercase and maximum 15 characters",() => {
        const {rules , score , strength , color} = PasswordService({password : "abc"})
        expect(score).toBe(2)
        expect(strength).toBe("Low")
        expect(color).toBe("red")
    })

    it("Should return score 4 , strength as Medium and color as yellow when the password folows four criterias such as lowercase , uppercase , minimum 8 characters and maximum 15 characters",() => {
        const {rules , score , strength , color} = PasswordService({password : "abcABCrahul"})
        expect(score).toBe(4)
        expect(strength).toBe("Medium")
        expect(color).toBe("yellow")
    })

    it("Should return score 6 , strength as High and color as green when the password folows all criterias such as lowercase , uppercase , digit , minimum 8 characters , special character and maximum 15 characters",() => {
        const {rules , score , strength , color} = PasswordService({password : "Rahul@1234"})
        expect(score).toBe(6)
        expect(strength).toBe("High")
        expect(color).toBe("green")
    })

})