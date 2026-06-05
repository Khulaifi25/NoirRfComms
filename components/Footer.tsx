import {
    IconBrandInstagram,
    IconBrandDiscord,
    IconBrandFacebook,
    IconBrandX,
    IconLetterP,} from "@tabler/icons-react";
export default function Footer() {
    return (
        <footer className="border-t mt-20">
            <div className="max-w-6xl mx-auto py-10 text-center">
            <p className="text-gray-200">&copy; 2026 4Saken Inc. All rights reserved.</p>
    
            <div className="flex justify-center gap-5 mt-4">
                <a
                href="https://www.instagram.com/nooereru"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                >
                <IconBrandInstagram
                    size={25}
                    stroke={1.8}
                    className="text-gray-200 hover:text-gray-700 transition-colors"
                />
                </a>
    
                <a
                href="https://discordapp.com/users/585487774182932520"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                >
                <IconBrandDiscord
                    size={25}
                    stroke={1.8}
                    className="text-gray-200 hover:text-gray-700 transition-colors"
                />
                </a>
    
                <a
                href="https://www.facebook.com/profile.php?id=61589077648972"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                >
                <IconBrandFacebook
                    size={25}
                    stroke={1.8}
                    className="text-gray-200 hover:text-gray-700 transition-colors"
                />
                </a>

                <a
                href="https://www.pixiv.net/en/users/50587171"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pixiv"
                >
                <IconLetterP
                    size={25}
                    stroke={1.8}
                    className="text-gray-200 hover:text-gray-700 transition-colors"
                />
                </a>

                <a
                href="https://x.com/noirs_rf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                >
                <IconBrandX
                    size={25}
                    stroke={1.8}
                    className="text-gray-200 hover:text-gray-700 transition-colors"
                />
                </a>
            </div>
            </div>
        </footer>
    );
}