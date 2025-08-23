// Sample maritime datasets for demonstration purposes
export const SAMPLE_DATASETS = [
  {
    id: 'bulk-carrier-sof',
    title: 'Bulk Carrier SoF (Dry Cargo Loading)',
    vessel: 'MV Oceanic Bulk',
    port: 'Rotterdam, Netherlands',
    type: 'Bulk Carrier',
    icon: 'Ship',
    description: 'Grain loading operations with minor weather delays',
    fileSize: '2.1 MB',
    eventsCount: 12,
    data: {
      vesselName: 'MV Oceanic Bulk',
      port: 'Rotterdam, Netherlands',
      arrival: '2025-08-20T08:00:00Z',
      noticeOfReadiness: '2025-08-20T09:15:00Z',
      berthing: '2025-08-20T12:30:00Z',
      operationsCommenced: '2025-08-20T14:00:00Z',
      operationsCompleted: '2025-08-22T18:45:00Z',
      departure: '2025-08-22T20:30:00Z',
      cargoType: 'Grain',
      cargoQuantity: '10,000 MT',
      events: [
        { time: '2025-08-20T08:00:00Z', description: 'Vessel arrived at anchorage and awaited pilot' },
        { time: '2025-08-20T09:15:00Z', description: 'NOR tendered and accepted; vessel proceeded to berth' },
        { time: '2025-08-20T12:30:00Z', description: 'Berthing completed; holds inspected' },
        { time: '2025-08-20T14:00:00Z', description: 'Loading commenced; 4,000 MT loaded' },
        { time: '2025-08-21T00:00:00Z', description: 'Night stop due to port regulations' },
        { time: '2025-08-21T06:00:00Z', description: 'Loading continued; additional 5,000 MT loaded' },
        { time: '2025-08-22T00:00:00Z', description: 'Night stop' },
        { time: '2025-08-22T06:00:00Z', description: 'Final loading; 1,000 MT completed' },
        { time: '2025-08-22T18:45:00Z', description: 'Documents signed; vessel unberthed' }
      ],
      remarks: 'Minor delay due to rain on August 21 (2 hours). All operations per charter party terms.',
      signatures: ['Master John Doe', 'Agent Maria Lopez', 'Shipper Cargo Inc.']
    }
  },
  {
    id: 'oil-tanker-sof',
    title: 'Oil Tanker SoF (Liquid Cargo Discharging)',
    vessel: 'MT Pacific Oil',
    port: 'Houston, USA',
    type: 'Oil Tanker',
    icon: 'Droplets',
    description: 'Crude oil discharge operations with smooth performance',
    fileSize: '3.4 MB',
    eventsCount: 10,
    data: {
      vesselName: 'MT Pacific Oil',
      port: 'Houston, USA',
      arrival: '2025-08-15T10:30:00Z',
      noticeOfReadiness: '2025-08-15T11:45:00Z',
      berthing: '2025-08-15T13:00:00Z',
      operationsCommenced: '2025-08-15T15:30:00Z',
      operationsCompleted: '2025-08-17T09:15:00Z',
      departure: '2025-08-17T11:45:00Z',
      cargoType: 'Crude Oil',
      cargoQuantity: '50,000 barrels',
      events: [
        { time: '2025-08-15T10:30:00Z', description: 'Arrived at pilot station; awaited clearance' },
        { time: '2025-08-15T11:45:00Z', description: 'NOR tendered and accepted' },
        { time: '2025-08-15T13:00:00Z', description: 'Berthed; safety checks and hose connections' },
        { time: '2025-08-15T15:30:00Z', description: 'Discharging started; 20,000 barrels pumped' },
        { time: '2025-08-16T00:00:00Z', description: 'Overnight pumping continued; 15,000 barrels' },
        { time: '2025-08-16T08:00:00Z', description: 'Stop for tank gauging' },
        { time: '2025-08-16T09:00:00Z', description: 'Discharging resumed; 10,000 barrels' },
        { time: '2025-08-17T00:00:00Z', description: 'Final discharging; 5,000 barrels completed' },
        { time: '2025-08-17T09:15:00Z', description: 'Hoses disconnected; vessel prepared for departure' }
      ],
      remarks: 'No delays; smooth operations. Weather clear throughout.',
      signatures: ['Master Alex Rivera', 'Terminal Rep Sarah Kim', 'Receiver Oil Corp.']
    }
  },
  {
    id: 'container-ship-sof',
    title: 'Container Ship SoF (Container Loading/Unloading)',
    vessel: 'MV Global Container',
    port: 'Singapore, Singapore',
    type: 'Container Ship',
    icon: 'Package',
    description: 'Container handling operations with minor crane delays',
    fileSize: '1.9 MB',
    eventsCount: 8,
    data: {
      vesselName: 'MV Global Container',
      port: 'Singapore, Singapore',
      arrival: '2025-08-05T14:00:00Z',
      noticeOfReadiness: '2025-08-05T14:45:00Z',
      berthing: '2025-08-05T16:15:00Z',
      operationsCommenced: '2025-08-05T17:30:00Z',
      operationsCompleted: '2025-08-06T22:30:00Z',
      departure: '2025-08-07T00:45:00Z',
      cargoType: 'Containers',
      cargoQuantity: '300 TEU',
      events: [
        { time: '2025-08-05T14:00:00Z', description: 'Vessel arrived at roads; customs clearance' },
        { time: '2025-08-05T14:45:00Z', description: 'NOR tendered; pilot boarded' },
        { time: '2025-08-05T16:15:00Z', description: 'Berthed; crane setup' },
        { time: '2025-08-05T17:30:00Z', description: 'Operations started; 100 TEU handled' },
        { time: '2025-08-06T00:00:00Z', description: 'Night operations; 80 TEU' },
        { time: '2025-08-06T06:00:00Z', description: 'Break for crew shift' },
        { time: '2025-08-06T07:00:00Z', description: 'Continued handling; 120 TEU completed' },
        { time: '2025-08-06T22:30:00Z', description: 'Final checks; lashings secured' }
      ],
      remarks: 'Slight congestion delay (1 hour) on August 6 due to crane maintenance.',
      signatures: ['Master Elena Vargas', 'Agent Tom Chen', 'Port Authority Rep Lee Wong']
    }
  },
  {
    id: 'chemical-tanker-sof',
    title: 'Chemical Tanker SoF (Chemical Discharging)',
    vessel: 'MT Chem Horizon',
    port: 'Antwerp, Belgium',
    type: 'Chemical Tanker',
    icon: 'Beaker',
    description: 'Safe chemical cargo discharge with no incidents',
    fileSize: '2.7 MB',
    eventsCount: 9,
    data: {
      vesselName: 'MT Chem Horizon',
      port: 'Antwerp, Belgium',
      arrival: '2025-08-01T09:15:00Z',
      noticeOfReadiness: '2025-08-01T10:30:00Z',
      berthing: '2025-08-01T12:00:00Z',
      operationsCommenced: '2025-08-01T14:15:00Z',
      operationsCompleted: '2025-08-03T10:30:00Z',
      departure: '2025-08-03T12:15:00Z',
      cargoType: 'Chemicals',
      cargoQuantity: '8,000 MT',
      events: [
        { time: '2025-08-01T09:15:00Z', description: 'Arrived anchorage; awaited berth allocation' },
        { time: '2025-08-01T10:30:00Z', description: 'NOR accepted; vessel maneuvered to berth' },
        { time: '2025-08-01T12:00:00Z', description: 'Berthed; safety protocols and connections' },
        { time: '2025-08-01T14:15:00Z', description: 'Discharging commenced; 3,000 MT transferred' },
        { time: '2025-08-02T00:00:00Z', description: 'Continued discharging; 2,500 MT' },
        { time: '2025-08-02T08:00:00Z', description: 'Inspection stop' },
        { time: '2025-08-02T09:00:00Z', description: 'Resumed; 1,500 MT' },
        { time: '2025-08-03T00:00:00Z', description: 'Final transfer; 1,000 MT completed' },
        { time: '2025-08-03T10:30:00Z', description: 'Cleanup and departure prep' }
      ],
      remarks: 'Hazardous cargo handled safely; no incidents.',
      signatures: ['Master Raj Patel', 'Receiver Chem Ltd.', 'Agent Fiona Green']
    }
  },
  {
    id: 'coal-loading-sof',
    title: 'Dry Bulk SoF (Coal Loading)',
    vessel: 'MV Coal Master',
    port: 'Shanghai, China',
    type: 'Bulk Carrier',
    icon: 'Mountain',
    description: 'Coal loading with dust control measures',
    fileSize: '2.3 MB',
    eventsCount: 10,
    data: {
      vesselName: 'MV Coal Master',
      port: 'Shanghai, China',
      arrival: '2025-08-10T06:45:00Z',
      noticeOfReadiness: '2025-08-10T07:45:00Z',
      berthing: '2025-08-10T10:15:00Z',
      operationsCommenced: '2025-08-10T11:45:00Z',
      operationsCompleted: '2025-08-12T16:45:00Z',
      departure: '2025-08-12T18:30:00Z',
      cargoType: 'Coal',
      cargoQuantity: '15,000 MT',
      events: [
        { time: '2025-08-10T06:45:00Z', description: 'Arrived at outer anchorage' },
        { time: '2025-08-10T07:45:00Z', description: 'NOR tendered; pilotage' },
        { time: '2025-08-10T10:15:00Z', description: 'Berthed; hold preparation' },
        { time: '2025-08-10T11:45:00Z', description: 'Loading started; 5,000 MT' },
        { time: '2025-08-11T00:00:00Z', description: 'Continued; 5,000 MT' },
        { time: '2025-08-11T12:00:00Z', description: 'Lunch break' },
        { time: '2025-08-11T13:00:00Z', description: 'Loading; 3,000 MT' },
        { time: '2025-08-12T00:00:00Z', description: 'Final loading; 2,000 MT' },
        { time: '2025-08-12T16:45:00Z', description: 'Surveys and sailing' }
      ],
      remarks: 'Dust control measures in place; minor weather delay (30 mins).',
      signatures: ['Master Li Wei', 'Shipper Coal Export Co.', 'Agent Zhang Mei']
    }
  },
  {
    id: 'lng-tanker-sof',
    title: 'LNG Tanker SoF (Gas Discharging)',
    vessel: 'MT Gas Pioneer',
    port: 'Tokyo, Japan',
    type: 'LNG Tanker',
    icon: 'Flame',
    description: 'LNG discharge with strict safety protocols',
    fileSize: '3.1 MB',
    eventsCount: 11,
    data: {
      vesselName: 'MT Gas Pioneer',
      port: 'Tokyo, Japan',
      arrival: '2025-08-25T05:30:00Z',
      noticeOfReadiness: '2025-08-25T06:45:00Z',
      berthing: '2025-08-25T08:00:00Z',
      operationsCommenced: '2025-08-25T10:30:00Z',
      operationsCompleted: '2025-08-27T14:00:00Z',
      departure: '2025-08-27T16:00:00Z',
      cargoType: 'LNG',
      cargoQuantity: '20,000 m³',
      events: [
        { time: '2025-08-25T05:30:00Z', description: 'Arrived at quarantine anchorage' },
        { time: '2025-08-25T06:45:00Z', description: 'NOR accepted' },
        { time: '2025-08-25T08:00:00Z', description: 'Berthed; cooling down procedures' },
        { time: '2025-08-25T10:30:00Z', description: 'Discharging started; 7,000 m³' },
        { time: '2025-08-26T00:00:00Z', description: 'Continued; 6,000 m³' },
        { time: '2025-08-26T12:00:00Z', description: 'Safety meeting stop' },
        { time: '2025-08-26T13:00:00Z', description: 'Resumed; 4,000 m³' },
        { time: '2025-08-27T00:00:00Z', description: 'Final discharging; 3,000 m³' },
        { time: '2025-08-27T14:00:00Z', description: 'Warm-up and departure' }
      ],
      remarks: 'Strict safety protocols followed; no boil-off issues.',
      signatures: ['Master Hiroshi Tanaka', 'Terminal Rep Yumi Sato', 'Receiver Gas Japan']
    }
  },
  {
    id: 'roro-vessel-sof',
    title: 'Ro-Ro Vessel SoF (Vehicle Loading)',
    vessel: 'MV Auto Transporter',
    port: 'Bremerhaven, Germany',
    type: 'Ro-Ro Vessel',
    icon: 'Car',
    description: 'Vehicle loading operations with no damages',
    fileSize: '1.8 MB',
    eventsCount: 8,
    data: {
      vesselName: 'MV Auto Transporter',
      port: 'Bremerhaven, Germany',
      arrival: '2025-08-18T11:00:00Z',
      noticeOfReadiness: '2025-08-18T12:15:00Z',
      berthing: '2025-08-18T14:00:00Z',
      operationsCommenced: '2025-08-18T15:45:00Z',
      operationsCompleted: '2025-08-19T20:00:00Z',
      departure: '2025-08-19T22:00:00Z',
      cargoType: 'Vehicles',
      cargoQuantity: '500 units',
      events: [
        { time: '2025-08-18T11:00:00Z', description: 'Arrived port limits' },
        { time: '2025-08-18T12:15:00Z', description: 'NOR tendered' },
        { time: '2025-08-18T14:00:00Z', description: 'Berthed; ramp deployment' },
        { time: '2025-08-18T15:45:00Z', description: 'Loading commenced; 200 units' },
        { time: '2025-08-19T00:00:00Z', description: 'Night loading; 150 units' },
        { time: '2025-08-19T08:00:00Z', description: 'Crew rest stop' },
        { time: '2025-08-19T09:00:00Z', description: 'Final loading; 150 units' },
        { time: '2025-08-19T20:00:00Z', description: 'Securing and clearance' }
      ],
      remarks: 'Efficient operation; no damages reported.',
      signatures: ['Master Karl Schmidt', 'Agent Anna Muller', 'Shipper Auto GmbH']
    }
  },
  {
    id: 'general-cargo-sof',
    title: 'General Cargo SoF (Mixed Cargo Discharging)',
    vessel: 'MV Versatile Cargo',
    port: 'Mumbai, India',
    type: 'General Cargo',
    icon: 'Package2',
    description: 'Mixed cargo discharge with monsoon delays',
    fileSize: '2.5 MB',
    eventsCount: 9,
    data: {
      vesselName: 'MV Versatile Cargo',
      port: 'Mumbai, India',
      arrival: '2025-08-12T07:30:00Z',
      noticeOfReadiness: '2025-08-12T08:45:00Z',
      berthing: '2025-08-12T10:30:00Z',
      operationsCommenced: '2025-08-12T12:00:00Z',
      operationsCompleted: '2025-08-14T17:30:00Z',
      departure: '2025-08-14T19:30:00Z',
      cargoType: 'Mixed Cargo',
      cargoQuantity: '12,000 MT',
      events: [
        { time: '2025-08-12T07:30:00Z', description: 'Arrived outer harbor' },
        { time: '2025-08-12T08:45:00Z', description: 'NOR accepted' },
        { time: '2025-08-12T10:30:00Z', description: 'Berthed; cargo survey' },
        { time: '2025-08-12T12:00:00Z', description: 'Discharging started; 4,000 MT' },
        { time: '2025-08-13T00:00:00Z', description: 'Continued; 3,500 MT' },
        { time: '2025-08-13T12:00:00Z', description: 'Lunch halt' },
        { time: '2025-08-13T13:00:00Z', description: 'Resumed; 3,000 MT' },
        { time: '2025-08-14T00:00:00Z', description: 'Final discharging; 1,500 MT' },
        { time: '2025-08-14T17:30:00Z', description: 'Customs and sailing' }
      ],
      remarks: 'Monsoon rain caused 1-hour delay on August 13.',
      signatures: ['Master Amit Singh', 'Receiver Import Traders', 'Agent Priya Desai']
    }
  },
  {
    id: 'reefer-ship-sof',
    title: 'Reefer Ship SoF (Perishable Cargo Loading)',
    vessel: 'MV Fresh Voyager',
    port: 'Valparaiso, Chile',
    type: 'Reefer Ship',
    icon: 'Snowflake',
    description: 'Temperature-controlled fruit loading operations',
    fileSize: '2.2 MB',
    eventsCount: 9,
    data: {
      vesselName: 'MV Fresh Voyager',
      port: 'Valparaiso, Chile',
      arrival: '2025-08-28T13:00:00Z',
      noticeOfReadiness: '2025-08-28T14:15:00Z',
      berthing: '2025-08-28T16:00:00Z',
      operationsCommenced: '2025-08-28T17:30:00Z',
      operationsCompleted: '2025-08-29T21:00:00Z',
      departure: '2025-08-29T23:00:00Z',
      cargoType: 'Fruit',
      cargoQuantity: '6,000 MT',
      events: [
        { time: '2025-08-28T13:00:00Z', description: 'Arrived anchorage' },
        { time: '2025-08-28T14:15:00Z', description: 'NOR tendered' },
        { time: '2025-08-28T16:00:00Z', description: 'Berthed; refrigeration checks' },
        { time: '2025-08-28T17:30:00Z', description: 'Loading started; 2,500 MT' },
        { time: '2025-08-29T00:00:00Z', description: 'Continued; 2,000 MT' },
        { time: '2025-08-29T08:00:00Z', description: 'Quality inspection stop' },
        { time: '2025-08-29T09:00:00Z', description: 'Final loading; 1,500 MT' },
        { time: '2025-08-29T21:00:00Z', description: 'Temperature stabilization and departure' }
      ],
      remarks: 'Perishable cargo maintained at 2°C; no spoilage.',
      signatures: ['Master Carlos Mendoza', 'Shipper Fruit Export', 'Agent Sofia Ruiz']
    }
  },
  {
    id: 'heavy-lift-sof',
    title: 'Heavy Lift Vessel SoF (Project Cargo Loading)',
    vessel: 'MV Heavy Lifter',
    port: 'Dubai, UAE',
    type: 'Heavy Lift Vessel',
    icon: 'Crane',
    description: 'Specialized heavy machinery loading operations',
    fileSize: '3.8 MB',
    eventsCount: 10,
    data: {
      vesselName: 'MV Heavy Lifter',
      port: 'Dubai, UAE',
      arrival: '2025-08-30T09:45:00Z',
      noticeOfReadiness: '2025-08-30T11:00:00Z',
      berthing: '2025-08-30T13:15:00Z',
      operationsCommenced: '2025-08-30T15:00:00Z',
      operationsCompleted: '2025-09-01T11:00:00Z',
      departure: '2025-09-01T13:00:00Z',
      cargoType: 'Machinery',
      cargoQuantity: '4,000 MT',
      events: [
        { time: '2025-08-30T09:45:00Z', description: 'Arrived port entrance' },
        { time: '2025-08-30T11:00:00Z', description: 'NOR accepted' },
        { time: '2025-08-30T13:15:00Z', description: 'Berthed; crane rigging' },
        { time: '2025-08-30T15:00:00Z', description: 'Loading commenced; 1,500 MT' },
        { time: '2025-08-31T00:00:00Z', description: 'Continued; 1,000 MT' },
        { time: '2025-08-31T12:00:00Z', description: 'Safety brief stop' },
        { time: '2025-08-31T13:00:00Z', description: 'Resumed; 800 MT' },
        { time: '2025-09-01T00:00:00Z', description: 'Final lifts; 700 MT' },
        { time: '2025-09-01T11:00:00Z', description: 'Securing and clearance' }
      ],
      remarks: 'Oversized cargo handled with specialized equipment; no incidents.',
      signatures: ['Master Omar Khalid', 'Agent Layla Hassan', 'Shipper Project Eng.']
    }
  }
];

// Helper function to get sample dataset by ID
export const getSampleDatasetById = (id) => {
  return SAMPLE_DATASETS?.find(dataset => dataset?.id === id) || null;
};

// Helper function to get all sample datasets grouped by type
export const getSampleDatasetsByType = () => {
  const grouped = {};
  SAMPLE_DATASETS?.forEach(dataset => {
    if (!grouped?.[dataset?.type]) {
      grouped[dataset.type] = [];
    }
    grouped?.[dataset?.type]?.push(dataset);
  });
  return grouped;
};

// Helper function to simulate sample dataset processing
export const processSampleDataset = (datasetId) => {
  const dataset = getSampleDatasetById(datasetId);
  if (!dataset) return null;

  return {
    id: `sample-${datasetId}-${Date.now()}`,
    name: `${dataset?.title}.pdf`,
    type: 'pdf',
    size: parseInt(dataset?.fileSize?.replace(/[^0-9.]/g, '') * 1024 * 1024),
    uploadedAt: new Date()?.toISOString(),
    status: 'completed',
    eventsExtracted: dataset?.eventsCount,
    isSample: true,
    sampleData: dataset?.data
  };
};