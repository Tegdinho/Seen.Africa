import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { waLink } from '@/lib/site';

export type CategoryName =
  | 'Sales Materials'
  | 'Advertising'
  | 'Outdoor'
  | 'Packaging'
  | 'Merchandise'
  | 'Events & Activations'
  | 'Office Materials'
  | 'Promotional'
  | 'Signage';

type Product = {
  id: string;
  name: string;
  category: CategoryName;
  image: string;
};

export const CATEGORIES: CategoryName[] = [
  'Merchandise',
  'Outdoor',
  'Signage',
  'Events & Activations',
  'Office Materials',
  'Advertising',
  'Sales Materials',
  'Packaging',
  'Promotional',
];

const CATEGORIES_WITH_ALL = ['All', ...CATEGORIES] as const;
type FilterName = (typeof CATEGORIES_WITH_ALL)[number];

// Image pools per category (real stock photos from Pexels)
const SALES_IMG = [
  'https://images.pexels.com/photos/29452731/pexels-photo-29452731.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6565754/pexels-photo-6565754.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7648514/pexels-photo-7648514.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6114593/pexels-photo-6114593.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7180485/pexels-photo-7180485.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7648315/pexels-photo-7648315.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/2250136/pexels-photo-2250136.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7648022/pexels-photo-7648022.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7648252/pexels-photo-7648252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5869617/pexels-photo-5869617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/122162/pexels-photo-122162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5650018/pexels-photo-5650018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7986988/pexels-photo-7986988.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7987759/pexels-photo-7987759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const ADVERTISING_IMG = [
  'https://images.pexels.com/photos/13462296/pexels-photo-13462296.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7870693/pexels-photo-7870693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/37394506/pexels-photo-37394506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9832697/pexels-photo-9832697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3964566/pexels-photo-3964566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5847874/pexels-photo-5847874.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35658700/pexels-photo-35658700.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/20196723/pexels-photo-20196723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/37797847/pexels-photo-37797847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/331986/pexels-photo-331986.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5516094/pexels-photo-5516094.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/38588275/pexels-photo-38588275.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/33995272/pexels-photo-33995272.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/36376452/pexels-photo-36376452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const OUTDOOR_IMG = [
  'https://images.pexels.com/photos/4913828/pexels-photo-4913828.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/28028559/pexels-photo-28028559.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/20856990/pexels-photo-20856990.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/32765072/pexels-photo-32765072.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/18335917/pexels-photo-18335917.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13120127/pexels-photo-13120127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/788662/pexels-photo-788662.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5432846/pexels-photo-5432846.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12883028/pexels-photo-12883028.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/18524069/pexels-photo-18524069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29501720/pexels-photo-29501720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35164905/pexels-photo-35164905.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12641814/pexels-photo-12641814.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/36402931/pexels-photo-36402931.png?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/17434259/pexels-photo-17434259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const PACKAGING_IMG = [
  'https://images.pexels.com/photos/9594420/pexels-photo-9594420.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9594428/pexels-photo-9594428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7464264/pexels-photo-7464264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9594430/pexels-photo-9594430.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4440799/pexels-photo-4440799.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7309447/pexels-photo-7309447.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9594419/pexels-photo-9594419.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7309212/pexels-photo-7309212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4440794/pexels-photo-4440794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6958425/pexels-photo-6958425.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7564198/pexels-photo-7564198.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7563593/pexels-photo-7563593.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4061383/pexels-photo-4061383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7563583/pexels-photo-7563583.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7363080/pexels-photo-7363080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const MERCHANDISE_IMG = [
  'https://images.pexels.com/photos/14528152/pexels-photo-14528152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12025472/pexels-photo-12025472.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9869067/pexels-photo-9869067.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/18347938/pexels-photo-18347938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/18937023/pexels-photo-18937023.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/3607627/pexels-photo-3607627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7310197/pexels-photo-7310197.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6787035/pexels-photo-6787035.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1194027/pexels-photo-1194027.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/37838556/pexels-photo-37838556.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9598027/pexels-photo-9598027.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/37306521/pexels-photo-37306521.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5200712/pexels-photo-5200712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/109360/pexels-photo-109360.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/36450830/pexels-photo-36450830.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const EVENTS_IMG = [
  'https://images.pexels.com/photos/13051278/pexels-photo-13051278.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29708283/pexels-photo-29708283.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12712474/pexels-photo-12712474.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/14999407/pexels-photo-14999407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/2177814/pexels-photo-2177814.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35042459/pexels-photo-35042459.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/33914527/pexels-photo-33914527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8857043/pexels-photo-8857043.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31045373/pexels-photo-31045373.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/33469001/pexels-photo-33469001.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/16985138/pexels-photo-16985138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/36856348/pexels-photo-36856348.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35138560/pexels-photo-35138560.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7648028/pexels-photo-7648028.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const OFFICE_IMG = [
  'https://images.pexels.com/photos/760720/pexels-photo-760720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5417632/pexels-photo-5417632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29509452/pexels-photo-29509452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/19797271/pexels-photo-19797271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5717479/pexels-photo-5717479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34293525/pexels-photo-34293525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34293528/pexels-photo-34293528.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/265024/pexels-photo-265024.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/17065769/pexels-photo-17065769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6636338/pexels-photo-6636338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7414277/pexels-photo-7414277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7111519/pexels-photo-7111519.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7680681/pexels-photo-7680681.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7681493/pexels-photo-7681493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34115564/pexels-photo-34115564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const PROMOTIONAL_IMG = [
  'https://images.pexels.com/photos/6373931/pexels-photo-6373931.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7564161/pexels-photo-7564161.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5926431/pexels-photo-5926431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6675830/pexels-photo-6675830.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7956389/pexels-photo-7956389.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/583881/pexels-photo-583881.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5624984/pexels-photo-5624984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5926415/pexels-photo-5926415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7957753/pexels-photo-7957753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5625131/pexels-photo-5625131.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7987867/pexels-photo-7987867.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5650038/pexels-photo-5650038.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const SIGNAGE_IMG = [
  'https://images.pexels.com/photos/12944970/pexels-photo-12944970.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34516671/pexels-photo-34516671.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7207643/pexels-photo-7207643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12397609/pexels-photo-12397609.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1119074/pexels-photo-1119074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5989947/pexels-photo-5989947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31470489/pexels-photo-31470489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34708259/pexels-photo-34708259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/2962092/pexels-photo-2962092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9615354/pexels-photo-9615354.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7511746/pexels-photo-7511746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29373552/pexels-photo-29373552.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13260086/pexels-photo-13260086.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/27778938/pexels-photo-27778938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5550319/pexels-photo-5550319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const CATEGORY_IMAGES: Record<CategoryName, string[]> = {
  'Sales Materials': SALES_IMG,
  Advertising: ADVERTISING_IMG,
  Outdoor: OUTDOOR_IMG,
  Packaging: PACKAGING_IMG,
  Merchandise: MERCHANDISE_IMG,
  'Events & Activations': EVENTS_IMG,
  'Office Materials': OFFICE_IMG,
  Promotional: PROMOTIONAL_IMG,
  Signage: SIGNAGE_IMG,
};

