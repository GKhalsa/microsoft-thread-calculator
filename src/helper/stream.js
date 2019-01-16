export default function stream(minutesToRun, inputPerMinute, inputModulo, outputPerMin, sla ){
    let generateDataArray = generateData(minutesToRun, inputPerMinute, inputModulo, outputPerMin, sla )
    let whenSlaIsBroken = 0;

    for(let dataObj = 0; dataObj < generateDataArray.length - sla; dataObj++) {
        const {currentMinute, totalDataInput} = generateDataArray[dataObj];
        const indexToCheckAgainst =  (currentMinute + sla) - 1 ;
        const totalProcessed = generateDataArray[indexToCheckAgainst].currentProcessingHigh;
        if (totalDataInput > totalProcessed){
            whenSlaIsBroken = currentMinute;
            break;
        }
    }
    return whenSlaIsBroken
}

export function generateData(minutesToRun, inputPerMinute, inputModulo, outputPerMin, sla ){
    let data = [];
    let currentProcessingHigh = 0;

    for(let currentMinute = 1; currentMinute < minutesToRun + sla; currentMinute++) {

        if (currentMinute % inputModulo == 0) {
            currentProcessingHigh += outputPerMin ;
        }

        data.push({currentMinute, totalDataInput: currentMinute * inputPerMinute, currentProcessingHigh })
    }

    return data;
};

export function runner(minutesToRun, inputPerMinute, inputModulo, outputPerMin, sla, threads){
    let brokenCounter = -1;
    let changeCount = -1;
    let opm = outputPerMin;
    while(brokenCounter != 0) {
        brokenCounter = stream(minutesToRun, inputPerMinute, inputModulo, opm, sla );
        opm += 1
        // console.log("heyyyyyyyy")
        changeCount += 1;
    }

    if (changeCount == 0) {
        let reduction = 0;
        while (stream(minutesToRun, inputPerMinute, inputModulo, (outputPerMin - reduction), sla ) === 0) {
            reduction += 1;
        }
        const reductionRatio =  (outputPerMin - (reduction - 1)) / outputPerMin;
        console.log("OUTPUTPERMIN: ", outputPerMin)
        // console.log("REDUCTION: ", reduction)
        console.log("OUTPUTPERMIN: ", outputPerMin - (reduction - 1))
        const threadRatio = threads * reductionRatio;
        console.log("REDUCTION RATIO: ", reductionRatio)
        console.log("REDUCTION RATIO: ", reductionRatio * 300)
        console.log("OUTPUTPERMIN: ", threadRatio)


        return threadRatio;
    }

    // const ratio = (inputMinute * inputModulo ) / threads;
    // return (ipm - 1) * inputModulo / ratio;

    const ratio = outputPerMin / threads;
    console.log("OPM: ",opm)
    return (opm - 1) / ratio;

}