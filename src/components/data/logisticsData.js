export const gujaratHubs = {
  ahmedabad: {
    name: 'Ahmedabad Central Mega-Hub',
    location: 'Naroda GIDC & SG Highway Junction',
    capacity: '45,000 Tons/Month',
    deliveryTime: 'Same Day / Next Morning',
    description: 'The master redistribution terminal linking North Gujarat industrial clusters to southern corridors.',
    regionsCovered: ['Sanand', 'Changodar', 'Kalol', 'Kadi']
  },
  surat: {
    name: 'Surat Textile & Apparel Logistics Gate',
    location: 'Kadodara Bypass & Ring Road Terminal',
    capacity: '38,000 Tons/Month',
    deliveryTime: 'Within 12-16 Hours',
    description: 'Primary B2B gateway for cotton apparel, synthetic fabrics, and embroidery machineries.',
    regionsCovered: ['Sayan', 'Sachin GIDC', 'Kamrej', 'Palsana']
  },
  vadodara: {
    name: 'Vadodara Chemical & Heavy Industrial Depot',
    location: 'Makarpura GIDC Logistics Node',
    capacity: '30,000 Tons/Month',
    deliveryTime: 'Within 10-14 Hours',
    description: 'Specialized chemical packing and heavy-duty cargo handling facilities.',
    regionsCovered: ['Nandesari', 'Ranoli', 'Halol GIDC', 'Waghodia']
  },
  rajkot: {
    name: 'Rajkot Engineering & Machine Parts Depot',
    location: 'Metoda GIDC & Gondal Road Highway Port',
    capacity: '25,000 Tons/Month',
    deliveryTime: 'Within 18-24 Hours',
    description: 'Connects pump manufacturers, forging units, and automotive casting wholesalers.',
    regionsCovered: ['Shapar-Veraval', 'Aji Vasahat', 'Hadamtala', 'Lothada']
  }
};

export const fleetDatabase = {
  mini: {
    name: 'Tata Ace Gold / Chhota Hathi',
    payload: '850 KG',
    volume: '150 Cu. Ft.',
    bestFor: 'Intracity grocery supply, quick textile deliveries, and tight market navigation.',
    ratePerKm: '₹12 - ₹15',
    insurance: 'Included'
  },
  medium: {
    name: 'Mahindra Bolero Maxi Truck',
    payload: '1,500 KG',
    volume: '280 Cu. Ft.',
    bestFor: 'Intercity wholesale apparel transport, light chemical drums, and farm produce logistics.',
    ratePerKm: '₹18 - ₹22',
    insurance: 'Included'
  },
  heavy: {
    name: 'Eicher Pro 2049 / 14ft Truck',
    payload: '3,500 KG to 7,000 KG',
    volume: '650 Cu. Ft.',
    bestFor: 'Bulk machinery dispatch, heavy paper reels, and multi-ton chemical shipments.',
    ratePerKm: '₹28 - ₹35',
    insurance: 'Comprehensive Cargo Cover'
  }
};

export const trackingDatabase = {
  'VG-1001': {
    id: 'VG-1001',
    sender: 'Saraswati Garments Wholesalers',
    receiver: 'Balaji Retail Store',
    status: 'Delivered',
    progress: 100,
    steps: [
      { title: 'Order Approved', time: 'June 02, 10:00 AM', done: true },
      { title: 'Dispatched from Hub', time: 'June 02, 02:30 PM', done: true },
      { title: 'In Transit via Tata Ace', time: 'June 03, 09:15 AM', done: true },
      { title: 'Delivered Successfully', time: 'June 04, 11:45 AM', done: true }
    ]
  },
  'VG-1002': {
    id: 'VG-1002',
    sender: 'Supreme Plastic Industries',
    receiver: 'Navkar General Stores',
    status: 'In Transit',
    progress: 66,
    steps: [
      { title: 'Order Approved', time: 'June 03, 04:00 PM', done: true },
      { title: 'Dispatched from Hub', time: 'June 04, 08:00 AM', done: true },
      { title: 'In Transit (On Highway NH-48)', time: 'Expected June 05', done: true },
      { title: 'Out for Delivery', time: 'Pending Assign', done: false }
    ]
  },
  'VG-1003': {
    id: 'VG-1003',
    sender: 'Om Shanti Electronics',
    receiver: 'Alpha Tech Retail',
    status: 'Awaiting Verification',
    progress: 25,
    steps: [
      { title: 'Order Submitted by Retailer', time: 'June 04, 02:10 PM', done: true },
      { title: 'Wholesaler Approval Pending', time: 'Awaiting Check', done: false },
      { title: 'Transporter Assignment', time: 'Pending', done: false },
      { title: 'Delivery', time: 'Pending', done: false }
    ]
  }
};
