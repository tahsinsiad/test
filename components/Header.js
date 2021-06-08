import Link from 'next/link';
import Burger from './core/Burger';
import Search from './Search';

const leftlinkStyle = {
  padding: '0 12px',
  fontSize: '14px',
  fontWeight: '800',
  color: '#3e3e3e',
  textDecoration: 'none',
  fontFamily: "'Catamaran', sans-serif"
};

const rightlinkStyle = {
  padding: '0 12px',
  fontSize: '14px',
  fontWeight: '800',
  color: '#3e3e3e',
  textDecoration: 'none',
  fontFamily: "'Catamaran', sans-serif"
};

const Header = (props) => {
  return (
    <>
      <style jsx>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Catamaran', sans-serif;
          font-weight: 500;
          color: #707070;
          font-size: 12px;
        }
        p {
          font-family: 'Poly', serif;
          font-size: 19px;
          line-height: 25px;
        }

        body {
          font-family: 'Poly', serif;
        }

        .header {
          display: flex;
          flex: 1;
          width: 95%;
          justify-content: space-between;
          margin: 20px auto 0;
        }

        .left-nav > svg.menu-burger {
          margin: 0 15px;
          padding: 0 15px;
        }

        .left-nav,
        .right-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 200px;
        }

        .left-nav {
          justify-content: flex-start;
        }

        .right-nav {
          margin-bottom: -2px;
        }
        .logo > a > img {
          width: 150px;
        }
        @media all and (max-width: 767px) {
          .header {
            display: none;
          }

          .logo {
            position: relative;
            top: 0;
            left: 0;
            right: 0;
          }

          .burger-mobile {
            z-index: 100;
            position: absolute;
            left: 20px;
            top: 20px;
          }

          .search-mobile {
            z-index: 100;
            position: absolute;
            right: 20px;
            top: 20px;
          }

          .header-mobile-bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #f5f5f5;
            display: flex;
            justify-content: space-around;
            padding: 8px 0 5px;
            color: #000000;
            z-index: 1;
          }

          .header-mobile-bottom > div > a {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-decoration: none;
          }

          .header-mobile-bottom > div > a > img {
            max-height: 18px;
          }

          .header-mobile-bottom > div > a > span {
            font-family: Sans-Serif, 'Poly', serif;
            font-size: 10px;
            font-weight: 500;
            margin-top: 3px;
            color: #000000;
          }

          .header-mobile-bottom > div > a > svg.font-icon {
            font-size: 30px;
          }

          .logo {
            text-align: center;
          }

          .logo > a > img {
            width: 30%;
            margin: 10px auto 0;
          }
        }

        @media all and (min-width: 768px) {
          .header-mobile {
            display: none;
          }
        }
      `}</style>
      <div className="header">
        <div className="left-nav">
          <Burger />

          <div>
            <Link href="/latest">
              <a style={leftlinkStyle} className="navbar-link">
                LATEST
              </a>
            </Link>
            <Link href="/topics">
              <a style={leftlinkStyle} className="navbar-link">
                TOPICS
              </a>
            </Link>
          </div>
        </div>

        <div className="logo">
          <Link href="/">
            <a>
              <img src={`/images/logo.svg`} alt="Centre.My Logo" />
            </a>
          </Link>
        </div>

        <div className="right-nav">
          <Link href="/contact">
            <a style={rightlinkStyle} className="navbar-link">
              CONTACT
            </a>
          </Link>

          <Link href="/#subscribe">
            <a style={rightlinkStyle} className="navbar-link">
              SUBSCRIBE
            </a>
          </Link>
          <Search />
        </div>
      </div>

      <div className="header-mobile">
        <div className="header-mobile-top">
          <div className="burger-mobile">
            <Burger />
          </div>
          <div className="logo">
            <Link href="/">
              <a>
                <img src={`/images/logo.svg`} alt="Centre.My Logo" />
              </a>
            </Link>
          </div>
          <div className="search-mobile">
            <Search />
          </div>
        </div>

        <div className="header-mobile-bottom">
          <div>
            <Link href="/latest">
              <a>
                <img src={`/icons/clock.svg`} />
                <span>Latest</span>
              </a>
            </Link>
          </div>

          <div>
            <Link href="/topics">
              <a>
                <img src={`/icons/topic.svg`} />
                <span>Topics</span>
              </a>
            </Link>
          </div>

          <div>
            <Link href="/contact">
              <a>
                <img src={`/icons/about.svg`} />
                <span>Contact</span>
              </a>
            </Link>
          </div>

          <div>
            <Link href="/#subscribe">
              <a>
                <img src={`/icons/subscribe.svg`} />
                <span>Subscribe</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

// ui labeled icon ui overlay push bottom thin visible sidebar menu
// ui bottom demo nine item labeled icon sidebar menu push overlay visible
