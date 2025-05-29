import './i18n';
import { useTranslation } from "react-i18next";

function Nav() {

  const {t, i18n} = useTranslation();
  const changeLg = (lang)=>{
      i18n.changeLanguage(lang);
  };

  return (
    <>
    <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
        <li className="nav-item active">
            <a href="#women" className="nav-link">Women</a>
        </li>
        <li className="nav-item dropdown">
            <a href="#men" className="nav-link">Men</a>
        </li>
        <li className="nav-item">
            <a href="#kids" className="nav-link">Kids</a>
        </li>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" role="button" id="pages" data-bs-toggle="dropdown" aria-expanded="false">Pages</a>
            <ul className="dropdown-menu" aria-labelledby="pages">
            <li><a href="index.html" className="dropdown-item">About Us </a></li>
            <li><a href="index.html" className="dropdown-item">Shop </a></li>
            <li><a href="index.html" className="dropdown-item">Single Product </a></li>
            <li><a href="index.html" className="dropdown-item">Cart </a></li>
            <li><a href="index.html" className="dropdown-item">Checkout </a></li>
            <li><a href="index.html" className="dropdown-item">Blog </a></li>
            <li><a href="index.html" className="dropdown-item">Single Post </a></li>
            <li><a href="index.html" className="dropdown-item">Styles </a></li>
            <li><a href="index.html" className="dropdown-item">Contact </a></li>
            <li><a href="index.html" className="dropdown-item">Thank You </a></li>
            <li><a href="index.html" className="dropdown-item">My Account </a></li>
            <li><a href="index.html" className="dropdown-item">404 Error </a></li>
            </ul>
        </li>
        <li className="nav-item">
            <a href="#brand" className="nav-link">Brand</a>
        </li>
        <li className="nav-item">
            <a href="#blog" className="nav-link">Articles</a>
        </li>
        <li className="nav-item">
            <a href="/dashboard/orders" className="nav-link">Dashboard</a>
        </li>
    </ul>

    <div className="language-selector" style={{marginLeft:'10px'}}>
        <button onClick={() => changeLg('en')} className="language-flag">
            <img 
            src="images/langs/en.png" 
            alt="English" 
            width="20" 
            height="15"
            />
        </button>
        <button onClick={() => changeLg('fr')} className="language-flag">
            <img 
            src="images/langs/fr.png" 
            alt="French" 
            width="20" 
            height="15"
            />
        </button>
        <button onClick={() => changeLg('ch')} className="language-flag">
            <img 
            src="images/langs/cn.png" 
            alt="Chinese" 
            width="20" 
            height="15"
            />
        </button>
    </div>
    </>
  )
}

export default Nav