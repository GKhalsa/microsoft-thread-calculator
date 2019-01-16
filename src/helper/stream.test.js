import stream, {generateData, runner} from './stream'

describe("stream", () => {
    it("generates", () => {
        const result = generateData(21, 300, 10, 15)
        console.log(JSON.stringify(result, null, 2))
    });

    it("generates smaller", () => {
        const result = generateData(60, 1, 1, 1, 20)
        console.log(JSON.stringify(result, null, 2))
    });

    it("generates from last test", () => {
        const result = generateData(30, 2, 2,.5)
        console.log(JSON.stringify(result, null, 2))
    });


    it("streams", () => {
        expect(stream(60, 300, 10, 150, 30)).toBe(2)
    });

    it("streams perfectly", () => {
        expect(stream(60, 1, 1, 1, 30)).toBe(0)
    });

    it("streams chunks", () => {
        expect(stream(30, 2, 2,1,10)).toBe(4)
    });

    it("works with tons of input", () => {
        expect(stream(60, 300, 10,1500,30)).toBe(26)
        //make sure this works
    });


    it("hand calculation", () => {
        expect(stream(60, 300, 10,2000,30)).toBe(47)
        //make sure this works it should break there
    });

    it("generates from last test", () => {
        const result = generateData(30, 2, 2,.5)
        console.log(JSON.stringify(result, null, 2))
    });

    // it("checks agains 4426", () => {
    //     expect(runner(60, 300, 10,2220,30, 300)).toBe(0)
    //     // expect(runner(60, 300, 10,1500,30, 300)).toBe(0)
    // });


    // it("general test", () => {
    //     expect(runner(60,300, 10, 1500, 30, 300)).toBe(0)
    // });


    it("increases the input", () => {
        expect(runner(60, 300, 10, 2220,30, 300)).toBe(300)
    });

    it("has a standar", () => {
        // expect(stream(60, 300,10,15,30)).toBe(2);
        // expect(stream(60, 300,10,222,30)).toBe(0);
        expect(runner(60, 300, 10,150,30, 300)).toBe(4426)
    });

    it("can lower", () => {
        expect(runner(60, 300, 10, 2240, 30, 300)).toBe(296.38)
        // expect(runner(60, 300, 10, 2219, 30, 300)).toBe(300)
    });


});