export type MbtiType =
    | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
    | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
    | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
    | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type LoveType =
    | '忠犬ハチ公' | '自由な野良猫' | '情熱の猛獣' | '冷静な観察者'
    // Add more as needed or keep it string for flexibility if we don't list all 16 now
    | string;

export interface ProfileData {
    name: string;
    age: string;
    job: string;
    mbti: string;
    loveType: string;
    hobbies: string[];
    bio: string;
}

export interface DiagnosisAnswers {
    [key: string]: number | string; // Support both scale (number) and choice (string) answers
}

export interface RadarStats {
    label: string;
    value: number; // 1-5
    fullMark: number; // Always 5 for Type-A
}

export interface CertificateData {
    catchphrase: string;
    titles: string[];
    stats: RadarStats[];
}

export interface FormState {
    step: number;
    profile: ProfileData;
    answers: DiagnosisAnswers;
}
