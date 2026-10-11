function solution(players, m, k) {
    let answer = 0;
    // 각 시간대별로 증설한 서버의 수를 저장할 배열 (0시 ~ 23시)
    let added = new Array(24).fill(0);
    
    for (let i = 0; i < 24; i++) {
        // 해당 시간대에 필요한 최소 서버 수
        let requiredServers = Math.floor(players[i] / m);
        
        // 현재 운영 중인 서버 수 계산 (i - k + 1 시간대부터 i 시간대까지 증설된 서버의 합)
        let currentRunningServers = 0;
        let startTime = Math.max(0, i - k + 1);
        
        for (let j = startTime; j <= i; j++) {
            currentRunningServers += added[j];
        }
        
        // 필요한 서버 수보다 현재 운영 중인 서버 수가 적다면 증설
        if (currentRunningServers < requiredServers) {
            let needToAdd = requiredServers - currentRunningServers;
            added[i] = needToAdd; // i시에 needToAdd 대 증설
            answer += needToAdd;  // 총 증설 횟수에 누적
        }
    }
    
    return answer;
}