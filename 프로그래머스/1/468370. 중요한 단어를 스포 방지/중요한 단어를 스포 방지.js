function solution(message, spoiler_ranges) {
    var answer = 0;
    
    let words = [];
    let startIdx = 0;
    let parts = message.split(' ');
    
    for (let i = 0; i < parts.length; i++) {
        let text = parts[i];
        let endIdx = startIdx + text.length - 1;
        words.push({ text: text, start: startIdx, end: endIdx });
        startIdx = endIdx + 2; 
    }

    let nonSpoilerWords = new Set();

    let spoilerWordsByRange = Array.from({ length: spoiler_ranges.length }, () => []);

    for (let i = 0; i < words.length; i++) {
        let w = words[i];
        let isSpoiler = false;
        let lastRangeIdx = -1;
        
        for (let j = 0; j < spoiler_ranges.length; j++) {
            let r = spoiler_ranges[j];
            if (Math.max(w.start, r[0]) <= Math.min(w.end, r[1])) {
                isSpoiler = true;
                lastRangeIdx = Math.max(lastRangeIdx, j);
            }
        }
        
        if (!isSpoiler) {
            nonSpoilerWords.add(w.text);
        } else {
            spoilerWordsByRange[lastRangeIdx].push(w.text);
        }
    }

    let revealedWords = new Set();
    
    for (let j = 0; j < spoiler_ranges.length; j++) {
        let newlyRevealed = spoilerWordsByRange[j];

        for (let k = 0; k < newlyRevealed.length; k++) {
            let wordText = newlyRevealed[k];
            let isImportant = true;

            if (nonSpoilerWords.has(wordText)) {
                isImportant = false;
            }

            if (revealedWords.has(wordText)) {
                isImportant = false;
            }
            
            if (isImportant) {
                answer++;
            }
            
            revealedWords.add(wordText);
        }
    }
    
    return answer;
}