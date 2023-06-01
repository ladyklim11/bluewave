
// Libraries
import React from 'react';

// Components
import Page from '../../components/Page';

// Assets
import benefitIcon from '../../assets/service/benefit.svg'
import arrowIcon from '../../assets/service/arrowToBottom.svg';

// Styles
import styles from './style.module.scss';
import {useMediaQuery} from 'react-responsive';
import {useSelector} from 'react-redux';
import {LoaderDataContext, LoginScreenDataContext} from '../../App';
import {API} from '../../constants';


// key = tariff.id
const COLORS = {
  1: '#8F8D98',
  2: '#6442EE',
  3: '#070413'
};

const MONTHS_MAP = {
  3: '3 месяца',
  6: 'полгода',
  12: 'год'
};

const SELECTOR_MAP = {
  3: '3 месяца',
  6: '6 месяцев',
  12: '12 месяцев'
};

const MODS = {
  'free': 'free',
  'pro': 'pro',
  'vip': 'vip',
}

const BENEFITS_MOCK = {
  [MODS.free]: [
    'Доступ к VIP функционалу редактора'
  ],
  [MODS.pro]: [
    'Доступ к VIP и premium функционалу редактора'
  ],
  [MODS.vip]: [
    'Полный доступ ко всему функционалу редактора',
    'Возможность публиковать свои товары и продавать их'
  ]
}

const TARIFFS_MOCK = {
  3: [
    { id: 1, name: MODS.free, price: 0, month_price: 0, month_price_discount: 0, discount: 0 },
    { id: 2, name: MODS.pro, price: 1200, month_price: 400, month_price_discount: 400, discount: 0 },
    { id: 3, name: MODS.vip, price: 1800, month_price: 600, month_price_discount: 600, discount: 0 },
  ],
  6: [
    { id: 1, name: MODS.free, price: 0, month_price: 0, month_price_discount: 0, discount: 10 },
    { id: 2, name: MODS.pro, price: 2160, month_price: 400, month_price_discount: 360, discount: 10 },
    { id: 3, name: MODS.vip, price: 3240, month_price: 600, month_price_discount: 540, discount: 10 },
  ],
  12: [
    { id: 1, name: MODS.free, price: 0, month_price: 0, month_price_discount: 0, discount: 50 },
    { id: 2, name: MODS.pro, price: 2400, month_price: 400, month_price_discount: 200, discount: 50 },
    { id: 3, name: MODS.vip, price: 3600, month_price: 600, month_price_discount: 300, discount: 50 },
  ],
}

