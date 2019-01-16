export default function stream(minutesToRun, inputPerMinute, inputModulo, inputMinute, sla ){
    let generateDataArray = generateData(minutesToRun, inputPerMinute, inputModulo, inputMinute, sla )
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

export function generateData(minutesToRun, inputPerMinute, inputModulo, inputMinute, sla ){
    let data = [];
    let currentProcessingHigh = 0;

    for(let currentMinute = 1; currentMinute < minutesToRun + sla; currentMinute++) {

        if (currentMinute % inputModulo == 0) {
            currentProcessingHigh = currentMinute * inputMinute;
        }

        data.push({currentMinute, totalDataInput: currentMinute * inputPerMinute, currentProcessingHigh })
    }

    return data;
};

export function runner(minutesToRun, inputPerMinute, inputModulo, inputMinute, sla, threads){
    let brokenCounter = -1;
    let changeCount = -1;
    let ipm = inputMinute;
    while(brokenCounter != 0) {
        brokenCounter = stream(minutesToRun, inputPerMinute, inputModulo, ipm, sla )
        ipm += 1
        changeCount += 1;
    }

    // if (changeCount == 0) {
    //     let reduction = 0;
    //     while (stream(minutesToRun, inputPerMinute, inputModulo, (ipm - reduction), sla ) == 0) {
    //         reduction += 1;
    //     }
    //     return (inputModulo * inputMinute) - reduction
    // }
    const ratio = (inputMinute * inputModulo ) / threads;
    return (ipm - 1) * inputModulo / ratio;

}