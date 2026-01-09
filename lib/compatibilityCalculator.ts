interface CategoryScores {
    [category: string]: number;
}

interface CompatibilityResult {
    riskScore: number; // 0-100
    level: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    categoryDiffs: { category: string; diff: number; person1: number; person2: number }[];
    advice: string[];
}

/**
 * Calculate compatibility risk between two people based on their diagnosis scores
 * Higher risk = worse compatibility
 */
export function calculateCompatibility(
    scores1: CategoryScores,
    scores2: CategoryScores
): CompatibilityResult {
    const categories = Object.keys(scores1);

    // Calculate differences for each category
    const categoryDiffs = categories.map(cat => ({
        category: cat,
        diff: Math.abs((scores1[cat] || 4) - (scores2[cat] || 4)),
        person1: scores1[cat] || 4,
        person2: scores2[cat] || 4,
    }));

    // Calculate total difference
    const totalDiff = categoryDiffs.reduce((sum, item) => sum + item.diff, 0);

    // Maximum possible difference (7 points per category * number of categories)
    const maxPossibleDiff = categories.length * 6; // 7-point scale: max diff is 6

    // Risk score (0-100%)
    const riskScore = Math.round((totalDiff / maxPossibleDiff) * 100);

    // Determine risk level
    let level: 'low' | 'medium' | 'high' | 'critical';
    let message: string;
    let advice: string[] = [];

    if (riskScore < 20) {
        level = 'low';
        message = '良好な相性です';
        advice = [
            '価値観が近く、理解し合いやすい関係です',
            'このバランスを大切に維持しましょう',
            '小さな違いも尊重し合うことが長続きの秘訣です'
        ];
    } else if (riskScore < 40) {
        level = 'medium';
        message = '注意が必要です';
        advice = [
            'いくつかの価値観に違いがあります',
            'お互いの違いを認め合うことが重要です',
            'コミュニケーションを密に取りましょう'
        ];
    } else if (riskScore < 60) {
        level = 'high';
        message = '警告レベルです';
        advice = [
            '価値観の相違が大きい可能性があります',
            '衝突を避けるため、事前の話し合いが必須です',
            '譲れない点と譲れる点を明確にしましょう'
        ];
    } else {
        level = 'critical';
        message = '危険：慎重な判断を';
        advice = [
            '致命的な価値観の不一致が検出されました',
            '関係を続ける場合は覚悟が必要です',
            '第三者（カウンセラー等）への相談を推奨します'
        ];
    }

    // Add specific advice based on large differences
    categoryDiffs
        .filter(item => item.diff >= 4)
        .forEach(item => {
            advice.push(`【${item.category}】で大きな差異あり（${item.diff}pt差）`);
        });

    return {
        riskScore,
        level,
        message,
        categoryDiffs,
        advice
    };
}

/**
 * Get color class based on risk level
 */
export function getRiskColor(level: string): string {
    switch (level) {
        case 'low':
            return 'text-green-600 bg-green-50 border-green-300';
        case 'medium':
            return 'text-yellow-600 bg-yellow-50 border-yellow-300';
        case 'high':
            return 'text-orange-600 bg-orange-50 border-orange-300';
        case 'critical':
            return 'text-red-600 bg-red-50 border-red-300';
        default:
            return 'text-gray-600 bg-gray-50 border-gray-300';
    }
}
