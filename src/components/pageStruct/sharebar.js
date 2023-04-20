import * as React from 'react';
import {
        FacebookShareCount,
        PinterestShareCount,
        OKShareCount,
        RedditShareCount,
        TumblrShareCount,
        FacebookShareButton,
        FacebookMessengerShareButton,
        FacebookMessengerIcon,
        LinkedinShareButton,
        TwitterShareButton,
        PinterestShareButton,
        OKShareButton,
        TelegramShareButton,
        WhatsappShareButton,
        RedditShareButton,
        EmailShareButton,
        TumblrShareButton,
        LivejournalShareButton,
        ViberShareButton,
        WorkplaceShareButton,
        LineShareButton,
        PocketShareButton,
        InstapaperShareButton,
        FacebookIcon,
        TwitterIcon,
        LinkedinIcon,
        PinterestIcon,
        OKIcon,
        TelegramIcon,
        WhatsappIcon,
        RedditIcon,
        TumblrIcon,
        EmailIcon,
        LivejournalIcon,
        ViberIcon,
        WorkplaceIcon,
        LineIcon,
        PocketIcon,
        InstapaperIcon,

      } from "react-share";

import './sharebar.css';
//import { socialNetworks } from 'src/utils/social-networks-utils';
import exampleImage from './react-share-pin-example.png';
import { Grid,  Typography } from '@mui/material';
import { getSocialUrl } from 'src/utils/socialList';
import instagramIcon from 'src/assets/images/icons/instagram32x32.png';
import tiktokIcon from 'src/assets/images/icons/tiktok32x32.png'
import facebookIcon from 'src/assets/images/icons/facebook32x32.png'
import twitterIcon from 'src/assets/images/icons/twitter32x32.png'
import linkedinIcon from 'src/assets/images/icons/linkedin32x32.png'
import telegramIcon from 'src/assets/images/icons/telegram32x32.png'
import i18next from 'i18next';


export const ShareBarBig = () =>{
    const shareUrl = 'https://eduplat.org';
    const title = 'Eduplat';
    return (
        <>
        <div className="Demo__container">
        <Typography className='Title'>{i18next.t("Spread the word")}</Typography>
        <div className="Demo__some-network">
            
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <div>
            <FacebookShareCount url={shareUrl} className="Demo__some-network__share-count">
              {count => count}
            </FacebookShareCount>
          </div>
        </div>

        <div className="Demo__some-network">
          <FacebookMessengerShareButton
            url={shareUrl}
            appId="521270401588372"
            className="Demo__some-network__share-button"
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
        </div>

        <div className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <div className="Demo__some-network__share-count">&nbsp;</div>
        </div>

        <div className="Demo__some-network">
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>

          <div className="Demo__some-network__share-count">&nbsp;</div>
        </div>

        <div className="Demo__some-network">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <div className="Demo__some-network__share-count">&nbsp;</div>
        </div>

        <div className="Demo__some-network">
          <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>

        <div className="Demo__some-network">
          <PinterestShareButton
            url={String(window.location)}
            media={`${String(window.location)}/${exampleImage}`}
            className="Demo__some-network__share-button"
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <div>
            <PinterestShareCount url={shareUrl} className="Demo__some-network__share-count" />
          </div>
        </div>

        <div className="Demo__some-network">
          <OKShareButton
            url={shareUrl}
            image={`${String(window.location)}/${exampleImage}`}
            className="Demo__some-network__share-button"
          >
            <OKIcon size={32} round />
          </OKShareButton>

          <div>
            <OKShareCount url={shareUrl} className="Demo__some-network__share-count" />
          </div>
        </div>

        <div className="Demo__some-network">
          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="Demo__some-network__share-button"
          >
            <RedditIcon size={32} round />
          </RedditShareButton>

          <div>
            <RedditShareCount url={shareUrl} className="Demo__some-network__share-count" />
          </div>
        </div>

        <div className="Demo__some-network">
          <TumblrShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TumblrIcon size={32} round />
          </TumblrShareButton>

          <div>
            <TumblrShareCount url={shareUrl} className="Demo__some-network__share-count" />
          </div>
        </div>

        <div className="Demo__some-network">
          <LivejournalShareButton
            url={shareUrl}
            title={title}
            description={shareUrl}
            className="Demo__some-network__share-button"
          >
            <LivejournalIcon size={32} round />
          </LivejournalShareButton>
        </div>

        <div className="Demo__some-network">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
        <div className="Demo__some-network">
          <ViberShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <ViberIcon size={32} round />
          </ViberShareButton>
        </div>

        <div className="Demo__some-network">
          <WorkplaceShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <WorkplaceIcon size={32} round />
          </WorkplaceShareButton>
        </div>

        <div className="Demo__some-network">
          <LineShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <LineIcon size={32} round />
          </LineShareButton>
        </div>

        <div className="Demo__some-network">
          <PocketShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <PocketIcon size={32} round />
          </PocketShareButton>
        </div>

        <div className="Demo__some-network">
          <InstapaperShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <InstapaperIcon size={32} round />
          </InstapaperShareButton>
        </div>

      </div>
        </>
    )
}

export const ShareButton = (props) => {
    const {url, title, image} = props;
    return(
       
        <a href={url} 
        target="new" 
        > 
            <img alt={title} className='ImgButton' src={image} />
        </a>
     
    )
    
}


export const FollowUs = ()=>{
    const lang="en";
    return (
        <>
            <Grid container>
                <Grid item>
                    <ShareButton
                        url={getSocialUrl(lang, "facebook")}
                        title={document.title}
                        image={facebookIcon}
                    />
                </Grid>
                <Grid item>
                    <ShareButton
                        url={getSocialUrl(lang, "twitter")}
                        title={document.title}
                        image ={twitterIcon}
                    />
                </Grid>
                <Grid item>
                    <ShareButton
                        url={getSocialUrl(lang, "instagram")}
                        title={document.title}
                        image ={instagramIcon}
                     />
                </Grid>
                <Grid item>
                    <ShareButton 
                        url={getSocialUrl(lang, "tiktok")}
                        title={document.title}
                        image={tiktokIcon}
                    />
                </Grid>
                <Grid item>
                    <ShareButton 
                        url={getSocialUrl(lang, "linkedin")}
                        className="Demo__some-network__share-button"
                        image={linkedinIcon}                 
                    />
                </Grid>
                {lang==="es"?<>
                <Grid item>
                    <ShareButton 
                        url={getSocialUrl(lang, "telegram")}
                        title={document.title}
                        image={telegramIcon}                 
                    />
                </Grid>
                </>:<></>}
            </Grid>
        </>
    )

}