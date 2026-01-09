// Specific situational questions for friend evaluation
export const FRIEND_QUESTIONS = [
    {
        id: 'fq1',
        text: '店員や後輩への態度は横柄ですか？',
        category: 'manner'
    },
    {
        id: 'fq2',
        text: 'お酒を飲むと面倒な絡み方をしますか？',
        category: 'alcohol'
    },
    {
        id: 'fq3',
        text: '損得勘定で動くタイプですか（計算高い）？',
        category: 'calculation'
    },
    {
        id: 'fq4',
        text: '自分の話ばかりして、人の話を聞きませんか？',
        category: 'communication'
    },
    {
        id: 'fq5',
        text: 'ドタキャンや遅刻をよくしますか？',
        category: 'punctuality'
    },
    {
        id: 'fq6',
        text: 'メッセージの既読スルーが多いですか？',
        category: 'response'
    },
    {
        id: 'fq7',
        text: 'お金の使い方は荒いですか（散財型）？',
        category: 'money'
    },
    {
        id: 'fq8',
        text: 'ナルシストっぽく、自撮りや見た目の話が多いですか？',
        category: 'narcissism'
    },
    {
        id: 'fq9',
        text: 'すぐにふてくされたり、拗ねたりしますか？',
        category: 'sulking'
    },
    {
        id: 'fq10',
        text: '恋人への束縛が激しそうですか？',
        category: 'possessiveness'
    },
    {
        id: 'fq11',
        text: '自分のミスを認めず、言い訳が多いですか？',
        category: 'responsibility'
    },
    {
        id: 'fq12',
        text: '見栄を張りがちで、背伸びしている感じがしますか？',
        category: 'vanity'
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
