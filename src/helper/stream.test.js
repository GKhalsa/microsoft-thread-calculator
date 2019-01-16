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
        expect(stream(60, 300, 10, 15, 30)).toBe(2)
    });

    it("streams perfectly", () => {
        expect(stream(60, 1, 1, 1, 30)).toBe(0)
    });

    it("streams chunks", () => {
        expect(stream(30, 2, 2,.5,10)).toBe(4)
    });

    it("works with tons of input", () => {
        expect(stream(60, 300, 10,222,30)).toBe(0)
    });

    it("increases the input", () => {
        expect(runner(60, 300, 10,222,30, 300)).toBe(300)
    });

    it("has a standar", () => {
        expect(stream(60, 300,10,15,30)).toBe(2);
        expect(stream(60, 300,10,222,30)).toBe(0);
        expect(runner(60, 300, 10,15,30, 300)).toBe(4440)
    });

    it("can lower", () => {
        expect(runner(60, 300, 10,300,30, 300)).toBe(2874)
    });


});