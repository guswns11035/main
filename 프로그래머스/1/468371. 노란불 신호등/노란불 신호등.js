function solution(signals) {
    var answer = -1;

    const getGcd = (a, b) => b === 0 ? a : getGcd(b, a % b);
    // 최소 공배수(LCM)를 구하는 함수
    const getLcm = (a, b) => (a * b) / getGcd(a, b);

    let maxTime = 1;
    for (let i = 0; i < signals.length; i++) {
        let cycle = signals[i][0] + signals[i][1] + signals[i][2];
        maxTime = getLcm(maxTime, cycle);
    }

    for (let t = 1; t <= maxTime; t++) {
        let allYellow = true;
        
        for (let i = 0; i < signals.length; i++) {
            let g = signals[i][0];
            let y = signals[i][1];
            let r = signals[i][2];
            let cycle = g + y + r;

            let timeInCycle = (t - 1) % cycle;

            if (timeInCycle < g || timeInCycle >= g + y) {
                allYellow = false;
                break;
            }
        }

        if (allYellow) {
            answer = t;
            break;
        }
    }
    
    return answer;
}