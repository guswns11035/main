function solution(n, infection, edges, k) {
    var adj = Array.from({length: n + 1}, () => []);
    for (var i = 0; i < edges.length; i++) {
        var u = edges[i][0];
        var v = edges[i][1];
        var type = edges[i][2];
        adj[u].push({to: v, type: type});
        adj[v].push({to: u, type: type});
        }
    var answer = 0;

    function spread(currentInfected, type) {
        var nextInfected = new Set(currentInfected);
        var queue = Array.from(currentInfected);
        var head = 0;

        while (head < queue.length) {
            var u = queue[head++];
            for (var j = 0; j < adj[u].length; j++) {
                var edge = adj[u][j];
                if (edge.type === type && !nextInfected.has(edge.to)) {
                    nextInfected.add(edge.to);
                    queue.push(edge.to);
                }
            }
        }
        return nextInfected;
    }

    function dfs(step, currentInfected) {
        if (currentInfected.size > answer) {
            answer = currentInfected.size;
        }

        if (answer === n || step === k) return;

        for (var type = 1; type <= 3; type++) {
            var nextInfected = spread(currentInfected, type);

            if (nextInfected.size > currentInfected.size) {
                dfs(step + 1, nextInfected);
            }
        }
    }

    dfs(0, new Set([infection]));

    return answer;
}