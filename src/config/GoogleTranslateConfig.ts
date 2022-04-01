import Translate = require('@google-cloud/translate');
import AppConfig from '../config/AppConfig';
export class GoogleTranslateConfig{
    public async translateEnglishToFrench(data:string){
        const translate = new Translate.v2.Translate();
         // Making Google Transalation API Call
         translate.key = AppConfig.GOOGLE_TRANSALATOR_API_KEY;
         const translation = await translate.translate(data, AppConfig.TRANSALATE_LANGUAGE);
         return translation.toString().split('[')[0].replace(/,\s*$/, "");
         // Google Transalator API Call ends here
    }

}