const UPLOADED_IMAGE_OVERRIDES: Record<string, string> = {
  // Sales Materials
  'Sales Materials-0': '/assets/images/shop/Brochures copy 3.png',
  'Sales Materials-1': '/assets/images/shop/Flayers copy 3.jpeg',

  // Advertising
  'Advertising-0': '/assets/images/shop/Flayers copy 2.jpeg',
  'Advertising-1': '/assets/images/shop/Posters.png',
  'Advertising-2': '/assets/images/shop/Brochures copy 2.png',
  'Advertising-3': '/assets/images/shop/Leaflets copy 2.jpeg',
  'Advertising-4': '/assets/images/shop/Table_talker.png',

  // Outdoor
  'Outdoor-0': '/assets/images/shop/Buillboards copy 2.png',
  'Outdoor-1': '/assets/images/shop/Building_wraps copy 2.png',
  'Outdoor-2': '/assets/images/shop/Wall_branding.png',
  'Outdoor-3': '/assets/images/shop/shop_signage.png',
  'Outdoor-4': '/assets/images/shop/Store_front_sign.png',
  'Outdoor-5': '/assets/images/shop/lightbox_sign copy 2.jpeg',
  'Outdoor-6': '/assets/images/shop/Pull-up_Banners.jpeg',
  'Outdoor-7': '/assets/images/shop/X_Banners.png',
  'Outdoor-8': '/assets/images/shop/Rollup_Banners.png',
  'Outdoor-9': '/assets/images/shop/A_frame_sign copy 2.jpeg',
  'Outdoor-10': '/assets/images/shop/Direction_sign copy 2.png',
  'Outdoor-11': '/assets/images/shop/Roadside_Sign.jpeg',
  'Outdoor-12': '/assets/images/shop/Bajaj_Branding.png',
  'Outdoor-13': '/assets/images/shop/Bus_Branding copy 2.png',
  'Outdoor-14': '/assets/images/shop/Bajaj_Branding copy 2.png',

  // Packaging
  'Packaging-0': '/assets/images/shop/Product_Packaging.png',
  'Packaging-1': '/assets/images/shop/Boxes copy 2.png',
  'Packaging-2': '/assets/images/shop/Paper_Bags copy 2.png',
  'Packaging-3': '/assets/images/shop/Shopping_Bags.png',
  'Packaging-4': '/assets/images/shop/Product_Label.png',
  'Packaging-5': '/assets/images/shop/Stickers_.png',

  // Merchandise
  'Merchandise-0': '/assets/images/shop/Tshirt.png',
  'Merchandise-1': '/assets/images/shop/Polo_shirts.jpeg',
  'Merchandise-2': '/assets/images/shop/hoodies.png',
  'Merchandise-3': '/assets/images/shop/caps copy 2.jpeg',
  'Merchandise-4': '/assets/images/shop/jackets.png',
  'Merchandise-5': '/assets/images/shop/Tote_Bags.png',
  'Merchandise-6': '/assets/images/shop/Umbrellas.png',
  'Merchandise-7': '/assets/images/shop/Mugs copy 2.jpeg',
  'Merchandise-8': '/assets/images/shop/Water_Bottles.png',
  'Merchandise-9': '/assets/images/shop/pens copy 2.png',
  'Merchandise-10': '/assets/images/shop/Notebooks copy 2.jpeg',
  'Merchandise-11': '/assets/images/shop/Diaries copy 2.png',
  'Merchandise-12': '/assets/images/shop/Key_Holders copy 2.png',
  'Merchandise-13': '/assets/images/shop/Wristbands.jpeg',
  'Merchandise-14': '/assets/images/shop/Lanyards copy 2.png',
  'Merchandise-15': '/assets/images/shop/USB_Drives.png',
  'Merchandise-16': '/assets/images/shop/Power_banks.png',
  'Merchandise-17': '/assets/images/shop/Phone_Accessories copy 2.png',

  // Events & Activations
  'Events & Activations-0': '/assets/images/shop/Backdrops_banner copy 2.png',
  'Events & Activations-1': '/assets/images/shop/Exibition_Stands copy 2.png',
  'Events & Activations-2': '/assets/images/shop/Exibition_wall copy 2.png',
  'Events & Activations-3': '/assets/images/shop/popup_displays.png',
  'Events & Activations-4': '/assets/images/shop/Pull-up_Banners copy.jpeg',
  'Events & Activations-5': '/assets/images/shop/Event_Banners copy 2.png',
  'Events & Activations-6': '/assets/images/shop/Branded_Tables copy 2.png',
  'Events & Activations-7': '/assets/images/shop/Event_Tickets copy 2.jpeg',
  'Events & Activations-9': '/assets/images/shop/Wristbands.png',

  // Office Materials
  'Office Materials-0': '/assets/images/shop/Notebooks copy 3.jpeg',
  'Office Materials-1': '/assets/images/shop/Diaries copy 2.png',
  'Office Materials-2': '/assets/images/shop/Calenders.png',
  'Office Materials-3': '/assets/images/shop/pens copy 3.png',
  'Office Materials-4': '/assets/images/shop/Business_Cards.png',

  // Promotional
  'Promotional-0': '/assets/images/shop/Discount_votchers copy 2.png',
  'Promotional-1': '/assets/images/shop/Coupons.png',
  'Promotional-2': '/assets/images/shop/Loyalty_cards copy 2.png',
  'Promotional-3': '/assets/images/shop/Promotional_stickers.jpeg',
  'Promotional-4': '/assets/images/shop/Branded_Giveaways copy 2.png',

  // Signage
  'Signage-0': '/assets/images/shop/Door_signs copy 2.png',
  'Signage-1': '/assets/images/shop/Directional_signs copy 2.jpeg',
  'Signage-2': '/assets/images/shop/Safety_signs.png',
  'Signage-3': '/assets/images/shop/Parking_Signs copy 2.png',
  'Signage-4': '/assets/images/shop/3D_Lettering copy 2.png',
  'Signage-5': '/assets/images/shop/Acrylic_Signs copy 2.png',
  'Signage-6': '/assets/images/shop/Stainless_Steel_Signs.png',
  'Signage-7': '/assets/images/shop/Neon_Signs copy 2.png',
};

