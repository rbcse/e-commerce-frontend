import "@testing-library/jest-dom"
import { describe, expect, it } from "vitest"
import { getCountries } from "./CountryService"
import countries from "../../../assets/data/countries.json"

describe("getCountries",() => {
    it("Should return the countries as an array",() => {
        const result = getCountries();
        expect(result).toBeInstanceOf(Array);
    })

    it("Should return the correct countries array",() => {
        const result = getCountries();
        expect(result).toEqual(countries);
    })
})