// Specific situational questions for friend evaluation
// Each question has custom answer options tailored to the question
export const FRIEND_QUESTIONS = [
    {
        id: 'fq1',
        text: '店員や後輩など、立場が下の人への態度はどうですか？',
        category: 'manner',
        options: [
            'めちゃくちゃ優しい',
            '丁寧で親切',
            '普通に接する',
            'やや冷たい',
            '横柄で上から目線',
        ]
    },
    {
        id: 'fq2',
        text: 'お酒を飲んだ時の様子はどうですか？',
        category: 'alcohol',
        options: [
            '全く飲まない',
            '楽しく盛り上がる',
            '普通に飲む',
            'やや絡みがち',
            'かなり面倒になる',
            '記憶を失くすレベル',
        ]
    },
    {
        id: 'fq3',
        text: '行動の基準はどこにありますか？',
        category: 'calculation',
        options: [
            '純粋に楽しさ優先',
            '周りの人のことを考える',
            '状況による',
            'やや損得を考える',
            '完全に計算高い',
        ]
    },
    {
        id: 'fq4',
        text: '会話のバランスはどうですか？',
        category: 'communication',
        options: [
            '聞き上手で話をよく聞く',
            'バランスよく話す・聞く',
            '普通',
            'やや自分の話が多い',
            'ほぼ自分の話ばかり',
        ]
    },
    {
        id: 'fq5',
        text: '約束の時間をどれくらい守りますか？',
        category: 'punctuality',
        options: [
            '必ず5分前に到着',
            'ほぼ時間通り',
            '多少遅れることもある',
            'よく10-20分遅刻',
            '平気で30分以上遅刻',
            'ドタキャンもある',
        ]
    },
    {
        id: 'fq6',
        text: 'メッセージの返信スピードはどうですか？',
        category: 'response',
        options: [
            '秒速で返信',
            '数時間以内に返信',
            '1日以内には返信',
            'たまに既読スルー',
            'よく既読スルー',
            '基本未読スルー',
        ]
    },
    {
        id: 'fq7',
        text: 'お金の使い方はどうですか？',
        category: 'money',
        options: [
            'かなり堅実・節約家',
            '計画的に使う',
            '普通',
            'やや浪費しがち',
            'かなり散財する',
        ]
    },
    {
        id: 'fq8',
        text: '自分の見た目への関心度はどうですか？',
        category: 'narcissism',
        options: [
            'ほぼ気にしない',
            '普通に身だしなみを整える',
            'おしゃれに気を使う',
            'かなり気にする',
            '自撮りや鏡チェックが多い',
            '完全にナルシスト',
        ]
    },
    {
        id: 'fq9',
        text: '機嫌が悪くなった時の態度はどうですか？',
        category: 'sulking',
        options: [
            'いつも穏やか',
            '表に出さない',
            'たまに不機嫌になる',
            'よくふてくされる',
            'すぐ拗ねる・当たる',
        ]
    },
    {
        id: 'fq10',
        text: '恋人への接し方はどんな感じですか？（予想含む）',
        category: 'possessiveness',
        options: [
            '自由を尊重する',
            '程よい距離感',
            '普通',
            'やや束縛しそう',
            'かなり束縛が激しそう',
        ]
    },
    {
        id: 'fq11',
        text: 'ミスをした時の対応はどうですか？',
        category: 'responsibility',
        options: [
            'すぐ謝罪・反省',
            '素直に認める',
            '普通',
            'やや言い訳がち',
            '絶対に認めない・言い訳ばかり',
        ]
    },
    {
        id: 'fq12',
        text: '自分を大きく見せようとする傾向はありますか？',
        category: 'vanity',
        options: [
            'ありのまま',
            '普通',
            'やや盛りがち',
            'かなり見栄を張る',
            '常に背伸びしている',
        ]
    }
];

// Impression tags for friend to select (multi-select)
export const IMPRESSION_TAGS: Array<{ id: string; label: string; category: 'positive' | 'negative' }> = [
    // Negative traits
    { id: 'late', label: '遅刻魔', category: 'negative' as 'negative' },
    { id: 'read_ignore', label: '既読スルー', category: 'negative' as 'negative' },
    { id: 'atm', label: 'ATM', category: 'negative' as 'negative' },
    { id: 'menhera', label: 'メンヘラ製造機', category: 'negative' as 'negative' },
    { id: 'narcissist', label: 'ナルシスト', category: 'negative' as 'negative' },
    { id: 'alcoholic', label: '酒乱', category: 'negative' as 'negative' },
    { id: 'calculator', label: '計算高い', category: 'negative' as 'negative' },
    { id: 'possessive', label: '束縛系', category: 'negative' as 'negative' },
    { id: 'mamakon', label: 'マザコン/ファザコン', category: 'negative' as 'negative' },
    { id: 'indecisive', label: '優柔不断', category: 'negative' as 'negative' },
    { id: 'approval', label: '承認欲求強め', category: 'negative' as 'negative' },
    { id: 'flip_flopper', label: '八方美人', category: 'negative' as 'negative' },
    { id: 'spender', label: '浪費家', category: 'negative' as 'negative' },
    { id: 'debater', label: '論破王', category: 'negative' as 'negative' },
    { id: 'complainer', label: '愚痴が多い', category: 'negative' as 'negative' },

    // Positive traits
    { id: 'loyal', label: '一途', category: 'positive' as 'positive' },
    { id: 'educated', label: '高学歴', category: 'positive' as 'positive' },
    { id: 'kind', label: '優しい', category: 'positive' as 'positive' },
    { id: 'funny', label: '面白い', category: 'positive' as 'positive' },
    { id: 'reliable', label: '頼れる', category: 'positive' as 'positive' },
    { id: 'clean', label: '清潔感がある', category: 'positive' as 'positive' },
    { id: 'smart', label: '賢い', category: 'positive' as 'positive' },
    { id: 'caring', label: '気遣いができる', category: 'positive' as 'positive' },
];
