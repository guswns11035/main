function solution(m, n, h, w, drops) {
    // 1차원 배열을 사용하여 2차원 격자를 표현 (메모리 효율 및 속도 향상)
    const prefix = new Int32Array((m + 1) * (n + 1));
    
    // K개의 빗방울이 떨어졌을 때, 비를 맞지 않는 h x w 구역이 있는지 확인하는 함수
    function check(K) {
        // 배열 초기화
        prefix.fill(0);
        
        // 처음 K개의 빗방울 위치 표시
        for (let i = 0; i < K; i++) {
            const r = drops[i][0] + 1;
            const c = drops[i][1] + 1;
            prefix[r * (n + 1) + c] = 1;
        }
        
        // 2차원 누적 합 계산
        for (let r = 1; r <= m; r++) {
            for (let c = 1; c <= n; c++) {
                const idx = r * (n + 1) + c;
                prefix[idx] = prefix[idx] 
                            + prefix[(r - 1) * (n + 1) + c] 
                            + prefix[r * (n + 1) + (c - 1)] 
                            - prefix[(r - 1) * (n + 1) + (c - 1)];
            }
        }
        
        // 비를 맞지 않는(누적 합이 0인) 가장 위쪽, 왼쪽의 선인장 구역 탐색
        for (let r = 0; r <= m - h; r++) {
            for (let c = 0; c <= n - w; c++) {
                // (r, c)를 좌측 상단으로 하는 h x w 크기 구역의 빗방울 합 계산
                const sum = prefix[(r + h) * (n + 1) + (c + w)]
                          - prefix[r * (n + 1) + (c + w)]
                          - prefix[(r + h) * (n + 1) + c]
                          + prefix[r * (n + 1) + c];
                          
                if (sum === 0) {
                    return [r, c];
                }
            }
        }
        return null;
    }
    
    // 이분 탐색 초기 범위 설정 (최소 0개 ~ 최대 전체 빗방울 수)
    let low = 0;
    let high = drops.length;
    let ansK = 0;
    
    // 선인장 구역이 비를 맞지 않고 버틸 수 있는 최대 빗방울 수(시간) 탐색
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (check(mid) !== null) {
            ansK = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    // 최대 시간(ansK) 조건에서 찾아진 가장 우선순위가 높은 좌표 반환
    return check(ansK);
}