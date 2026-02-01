import {IFooterColumnProps, IFooterLink} from "../../types/props/layout/IFooterProps";
import {Link} from "react-router-dom";
import '../../styles/layout/footer.scss';

const Footer = () => {

    const leftColumnLinks: IFooterLink[] = [
        { path: "/", text: "Home page" },
        { path: "/", text: "Catalog" },
        { path: "/", text: "How it works" },
        { path: "/", text: "FAQs" },
    ];

    const rightColumnLinks: IFooterLink[] = [
        { path: "/", text: "About us" },
        { path: "/", text: "Privacy" },
        { path: "/", text: "Facebook" },
        { path: "/", text: "Instagram" },
    ];

    return (
        <footer>
            <div className="footer-columns">
                <FooterColumn links={leftColumnLinks} />
                <FooterColumn links={rightColumnLinks} />
            </div>
            <FooterCopyright />
        </footer>
    );
};

const FooterColumn = ({links}: IFooterColumnProps) => {

    return (
        <div className="footer-column">
            <div>
                {links.map((link, index) => (
                    <Link key={index} to={link.path}>
                        {link.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}

const FooterCopyright = () => {
    return (
        <div className="footer-copyright">
            <div>
                <p>
                    Company No xxxxxxxxx
                    <br />
                    Registered In Estonia
                    <br />
                    VAT Number: xxxxxxxxx
                </p>
                <p>&copy; SOTC Limited 2023</p>
            </div>
        </div>
    )
}

export default Footer;