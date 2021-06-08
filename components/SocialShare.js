import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';
import { base } from '@/configs/config';

const SocialShare = (props) => (
  <>
    <div className="social-share">
      <FacebookShareButton url={`${base}post/${props.url}`}>
        <FacebookIcon bgStyle={{ fill: '#000000' }} size={32} round={true} />
      </FacebookShareButton>

      <LinkedinShareButton url={`${base}post/${props.url}`}>
        <LinkedinIcon bgStyle={{ fill: '#000000' }} size={32} round={true} />
      </LinkedinShareButton>

      <TwitterShareButton url={`${base}post/${props.url}`}>
        <TwitterIcon bgStyle={{ fill: '#000000' }} size={32} round={true} />
      </TwitterShareButton>

      <WhatsappShareButton url={`${base}post/${props.url}`}>
        <WhatsappIcon bgStyle={{ fill: '#000000' }} size={32} round={true} />
      </WhatsappShareButton>

      <EmailShareButton url={`${base}post/${props.slug}`}>
        <EmailIcon bgStyle={{ fill: '#000000' }} size={32} round={true} />
      </EmailShareButton>
    </div>

    <style jsx>{`
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Catamaran', sans-serif;
        font-weight: 700;
      }

      .social-share {
        display: flex;
        margin: 50px auto;
        width: 100%;
        width: 250px;
        justify-content: space-between;
        margin-right: auto;
      }
    `}</style>
  </>
);

export default SocialShare;
