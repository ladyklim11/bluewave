
// Libraries
import React from 'react';
import {useSelector} from 'react-redux';
import {LoaderDataContext} from '../../App';
import {renderByType} from '../../components/Editor/List';
import styles from './style.module.scss';
import Header from '../../components/Header';
import {useHistory} from 'react-router-dom';
import {API} from '../../constants';
import {useMediaQuery} from "react-responsive";
import RippleButton from "../../components/Buttons/Ripple";


const Site = () => {
  const {
    userData: {
      user,
    },
  } = useSelector(store => store);
  const history = useHistory();
  const location = history.location.pathname;
  const names = history.location.pathname.split('/').filter(name => name !== '');
  const instagramNickname = names[0];

  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });

  const pageName = names[names.length - 1];

  const [activePage, setActivePage] = React.useState(null); // without blocks
  const [page, setPage] = React.useState(null); // with blocks
  const [blocks, setBlocks] = React.useState(null);
  const [mobileMenu, setMobileMenu] = React.useState(null);
  const { setLoaderData } = React.useContext(LoaderDataContext);

  React.useEffect(() => {
    fetch(`${API}/api/public-site-list-pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ link: instagramNickname })
    })
      .then(res => res.json())
      .then(res => {
        setActivePage(res.find(({ link }) => pageName === link || (link === '/' && names.length === 1)));
      })
  }, [location]);

  React.useEffect(() => {
    if (activePage) {
      setLoaderData({ loading: true });
      fetch(`${API}/api/public-site`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link: `${location}/${activePage.link}` })
      })
        .then(res => res.json())
        .then(page => {
          setPage(page);
          setLoaderData({ loading: false });
        })
        .catch(() => setLoaderData({ loading: false }));
    }
  }, [activePage]);

  React.useEffect(() => {
    if (page) {
      const mobileMenuContent = page.blocks
        .find(block => block.type_block_id === 11)
        ?.content;
      setMobileMenu({
        ...mobileMenuContent,
        links: mobileMenuContent && mobileMenuContent.links.map(link => ({
          ...link,
          to: `/${instagramNickname}/${link.to === '/' ? '' : link.to}`
        }))
      });
      setBlocks(() => page.blocks.filter(block => block.type_block_id !== 11))
    }
  }, [page]);

  return (
    <>
      {blocks && (
        <div
          className={styles.Page}
          style={{
            backgroundImage: `url(${page.settings.background.image})`,
            backgroundColor: page.settings.color
          }}
        >
          <Header
            title={page.name}
            userTabs={mobileMenu && mobileMenu?.links}
            menuIcon={mobileMenu?.menuIconId}
            renderActionButton={() => {}}
          />
          <div className={styles.Wrapper}>
            {blocks.map(block => (
              <div key={block.id} className={styles.Block}>
                {renderByType(block, true, isMobile)}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
};

export default Site;