function solution(storage, requests) {
    const n = storage.length;
    const m = storage[0].length;
    
    // 1. 창고 외곽을 덮는 패딩(빈 공간 '.')을 포함하여 2차원 배열 생성
    // 외곽(0번 인덱스, n+1 및 m+1 인덱스)은 모두 빈 공간으로 처리되어 외부 공기와 직결됨을 의미합니다.
    const grid = Array.from({ length: n + 2 }, () => Array(m + 2).fill('.'));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            grid[i + 1][j + 1] = storage[i][j];
        }
    }
    
    // 상하좌우 탐색용 배열
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    
    // 2. 요청 순서대로 처리
    for (const req of requests) {
        const target = req[0];
        
        if (req.length === 2) {
            // [크레인] 알파벳이 2개(예: "BB")인 경우: 접근성과 무관하게 창고 안의 모든 해당 컨테이너를 꺼냄
            for (let i = 1; i <= n; i++) {
                for (let j = 1; j <= m; j++) {
                    if (grid[i][j] === target) {
                        grid[i][j] = '.';
                    }
                }
            }
        } else {
            // [지게차] 알파벳이 1개(예: "A")인 경우: 창고 외부와 연결된 컨테이너만 꺼냄
            const visited = Array.from({ length: n + 2 }, () => Array(m + 2).fill(false));
            const queue = [[0, 0]]; // 무조건 외부와 연결된 패딩 공간(0,0)에서 탐색 시작
            visited[0][0] = true;
            let head = 0;
            
            const toRemove = []; // 이번 턴에 꺼낼 컨테이너들의 좌표 목록
            
            // BFS 탐색으로 외부와 연결된 빈 공간을 타고 들어감
            while (head < queue.length) {
                const [r, c] = queue[head++];
                
                for (let d = 0; d < 4; d++) {
                    const nr = r + dr[d];
                    const nc = c + dc[d];
                    
                    if (nr >= 0 && nr < n + 2 && nc >= 0 && nc < m + 2) {
                        if (!visited[nr][nc]) {
                            if (grid[nr][nc] === '.') {
                                // 인접한 곳이 빈 공간이면 큐에 넣어 계속 탐색
                                visited[nr][nc] = true;
                                queue.push([nr, nc]);
                            } else if (grid[nr][nc] === target) {
                                // 인접한 곳이 타겟 컨테이너면 접근 가능하므로 제거 목록에 추가
                                // (해당 컨테이너 너머로는 현재 턴에 탐색을 이어나가지 않음)
                                visited[nr][nc] = true;
                                toRemove.push([nr, nc]);
                            }
                        }
                    }
                }
            }
            
            // 탐색 종료 후 일괄적으로 컨테이너 꺼내기 (빈 공간으로 변경)
            for (const [r, c] of toRemove) {
                grid[r][c] = '.';
            }
        }
    }
    
    // 3. 모든 요청을 처리한 후 창고에 남아있는 컨테이너 개수 세기
    let answer = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (grid[i][j] !== '.') {
                answer++;
            }
        }
    }
    
    return answer;
}