const CATEGORY_ITEMS: Record<CategoryName, string[]> = {
  'Sales Materials': ['Brochures', 'Flyers'],
  Advertising: ['Flyers', 'Posters', 'Brochures', 'Leaflets', 'Table Talkers'],
  Outdoor: [
    'Billboards',
    'Building Wraps',
    'Wall Branding',
    'Shop Signage',
    'Storefront Signs',
    'Lightbox Signs',
    'Pull-Up Banners',
    'X-Banners',
    'Roll-Up Banners',
    'A-Frame Signs',
    'Directional Signs',
    'Roadside Signs',
    'Bajaj Branding',
    'Bus Branding',
    'Bajaj Branding',
  ],
  Packaging: [
    'Product Packaging',
    'Boxes',
    'Paper Bags',
    'Shopping Bags',
    'Product Labels',
    'Stickers',
  ],
  Merchandise: [
    'T-Shirts',
    'Polo Shirts',
    'Hoodies',
    'Caps',
    'Jackets',
    'Tote Bags',
    'Umbrellas',
    'Mugs',
    'Water Bottles',
    'Pens',
    'Notebooks',
    'Diaries',
    'Keyholders',
    'Wristbands',
    'Lanyards',
    'USB Drives',
    'Power Banks',
    'Phone Accessories',
  ],
  'Events & Activations': [
    'Event Backdrops',
    'Exhibition Stands',
    'Exhibition Walls',
    'Pop-Up Displays',
    'Pull-Up Banners',
    'Event Banners',
    'Branded Tables',
    'Event Tickets',
    'Name Badges',
    'Wristbands',
    'Event Signage',
    'Directional Signage',
  ],
  'Office Materials': ['Notebooks', 'Diaries', 'Calendars', 'Pens', 'Business Cards'],
  Promotional: [
    'Discount Vouchers',
    'Coupons',
    'Loyalty Cards',
    'Promotional Stickers',
    'Branded Giveaways',
  ],
  Signage: [
    'Door Signs',
    'Directional Signs',
    'Safety Signs',
    'Parking Signs',
    '3D Lettering',
    'Acrylic Signs',
    'Stainless Steel Signs',
    'Neon Signs',
  ],
};