const Tariffs = () => {
  const {
    userData: {
      user
    }
  } = useSelector(store => store);
  const { setLoginData } = React.useContext(LoginScreenDataContext);
  const [tariffs, setTariffs] = React.useState(TARIFFS_MOCK);
  const [benefitsId, setBenefitsId] = React.useState(null);
  const [selectedRange, setSelectedRange] = React.useState(3);
  const { setLoaderData } = React.useContext(LoaderDataContext);

  React.useEffect(() => {
    setLoaderData({ loading: true });
    fetch(`${API}/api/dictionary/tariffs`)
      .then(res => res.json())
      .then(res => {
        // setTariffs(res);
        setSelectedRange('6');
        setLoaderData({ loading: false });
        setBenefitsId(res['6'][1].id);
      })
      .catch(() => setLoaderData({ loading: false }));
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const discounts = React.useMemo(() =>
    tariffs && Object.fromEntries(Object.entries(tariffs).map(([key, value]) => ([key, value[0].discount])))
  , [tariffs]);


  const Selectors = () => {
    return (
      <div className={styles.Selector}>
        {discounts && Object.entries(SELECTOR_MAP).map(([monthsCount, label]) => (
          <div
            className={`${styles.Selector__Item} ${+selectedRange === +monthsCount ? styles.Selector__Item_selected : ''}`}
            onClick={() => setSelectedRange(monthsCount)}
          >
            <span className={styles.Selector__Label}>{label}</span>
            {discounts[monthsCount] > 0 && <span className={styles.Selector__Discount}>-{discounts[monthsCount]}%</span>}
          </div>
        ))}
      </div>
    )
  }

  return (
    <Page headerProps={{title: 'Тарифы'}}>
      {isMobile ? (
        <div className={styles.Tariffs}>
          <Selectors />
          {tariffs && selectedRange && tariffs[selectedRange].map(tariff => {
            const isSelected = benefitsId === tariff.id;

            return (
              <div
                className={styles.Content}
                onClick={() => setBenefitsId(prev => prev === tariff.id ? null : tariff.id)}
                style={{marginBottom: isSelected && 16, marginTop: tariff.id === 3}}
              >
                {tariff.id === 3 && <div className={styles.Mobile__Better}>Рекомендуем</div>}
                <div className={styles.Row} style={{justifyContent: 'space-between'}}>
                  <div
                    style={{color: COLORS[tariff.id]}}
                    className={styles.Title}
                  >
                    {tariff.name.toUpperCase()}
                  </div>
                  <img
                    src={arrowIcon}
                    style={{transform: isSelected && 'rotate(180deg)'}}
                    alt=''
                  />
                </div>
                <div>
                  <div className={styles.PricePerMonths}>
                    {tariff.price > 0 ? `${tariff.price.toLocaleString()} ₽ / ${MONTHS_MAP[selectedRange]}` : 'Бесплатно'}
                  </div>
                  <div className={styles.Row}>
                    {tariff.month_price !== tariff.month_price_discount && (
                      <div className={styles.OldPricePerMonth}>{tariff.month_price.toLocaleString()}</div>
                    )}
                    <div className={styles.PricePerMonth}>
                      {tariff.month_price_discount === 0
                        ? 'Бесплатно всегда'
                        : tariff.month_price_discount.toLocaleString()  + ' ₽ / месяц'
                      }
                    </div>
                  </div>
                  {isSelected && (
                    <div>
                      <div className={styles.Divider} />
                      {BENEFITS_MOCK[tariff.name].map(benefit => (
                        <div className={styles.Benefit}>
                          <img src={benefitIcon} alt='' />
                          <div className={styles.Text}>{benefit}</div>
                        </div>
                      ))}
                      <a
                        href={user && user?.level !== tariff.id && `${API}/payment?tariff_id=${tariff.id}&user_id=${user?.id}&month=${selectedRange}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          !user && setLoginData({ show: true })}
                        }
                      >
                        <button
                          style={{marginTop: 20}}
                          className='big'
                          disabled={user?.level === tariff.id}
                        >
                          {user?.level === tariff.id ? 'Ваш текущий тариф' : `Оформить`}
                        </button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className={styles.PC}>
          <div className={styles.PC__Title}>Подберите подходящий тариф</div>
          <Selectors />
          <div className={styles.PC__Cards}>
            {tariffs && selectedRange && tariffs[selectedRange].map(tariff => (
              <div key={tariff.id} className={styles.PC__Card} style={{borderColor: COLORS[tariff.id]}}>
                {tariff.id === 3 && <div className={styles.PC__Better}>Рекомендуем</div>}
                <div className={styles.PC__Info}>
                  <div className={styles.PC__Type} style={{color: COLORS[tariff.id]}}>{tariff.name}</div>
                  <div className={styles.PC__PeriodPrice}>
                    {tariff.price > 0 ? `${tariff.price.toLocaleString()} ₽ / ${MONTHS_MAP[selectedRange]}` : 'Бесплатно'}
                  </div>
                </div>
                <div className={styles.PC__Prices}>
                  {tariff.month_price !== tariff.month_price_discount && <div className={styles.PC__OldPrice}>{tariff.month_price.toLocaleString()}</div>}
                  <div className={styles.PC__MonthPrice}>
                    {tariff.month_price_discount === 0
                      ? 'Бесплатно всегда'
                      : tariff.month_price_discount.toLocaleString()  + ' ₽ / месяц'
                    }
                  </div>
                </div>
                <div className={styles.PC__Benefits}>
                  {BENEFITS_MOCK[tariff.name].map(benefit => (
                    <div key={benefit} className={styles.PC__Benefit}>
                      <img src={benefitIcon} alt='' />
                      <div className={styles.PC__Text}>{benefit}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.PC__Button}>
                  <a
                    href={user && user?.level !== tariff.id && `${API}/payment?tariff_id=${tariff.id}&user_id=${user.id}&month=${selectedRange}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      !user && setLoginData({ show: true })}
                    }
                  >
                    <button disabled={user?.level === tariff.id}>
                      {user?.level === tariff.id ? 'Ваш текущий тариф' : `Оплатить ${tariff.name.toUpperCase()}`}
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Page>
  )
}

export default Tariffs;