export const leftMenu = [
    { id: 'we', label: 'Мы', href: '#', top: 'we' },
    {
        id: 'services',
        label: 'Услуги',
        href: '#',
        top: 'services',
        submenu: [
            { id: 'service1', label: 'Услуга 1', href: '#', top: 'services' },
            { id: 'service2', label: 'Услуга 2', href: '#', top: 'services' },
            { id: 'service3', label: 'Услуга 3', href: '#', top: 'services' },
            { id: 'calculator', label: 'Калькулятор unit-экономики', href: '#', top: 'services' }
        ]
    },
    { id: 'projects', label: 'Работы', href: '#', top: 'projects' },
    {
        id: 'products',
        label: 'Продукты',
        href: '#',
        top: 'products',
        submenu: [
            { id: 'product1', label: 'Продукт 1', href: '#', top: 'products' },
            { id: 'product2', label: 'Продукт 2', href: '#', top: 'products' },
            { id: 'product3', label: 'Продукт 3', href: '#', top: 'products' }
        ]
    }
];

export const initialInput = {AU: 0, CPC: 0, CR1: 0, CR2: 0, AVP: 0, COGS: 0, Ret: 0};

export const initialResult = {
    thresholdCPC: {title: "Пороговый CPC", value: 0},
    thresholdCPA: {title: "Пороговый CPA", value: 0},
    ARPPU: {title: "ARPPU", value: 0},
    ARPU: {title: "ARPU", value: 0},
    CPA: {title: "CPA (Cost Per Acquisition)", value: 0},
    CPPU: {title: "CPPU (Cost Per Paying User)", value: 0},
    Leads: {title: "Leads", value: 0},
    Buyers: {title: "Buyers", value: 0},
    Budget: {title: "Budget", value: 0},
    Margin: {title: "Margin", value: 0},
    APC: {title: "Retention (APC)", value: 0},
    LTV: {title: "LTV (Life Time Value)", value: 0},
    Revenue: {title: "Revenue (без вычета COGs)", value: 0},
    GP: {title: "Gross Profit", value: 0},
    PPPU: {title: "Profit Per Paying User", value: 0},
    Profit: {title: "Profit", value: 0},
    OP: {title: "Operating Profit", value: 0}
}

export const keyboardButtons = [
    {id: 1, value: 1},
    {id: 2, value: 2},
    {id: 3, value: 3},
    {id: "dash", value: '-'},
    {id: 4, value: 4},
    {id: 5, value: 5},
    {id: 6, value: 6},
    {id: "space", value: " "},
    {id: 7, value: 7},
    {id: 8, value: 8},
    {id: 9, value: 9},
    {id: "backspace", value: "backspace"},
    {id: ",", value: ','},
    {id: "0", value: '0'},
    {id: ".", value: '.'},
]

export const unitInputData = [
    {id: "AU", title: "User Acquisition", prompt: "Количество привлеченных пользователей"},
    {id: "CPC", title: "Cost Per Click", prompt: "Средняя стоимость одного клика"},
    {id: "CR1", title: "Conversion Rate 1", prompt: "Доля пользователей, совершивших целевое действие"},
    {id: "CR2", title: "Conversion Rate 2", prompt: "Доля лидов, которые совершают покупку"},
    {id: "AVP", title: "Average Purchase Value", prompt: "Средняя сумма одной покупки, совершаемой пользователем"},
    {id: "COGS", title: "Cost of Goods Sold", prompt: "Прямые затраты на производство или закупку единицы товара или услуги"},
    {id: "Ret", title: "Retention", prompt: "Процент клиентов, которые остаются"},
    {id: "PPPU", title: "Profit Per Paying User", prompt: "Размер прибыли с одного платящего пользователя"},
];

export const comparisonTableList = [
    {id: "thresholdCPC", title: "Пороговый CPC"},
    {id: "thresholdCPA", title: "Пороговый CPA"},
    {id: "ARPPU", title: "ARPPU"},
    {id: "ARPU", title: "ARPU"},
    {id: "CPA", title: "CPA"},
    {id: "Revenue", title: "Revenue"},
    {id: "GP", title: "Gross Profit"},
    {id: "PPPU", title: "PPPU"}
];

export const footerNavigation = [
    {id: "we", title: "Мы", link: "/"},
    {id: "services", title: "Услуги", link: "/"},
    {id: "projects", title: "Работы", link: "/"},
    {id: "presentation", title: "Презентация", link: "/"},
];

export const footerLinks = [
   [
    {id: "internship", title: "Приходи на стажировку", link: "/"},
    {id: "experiments", title: "Опыты Алексея Кулакова", link: "/"},
    {id: "newYear", title: "Новогодние поздравления", link: "/"},
    {id: "partnership", title: "Партнерская программа", link: "/"},
    {id: "unit-calc", title: "Калькулятор unit-экономики", link: "/"},
    {id: "posters", title: "JetStyle дарит плакаты", link: "/"},
   ],
   [
    {id: "design", title: "Дизайн", link: "/"},
    {id: "dev", title: "Разработка", link: "/"},
    {id: "market", title: "Маркетинг", link: "/"},
    {id: "chat-bots", title: "Чат-боты", link: "/"},
    {id: "arvr", title: "AR/VR", link: "/"},
    {id: "motion", title: "Motion", link: "/"},
   ]
];

export const address = [
    {id: "ek", name: "Екатеринбург", address: "Малышева, 51\n(Высоцкий, 29-й этаж)", image: "/src/assets/images/ekat.svg"},
    {id: "tat", name: "Tatooine", address: "14, Kerner Plaza,\nMos Eisley", image: "/src/assets/images/tatooine.svg"},
    {id: "ar", name: "Arrakis", address: "29th floor, Grand Palace,\nArrakeen", image: "/src/assets/images/arrakis.svg"},
];

export const products = [
    {id: "bim", text: "Среда визуализации и совместной работы с BIM", image: "/src/assets/images/bim-logo.svg", link: "https://bimvr.ru/"},
    {id: "promo", text: "Комплексный Digital-маркетинг для B2B и B2C", image: "/src/assets/images/logo-jetstylepromo-black.svg", link: "https://promo.jetstyle.ru/"},
];

export const privacyPolicy = "https://jetstyle.ru/privacy";
export const API_URL = "/api";

export const MAX_FILE_SIZE = 5;
export const ALLOWED_FILE_TYPE = [
    "image/png",
    "image/jpeg",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain"
];