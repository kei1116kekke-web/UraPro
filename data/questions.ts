// Question types
export type QuestionType = 'scale' | 'choice';

export interface Question {
    id: string;
    category: string;
    categoryName: string;
    text: string;
    type: QuestionType;
    options?: string[]; // For choice type
    layer: 'direct' | 'behavioral' | 'scenario'; // 3-layer validation
    crossCheckGroup?: string; // For detecting contradictions
}

// 10 Categories, 36 Questions (6 pages × 6 questions)
export const COMPREHENSIVE_QUESTIONS: Question[] = [
    // === Page 1: Category 1 (誠実さ) ===
    {
        id: 'q1',
        category: 'honesty',
        categoryName: '誠実さ・信頼性',
        text: '小さな嘘でも罪悪感を感じる',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'honesty_1'
    },
    {
        id: 'q2',
        category: 'honesty',
        categoryName: '誠実さ・信頼性',
        text: '過去1年で、約束を破った回数は？',
        type: 'choice',
        options: ['0回', '1-2回', '3-5回', '6回以上'],
        layer: 'behavioral',
        crossCheckGroup: 'honesty_1'
    },
    {
        id: 'q3',
        category: 'honesty',
        categoryName: '誠実さ・信頼性',
        text: '友人の秘密を他の人に話したことは？',
        type: 'choice',
        options: ['一度もない', '1回だけある', '複数回ある'],
        layer: 'behavioral',
        crossCheckGroup: 'honesty_2'
    },
    {
        id: 'q4',
        category: 'honesty',
        categoryName: '誠実さ・信頼性',
        text: '【状況】恋人に都合の悪いことを聞かれたら？',
        type: 'choice',
        options: ['正直に話す', '状況による', '嘘も方便', '誤魔化す'],
        layer: 'scenario',
        crossCheckGroup: 'honesty_2'
    },

    // Category 2 (コミュニケーション) - 2 questions for page balance
    {
        id: 'q5',
        category: 'communication',
        categoryName: 'コミュニケーション',
        text: '相手の話を遮らずに最後まで聞ける',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'comm_1'
    },
    {
        id: 'q6',
        category: 'communication',
        categoryName: 'コミュニケーション',
        text: '会話中、相手の顔色や反応を気にする',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'comm_2'
    },

    // === Page 2: Category 2 (Communication continued) ===
    {
        id: 'q7',
        category: 'communication',
        categoryName: 'コミュニケーション',
        text: '友人との会話で、自分が話す割合は？',
        type: 'choice',
        options: ['ほぼ聞き役', '3:7で聞く方', '半々', '7:3で話す方', 'ほぼ話す'],
        layer: 'behavioral',
        crossCheckGroup: 'comm_1'
    },
    {
        id: 'q8',
        category: 'communication',
        categoryName: 'コミュニケーション',
        text: '【状況】友人が悩みを相談してきたら？',
        type: 'choice',
        options: ['じっくり聞く', 'アドバイスする', '自分の話をする', '軽く流す'],
        layer: 'scenario',
        crossCheckGroup: 'comm_2'
    },

    // Category 3 (恋愛スタイル) - 4 questions
    {
        id: 'q9',
        category: 'love_style',
        categoryName: '恋愛スタイル',
        text: '理想の連絡頻度は？',
        type: 'choice',
        options: ['毎日複数回', '毎日1回', '2-3日に1回', '週1程度', '必要な時だけ'],
        layer: 'direct',
        crossCheckGroup: 'love_1'
    },
    {
        id: 'q10',
        category: 'love_style',
        categoryName: '恋愛スタイル',
        text: '恋人からの返信が6時間来ないと不安になる',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'love_1'
    },
    {
        id: 'q11',
        category: 'love_style',
        categoryName: '恋愛スタイル',
        text: '過去の恋愛で、連絡が原因で喧嘩したことは？',
        type: 'choice',
        options: ['よくある', 'たまにある', 'ほぼない', '一度もない'],
        layer: 'behavioral',
        crossCheckGroup: 'love_1'
    },
    {
        id: 'q12',
        category: 'love_style',
        categoryName: '恋愛スタイル',
        text: '愛情表現の方法は？',
        type: 'choice',
        options: ['言葉で伝える', '行動で示す', 'どちらも大事', 'どちらも苦手'],
        layer: 'direct',
        crossCheckGroup: 'love_2'
    },

    // === Page 3: Category 3 (Love Style) + Category 4 (Loyalty) ===
    {
        id: 'q13',
        category: 'love_style',
        categoryName: '恋愛スタイル',
        text: '【状況】恋人が急に音信不通(24時間)になったら？',
        type: 'choice',
        options: ['何度も連絡する', '数回連絡して待つ', '1日待つ', '数日待つ'],
        layer: 'scenario',
        crossCheckGroup: 'love_2'
    },

    // Category 4 (一途さ)
    {
        id: 'q14',
        category: 'loyalty',
        categoryName: '一途さ',
        text: '一度好きになったら他の人に目移りしない',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'loyalty_1'
    },
    {
        id: 'q15',
        category: 'loyalty',
        categoryName: '一途さ',
        text: '恋人がいる時、他の魅力的な異性を見ると？',
        type: 'choice',
        options: ['全く気にならない', '少し気になる', '結構気になる', 'かなり気になる'],
        layer: 'behavioral',
        crossCheckGroup: 'loyalty_1'
    },
    {
        id: 'q16',
        category: 'loyalty',
        categoryName: '一途さ',
        text: '【状況】元恋人から「やり直したい」と連絡が来たら？',
        type: 'choice',
        options: ['きっぱり断る', '少し悩む', '会って話す', '前向きに検討'],
        layer: 'scenario',
        crossCheckGroup: 'loyalty_2'
    },

    // Category 5 (情緒安定性) - 2 questions
    {
        id: 'q17',
        category: 'emotional',
        categoryName: '情緒安定性',
        text: 'イライラしても顔や態度に出さず冷静でいられる',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'emotional_1'
    },
    {
        id: 'q18',
        category: 'emotional',
        categoryName: '情緒安定性',
        text: '小さなことで不安になることが多い',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'emotional_2'
    },

    // === Page 4: Category 5 (Emotional) + Category 6 (Values) ===
    {
        id: 'q19',
        category: 'emotional',
        categoryName: '情緒安定性',
        text: '過去1ヶ月で、感情的になって後悔したことは？',
        type: 'choice',
        options: ['何度もある', '数回ある', '1回くらい', 'ない'],
        layer: 'behavioral',
        crossCheckGroup: 'emotional_1'
    },
    {
        id: 'q20',
        category: 'emotional',
        categoryName: '情緒安定性',
        text: '【状況】予定が急にキャンセルされたら？',
        type: 'choice',
        options: ['気にしない', '少しがっかり', 'かなり落ち込む', '怒る'],
        layer: 'scenario',
        crossCheckGroup: 'emotional_2'
    },

    // Category 6 (価値観)
    {
        id: 'q21',
        category: 'values',
        categoryName: '価値観',
        text: '毎月の収支を把握し、計画的に貯金できている',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'values_1'
    },
    {
        id: 'q22',
        category: 'values',
        categoryName: '価値観',
        text: '「限定」「残りわずか」に弱く衝動買いすることは？',
        type: 'choice',
        options: ['よくある', 'たまにある', 'ほぼない', '絶対ない'],
        layer: 'behavioral',
        crossCheckGroup: 'values_1'
    },
    {
        id: 'q23',
        category: 'values',
        categoryName: '価値観',
        text: 'デートの会計について、あなたの考えは？',
        type: 'choice',
        options: ['完全割り勘', '男性が多めに', '収入が多い方が', '場合による'],
        layer: 'direct',
        crossCheckGroup: 'values_2'
    },
    {
        id: 'q24',
        category: 'values',
        categoryName: '価値観',
        text: '【状況】デート中、お得なクーポンを見つけたら？',
        type: 'choice',
        options: ['絶対使う', '雰囲気次第', 'あまり使わない', '使わない'],
        layer: 'scenario',
        crossCheckGroup: 'values_2'
    },

    // === Page 5: Category 7 (Life Skills) + Category 8 (Sociability) ===
    // Category 7 (生活力)
    {
        id: 'q25',
        category: 'life_skills',
        categoryName: '生活力',
        text: '部屋は常に整理整頓されており、急な来客でも通せる',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'life_1'
    },
    {
        id: 'q26',
        category: 'life_skills',
        categoryName: '生活力',
        text: '見えない場所（クローゼット、水回り）の状態は？',
        type: 'choice',
        options: ['完璧に整頓', 'まあまあ綺麗', 'やや散らかり気味', 'かなり散らかっている'],
        layer: 'behavioral',
        crossCheckGroup: 'life_1'
    },
    {
        id: 'q27',
        category: 'life_skills',
        categoryName: '生活力',
        text: '自炊の頻度は？',
        type: 'choice',
        options: ['ほぼ毎日', '週3-4回', '週1-2回', 'ほぼしない'],
        layer: 'behavioral',
        crossCheckGroup: 'life_2'
    },

    // Category 8 (社交性)
    {
        id: 'q28',
        category: 'sociability',
        categoryName: '社交性',
        text: '初対面の人とも緊張せず、すぐに打ち解けられる',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'social_1'
    },
    {
        id: 'q29',
        category: 'sociability',
        categoryName: '社交性',
        text: '大人数の飲み会と少人数の集まり、どちらが好き？',
        type: 'choice',
        options: ['大人数が好き', 'やや大人数', 'やや少人数', '少人数が好き', '一人が好き'],
        layer: 'behavioral',
        crossCheckGroup: 'social_1'
    },
    {
        id: 'q30',
        category: 'sociability',
        categoryName: '社交性',
        text: '友人から誘われた飲み会、参加率は？',
        type: 'choice',
        options: ['ほぼ全て参加', '7割くらい', '半々', '3割くらい', 'ほぼ不参加'],
        layer: 'behavioral',
        crossCheckGroup: 'social_2'
    },

    // === Page 6: Category 9 (Self-esteem) + Category 10 (Flexibility) ===
    // Category 9 (自己肯定感)
    {
        id: 'q31',
        category: 'self_esteem',
        categoryName: '自己肯定感',
        text: '鏡を見ると、髪型や服装を入念にチェックしてしまう',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'esteem_1'
    },
    {
        id: 'q32',
        category: 'self_esteem',
        categoryName: '自己肯定感',
        text: 'SNSの「いいね」やフォロワー数は気になる？',
        type: 'choice',
        options: ['とても気になる', 'やや気になる', 'あまり気にならない', '全く気にならない'],
        layer: 'behavioral',
        crossCheckGroup: 'esteem_1'
    },
    {
        id: 'q33',
        category: 'self_esteem',
        categoryName: '自己肯定感',
        text: '自分に自信がある',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'esteem_2'
    },

    // Category 10 (柔軟性・成長)
    {
        id: 'q34',
        category: 'flexibility',
        categoryName: '柔軟性・成長',
        text: '新しい環境や変化に適応するのが得意',
        type: 'scale',
        layer: 'direct',
        crossCheckGroup: 'flex_1'
    },
    {
        id: 'q35',
        category: 'flexibility',
        categoryName: '柔軟性・成長',
        text: '過去1年で、新しいことに挑戦した回数は？',
        type: 'choice',
        options: ['5回以上', '3-4回', '1-2回', '0回'],
        layer: 'behavioral',
        crossCheckGroup: 'flex_1'
    },
    {
        id: 'q36',
        category: 'flexibility',
        categoryName: '柔軟性・成長',
        text: '【状況】やったことのない仕事を任されたら？',
        type: 'choice',
        options: ['すぐ挑戦する', '少し考える', 'かなり不安', '断りたい'],
        layer: 'scenario',
        crossCheckGroup: 'flex_2'
    },
];

// Category metadata
export const CATEGORIES = [
    { id: 'honesty', name: '誠実さ・信頼性', importance: 'high' },
    { id: 'communication', name: 'コミュニケーション', importance: 'high' },
    { id: 'love_style', name: '恋愛スタイル', importance: 'high' },
    { id: 'loyalty', name: '一途さ', importance: 'high' },
    { id: 'emotional', name: '情緒安定性', importance: 'medium' },
    { id: 'values', name: '価値観', importance: 'medium' },
    { id: 'life_skills', name: '生活力', importance: 'low' },
    { id: 'sociability', name: '社交性', importance: 'low' },
    { id: 'self_esteem', name: '自己肯定感', importance: 'low' },
    { id: 'flexibility', name: '柔軟性・成長', importance: 'low' },
] as const;
