export interface TabsData {
  id: number;
  title: string;
  icon: string;
  pinned: boolean;
  isDeleted: boolean;
  link: string;
}
export const data: TabsData[] = [
  {
    id: 1,
    title: "DashBoard",
    icon: "/svg/DashBoard.svg",
    pinned: false,
    isDeleted: false,
    link: '/',
  },
  {
    id: 2,
    title: "Banking",
    icon: "/svg/Banking.svg",
    pinned: false,
    isDeleted: false,
    link: '/Banking',
  },
  {
    id: 3,
    title: "Telefonie",
    icon: "/svg/Telefonie.svg",
    pinned: true,
    isDeleted: false,
    link: '/Telefonie',
  },
  {
    id: 4,
    title: "Accounting",
    icon: "/svg/Accounting.svg",
    pinned: false,
    isDeleted: false,
    link: '/Accounting',
  },
  {
    id: 5,
    title: "Verkauf",
    icon: "/svg/Verkauf.svg",
    pinned: false,
    isDeleted: false,
    link: '/Verkauf',
  },
  {
    id: 6,
    title: "Statistik",
    icon: "/svg/Statistik.svg",
    pinned: false,
    isDeleted: false,
    link: '/Statistik',
  },
  {
    id: 7,
    title: "Post Office",
    icon: "/svg/PostOffice.svg",
    pinned: false,
    isDeleted: false,
    link: '/Post-Office',
  },
  {
    id: 8,
    title: "Administration",
    icon: "/svg/Administration.svg",
    pinned: false,
    isDeleted: false,
    link: '/Administration',
  },
  {
    id: 9,
    title: "Help",
    icon: "/svg/Help.svg",
    pinned: false,
    isDeleted: false,
    link: '/Help',
  },
  {
    id: 10,
    title: "Warenbestand",
    icon: "/svg/Warenbestand.svg",
    pinned: false,
    isDeleted: false,
    link: '/Warenbestand',
  },
  {
    id: 11,
    title: "Auswahllisten",
    icon: "/svg/Auswahllisten.svg",
    pinned: false,
    isDeleted: false,
    link: '/Auswahllisten',
  },
  {
    id: 12,
    title: "Einkauf",
    icon: "/svg/Einkauf.svg",
    pinned: false,
    isDeleted: false,
    link: '/Einkauf',
  },
  {
    id: 13,
    title: "Rechn",
    icon: "/svg/Rechn.svg",
    pinned: false,
    isDeleted: false,
    link: '/Rechn',
  },
  {
    id: 14,
    title: "Lagerverwal",
    icon: "/svg/Lagerverwaltung.svg",
    pinned: false,
    isDeleted: false,
    link: '/Lagerverwal',
  },
];
