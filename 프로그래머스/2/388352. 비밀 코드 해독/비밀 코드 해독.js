function solution(n, q, ans) {
    var answer = 0;
    const m = q.length;

    // 두 배열(비밀코드 후보와 입력한 정수)의 일치하는 숫자 개수를 세는 함수
    function getIntersectionCount(arr1, arr2) {
        let count = 0;
        for (let i = 0; i < 5; i++) {
            if (arr2.includes(arr1[i])) {
                count++;
            }
        }
        return count;
    }

    // 1부터 n까지의 수 중 5개를 선택하는 조합 생성 (DFS)
    function dfs(start, currentComb) {
        // 5개의 정수가 모두 선택되었을 때
        if (currentComb.length === 5) {
            let isValid = true;
            
            // 각 시도(m번)와 비교하여 조건을 모두 만족하는지 확인
            for (let i = 0; i < m; i++) {
                if (getIntersectionCount(currentComb, q[i]) !== ans[i]) {
                    isValid = false;
                    break;
                }
            }
            
            // 모든 조건을 만족하면 가능한 비밀 코드로 카운트
            if (isValid) {
                answer++;
            }
            return;
        }

        // 오름차순 조합 생성을 위해 start부터 n까지 탐색
        for (let i = start; i <= n; i++) {
            currentComb.push(i);
            dfs(i + 1, currentComb);
            currentComb.pop();
        }
    }

    // 1부터 시작하여 빈 배열에 조합 생성 시작
    dfs(1, []);

    return answer;
}