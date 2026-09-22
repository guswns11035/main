function solution(cost, hint) {
    const n = cost.length;
    let minTotalCost = Infinity;
    
    // 구매 가능한 힌트 번들은 총 n-1개이므로, 가능한 조합의 수는 2^(n-1)개
    const numCombinations = 1 << (n - 1);

    // 0부터 2^(n-1)-1 까지 모든 조합 탐색
    for (let mask = 0; mask < numCombinations; mask++) {
        let currentCost = 0;
        const tickets = new Int32Array(n);

        // 현재 마스크(조합)에 따라 힌트 번들 구매 처리
        for (let i = 0; i < n - 1; i++) {
            // i번째 힌트 번들을 구매하는 경우 (비트가 1인 경우)
            if ((mask & (1 << i)) !== 0) {
                currentCost += hint[i][0]; // 번들 가격 합산
                
                // 번들에 포함된 힌트권 수집 (j=1부터 시작)
                for (let j = 1; j < hint[i].length; j++) {
                    const targetStage = hint[i][j] - 1; // 0-based 인덱스로 변환
                    tickets[targetStage]++;
                }
            }
        }

        // 수집된 힌트권을 바탕으로 각 스테이지 클리어 비용 계산
        for (let i = 0; i < n; i++) {
            // 한 스테이지에서 사용 가능한 힌트권은 최대 n-1개로 제한
            const usableTickets = Math.min(tickets[i], n - 1);
            currentCost += cost[i][usableTickets];
        }

        // 최소 전체 비용 갱신
        if (currentCost < minTotalCost) {
            minTotalCost = currentCost;
        }
    }

    return minTotalCost;
}