function buildProducts(): Product[] {
  const products: Product[] = [];
  (Object.keys(CATEGORY_ITEMS) as CategoryName[]).forEach((cat) => {
    const items = CATEGORY_ITEMS[cat];
    const images = CATEGORY_IMAGES[cat];
    items.forEach((name, i) => {
      products.push({
        id: `${cat}-${i}`,
        name,
        category: cat,
        image:
          UPLOADED_IMAGE_OVERRIDES[`${cat}-${i}`] ?? images[i % images.length],
      });
    });
  });
  return products;
}

const PRODUCTS = buildProducts();
const PAGE_SIZE = 9;

export function Shop() {
  const [activeCat, setActiveCat] = useState<FilterName>('Merchandise');
  const [page, setPage] = useState(1);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filtered = useMemo(
    () =>
      activeCat === 'All'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCat),
    [activeCat],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const isPaginated = activeCat === 'All' && totalPages > 1;
  const visible = isPaginated
    ? filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : filtered;

  const getQty = (id: string) => quantities[id] ?? 1;

  const setQty = (id: string, qty: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, qty) }));

  const orderViaWhatsApp = (p: Product) => {
    const qty = getQty(p.id);
    const message = `Hello Seen — I'd like to order:\n\n• ${p.name} x${qty}`;
    window.open(waLink(message), '_blank');
  };

  const selectCategory = (cat: FilterName) => {
    setActiveCat(cat);
    setPage(1);
  };

  return (
    <section
      id="shop"
      className="relative z-10 bg-ivory-2 px-5 py-24 sm:px-8 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="mb-3 text-sm tracking-[0.2em] text-bronze uppercase">
            Shop
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Let&rsquo;s Make It Seen
          </h2>
          <p className="mt-4 max-w-lg text-sm text-ink-soft sm:text-base">
            Easy ordering. Confirm via WhatsApp.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {CATEGORIES_WITH_ALL.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                activeCat === cat
                  ? 'bg-ink text-ivory'
                  : 'bg-ivory text-ink-soft hover:bg-rule'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => {
            const qty = getQty(p.id);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                className="flex flex-col rounded-2xl border border-rule bg-ivory p-5"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-rule">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="mb-4 font-heading text-base tracking-tight text-ink sm:text-lg">
                  {p.name}
                </h3>

                {/* Qty stepper */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xs text-stone">Qty</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(p.id, qty - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:bg-ink hover:text-ivory"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm text-ink">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(p.id, qty + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:bg-ink hover:text-ivory"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => orderViaWhatsApp(p)}
                  className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-bronze py-2.5 text-xs text-ivory transition-colors hover:bg-bronze-soft"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Add to order
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination */}
        {isPaginated && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:bg-ink hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                  page === p
                    ? 'bg-ink text-ivory'
                    : 'border border-rule text-ink-soft hover:bg-rule'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:bg-ink hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
