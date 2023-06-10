export interface ReCaptchaModel {
    success: boolean;
    score: string;
    action: string;
    challengeTs: string;
    hostName: string;
    errorCodes: string[];    
}
