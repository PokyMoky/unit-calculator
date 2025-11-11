import VcIcon from "../../../../icons/social/VcIcon.jsx";
import TelegramIcon from "../../../../icons/social/TelegramIcon.jsx";
import VkIcon from "../../../../icons/social/VkIcon.jsx";
import StarIcon from "../../../../icons/social/StarIcon.jsx";
import DIcon from "../../../../icons/social/DIcon.jsx";

const socialLinks = [
   {id: 'vc', link: 'https://vk.com/jetstyleru', Icon: VcIcon},
   {id: 'telegram', link: 'https://t.me/jetstyle_ru', Icon: TelegramIcon},
   {id: 'vk', link: 'https://vk.com/jetstyleru', Icon: VkIcon},
   {id: 'workspace', link: 'https://workspace.ru/contractors/jetstyle/', Icon: StarIcon},
   {id: 'D!', link: 'https://dsgners.ru/jetstyle', Icon: DIcon},
];

function SocialLinks() {
   return (
      <div className="socialLinks">
         {socialLinks.map(({id, link, Icon}) => (
            <a
               className="socialIcon"
               key={id}
               href={link}
               target="_blank"
               rel="noopener noreferrer"
               title={`Follow us on ${id}`}
            >
               {<Icon />}
            </a>
         ))}
      </div>
   );
}

export default SocialLinks;