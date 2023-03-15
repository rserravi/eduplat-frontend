const SocialNets = [
    {
        "lang" : "es",
        "network":{
            "facebook": "http://facebook.com/EduPlat.org",
            "twitter": "http://twitter.com/EduPlat_es",
            "instagram": "http://instagram.com/eduplat_org",
            "tiktok":"https://www.tiktok.com/@eduplat_org",
            "linkedin":"https://www.linkedin.com/company/eduplat/",
            "telegram": "https://t.me/EduPlat"
        }
    },
    {
        "lang" : "en",
        "network":{
            "facebook": "http://facebook.com/EduPlat.org",
            "twitter": "http://twitter.com/EduPlat_en",
            "instagram": "http://instagram.com/eduplat_org",
            "tiktok":"https://www.tiktok.com/@eduplat_org",
            "linkedin":"https://www.linkedin.com/company/eduplat/",
            "telegram": "https://t.me/EduPlat"
        }
    },
    {
        "lang" : "pt",
        "network":{
            "facebook": "http://facebook.com/EduPlat.org",
            "twitter": "http://twitter.com/EduPlat_pt",
            "instagram": "http://instagram.com/eduplat_org",
            "tiktok":"https://www.tiktok.com/@eduplat_org",
            "linkedin":"https://www.linkedin.com/company/eduplat/",
            "telegram": "https://t.me/EduPlat"
        }
    },
    {
        "lang" : "gr",
        "network":{
            "facebook": "http://facebook.com/EduPlat.org",
            "twitter": "http://twitter.com/EduPlat_gr",
            "instagram": "http://instagram.com/eduplat_org",
            "tiktok":"https://www.tiktok.com/@eduplat_org",
            "linkedin":"https://www.linkedin.com/company/eduplat/",
            "telegram": "https://t.me/EduPlat"
        }
    },
    {
        "lang" : "it",
        "network":{
            "facebook": "http://facebook.com/EduPlat.org",
            "twitter": "http://twitter.com/EduPlat_it",
            "instagram": "http://instagram.com/eduplat_org",
            "tiktok":"https://www.tiktok.com/@eduplat_org",
            "linkedin":"https://www.linkedin.com/company/eduplat/",
            "telegram": "https://t.me/EduPlat"
        }
    },
]

export const getSocialUrl = (languajeCode, network) =>{
    //const jsonData = JSON.parse(SocialNets)
    const sn = SocialNets.find(ln => ln.lang === languajeCode);
    let theSubNet = JSON.parse(JSON.stringify(sn.network));
    let url = theSubNet[network];
    return url;
}