// List of 1000+ words for generating unique game names
export const words = [
  // Nature words
  'Ocean', 'Mountain', 'Forest', 'River', 'Desert', 'Valley', 'Meadow', 'Canyon', 'Island', 'Beach',
  'Sunset', 'Sunrise', 'Moon', 'Star', 'Cloud', 'Rainbow', 'Thunder', 'Lightning', 'Snow', 'Rain',
  'Wind', 'Storm', 'Breeze', 'Mist', 'Fog', 'Dew', 'Frost', 'Ice', 'Fire', 'Flame',
  'Tree', 'Flower', 'Leaf', 'Root', 'Branch', 'Seed', 'Petal', 'Bloom', 'Garden', 'Vine',
  'Rose', 'Lily', 'Daisy', 'Tulip', 'Orchid', 'Lotus', 'Jasmine', 'Violet', 'Iris', 'Poppy',
  'Oak', 'Pine', 'Maple', 'Cedar', 'Willow', 'Birch', 'Palm', 'Bamboo', 'Redwood', 'Cypress',
  
  // Animals
  'Eagle', 'Falcon', 'Hawk', 'Owl', 'Raven', 'Swan', 'Crane', 'Heron', 'Phoenix', 'Dragon',
  'Lion', 'Tiger', 'Wolf', 'Fox', 'Bear', 'Deer', 'Elk', 'Moose', 'Panther', 'Leopard',
  'Dolphin', 'Whale', 'Shark', 'Turtle', 'Seal', 'Otter', 'Penguin', 'Salmon', 'Trout', 'Koi',
  'Butterfly', 'Dragonfly', 'Firefly', 'Bee', 'Hummingbird', 'Sparrow', 'Robin', 'Jay', 'Cardinal', 'Finch',
  
  // Colors
  'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Gold', 'Silver', 'Bronze',
  'Crimson', 'Scarlet', 'Ruby', 'Coral', 'Amber', 'Topaz', 'Jade', 'Emerald', 'Sapphire', 'Azure',
  'Indigo', 'Violet', 'Lavender', 'Magenta', 'Teal', 'Cyan', 'Turquoise', 'Cobalt', 'Navy', 'Ivory',
  'Pearl', 'Onyx', 'Obsidian', 'Marble', 'Crystal', 'Diamond', 'Opal', 'Garnet', 'Amethyst', 'Quartz',
  
  // Elements & Materials
  'Stone', 'Rock', 'Pebble', 'Sand', 'Dust', 'Ash', 'Coal', 'Iron', 'Steel', 'Copper',
  'Glass', 'Mirror', 'Prism', 'Lens', 'Spark', 'Glow', 'Shine', 'Gleam', 'Shimmer', 'Glitter',
  'Silk', 'Velvet', 'Satin', 'Linen', 'Cotton', 'Wool', 'Leather', 'Feather', 'Fur', 'Scale',
  
  // Weather & Sky
  'Aurora', 'Nebula', 'Comet', 'Meteor', 'Eclipse', 'Galaxy', 'Cosmos', 'Nova', 'Pulsar', 'Quasar',
  'Twilight', 'Dawn', 'Dusk', 'Noon', 'Midnight', 'Morning', 'Evening', 'Night', 'Day', 'Horizon',
  
  // Water
  'Wave', 'Tide', 'Current', 'Stream', 'Creek', 'Brook', 'Spring', 'Waterfall', 'Cascade', 'Rapids',
  'Lake', 'Pond', 'Pool', 'Harbor', 'Bay', 'Cove', 'Lagoon', 'Reef', 'Shore', 'Coast',
  'Ripple', 'Splash', 'Drop', 'Bubble', 'Foam', 'Spray', 'Mist', 'Vapor', 'Steam', 'Drizzle',
  
  // Places
  'Temple', 'Palace', 'Castle', 'Tower', 'Bridge', 'Gate', 'Path', 'Trail', 'Road', 'Lane',
  'Village', 'Town', 'City', 'Kingdom', 'Empire', 'Realm', 'Domain', 'Haven', 'Sanctuary', 'Oasis',
  'Garden', 'Park', 'Grove', 'Orchard', 'Prairie', 'Plains', 'Highlands', 'Lowlands', 'Marsh', 'Swamp',
  
  // Time & Seasons
  'Spring', 'Summer', 'Autumn', 'Winter', 'Solstice', 'Equinox', 'Season', 'Era', 'Age', 'Epoch',
  'Moment', 'Second', 'Minute', 'Hour', 'Century', 'Decade', 'Year', 'Month', 'Week', 'Today',
  
  // Abstract concepts
  'Dream', 'Vision', 'Hope', 'Faith', 'Love', 'Peace', 'Joy', 'Bliss', 'Harmony', 'Balance',
  'Wisdom', 'Truth', 'Honor', 'Glory', 'Grace', 'Beauty', 'Light', 'Shadow', 'Spirit', 'Soul',
  'Mind', 'Heart', 'Courage', 'Strength', 'Power', 'Energy', 'Force', 'Magic', 'Mystery', 'Wonder',
  'Destiny', 'Fate', 'Fortune', 'Luck', 'Chance', 'Choice', 'Will', 'Desire', 'Passion', 'Zeal',
  
  // Actions & States
  'Rising', 'Falling', 'Flowing', 'Glowing', 'Growing', 'Flying', 'Dancing', 'Singing', 'Dreaming', 'Wandering',
  'Silent', 'Gentle', 'Swift', 'Bold', 'Bright', 'Dark', 'Deep', 'High', 'Wide', 'Long',
  'Ancient', 'Eternal', 'Infinite', 'Mystic', 'Sacred', 'Divine', 'Royal', 'Noble', 'Grand', 'Majestic',
  
  // Music & Art
  'Song', 'Melody', 'Rhythm', 'Harmony', 'Symphony', 'Sonata', 'Ballad', 'Anthem', 'Chorus', 'Verse',
  'Canvas', 'Palette', 'Brush', 'Sketch', 'Portrait', 'Mosaic', 'Tapestry', 'Sculpture', 'Carving', 'Craft',
  
  // Food & Drink
  'Honey', 'Sugar', 'Spice', 'Salt', 'Pepper', 'Cinnamon', 'Vanilla', 'Mint', 'Ginger', 'Sage',
  'Apple', 'Cherry', 'Peach', 'Plum', 'Berry', 'Grape', 'Lemon', 'Orange', 'Mango', 'Coconut',
  'Coffee', 'Tea', 'Cocoa', 'Nectar', 'Wine', 'Cider', 'Brew', 'Elixir', 'Potion', 'Tonic',
  
  // Objects
  'Crown', 'Throne', 'Scepter', 'Shield', 'Sword', 'Bow', 'Arrow', 'Spear', 'Staff', 'Wand',
  'Ring', 'Pendant', 'Amulet', 'Charm', 'Token', 'Relic', 'Artifact', 'Treasure', 'Gem', 'Jewel',
  'Book', 'Scroll', 'Map', 'Compass', 'Clock', 'Bell', 'Key', 'Lock', 'Chest', 'Box',
  'Candle', 'Lantern', 'Torch', 'Lamp', 'Beacon', 'Signal', 'Flag', 'Banner', 'Crest', 'Seal',
  
  // Shapes & Patterns
  'Circle', 'Square', 'Triangle', 'Spiral', 'Helix', 'Wave', 'Grid', 'Matrix', 'Pattern', 'Design',
  'Arc', 'Curve', 'Line', 'Point', 'Angle', 'Edge', 'Corner', 'Center', 'Core', 'Vertex',
  
  // Directions & Positions
  'North', 'South', 'East', 'West', 'Above', 'Below', 'Within', 'Beyond', 'Between', 'Around',
  'Inner', 'Outer', 'Upper', 'Lower', 'Front', 'Back', 'Left', 'Right', 'Central', 'Polar',
  
  // More nature
  'Volcano', 'Glacier', 'Cavern', 'Cliff', 'Ridge', 'Peak', 'Summit', 'Slope', 'Basin', 'Delta',
  'Jungle', 'Savanna', 'Tundra', 'Taiga', 'Steppe', 'Dune', 'Plateau', 'Mesa', 'Butte', 'Gorge',
  
  // Celestial
  'Sun', 'Luna', 'Terra', 'Mars', 'Venus', 'Jupiter', 'Saturn', 'Neptune', 'Mercury', 'Pluto',
  'Orion', 'Andromeda', 'Cassiopeia', 'Draco', 'Leo', 'Aquila', 'Cygnus', 'Lyra', 'Pegasus', 'Perseus',
  
  // Mythical
  'Unicorn', 'Griffin', 'Sphinx', 'Chimera', 'Hydra', 'Kraken', 'Leviathan', 'Basilisk', 'Cerberus', 'Minotaur',
  'Fairy', 'Pixie', 'Sprite', 'Nymph', 'Mermaid', 'Siren', 'Angel', 'Seraph', 'Cherub', 'Guardian',
  
  // More abstract
  'Zenith', 'Nadir', 'Apex', 'Pinnacle', 'Acme', 'Summit', 'Crest', 'Crown', 'Peak', 'Height',
  'Abyss', 'Void', 'Chasm', 'Depth', 'Bottom', 'Base', 'Foundation', 'Root', 'Origin', 'Source',
  'Alpha', 'Omega', 'Delta', 'Sigma', 'Theta', 'Lambda', 'Gamma', 'Beta', 'Zeta', 'Kappa',
  
  // Technology (modern touch)
  'Pixel', 'Vector', 'Binary', 'Digital', 'Virtual', 'Cyber', 'Quantum', 'Atomic', 'Nano', 'Micro',
  'Circuit', 'Network', 'Signal', 'Pulse', 'Wave', 'Frequency', 'Amplitude', 'Phase', 'Spectrum', 'Array',
  
  // Emotions & Feelings
  'Serene', 'Calm', 'Tranquil', 'Peaceful', 'Quiet', 'Still', 'Soft', 'Warm', 'Cool', 'Fresh',
  'Vibrant', 'Vivid', 'Radiant', 'Brilliant', 'Luminous', 'Lustrous', 'Dazzling', 'Sparkling', 'Glorious', 'Splendid',
  
  // More animals
  'Jaguar', 'Cheetah', 'Gazelle', 'Antelope', 'Buffalo', 'Bison', 'Rhino', 'Hippo', 'Giraffe', 'Zebra',
  'Cobra', 'Viper', 'Python', 'Gecko', 'Iguana', 'Chameleon', 'Salamander', 'Newt', 'Frog', 'Toad',
  'Raven', 'Crow', 'Magpie', 'Peacock', 'Parrot', 'Toucan', 'Flamingo', 'Pelican', 'Albatross', 'Condor',
  
  // Plants
  'Fern', 'Moss', 'Lichen', 'Ivy', 'Holly', 'Clover', 'Thistle', 'Heather', 'Lavender', 'Rosemary',
  'Thyme', 'Basil', 'Oregano', 'Parsley', 'Cilantro', 'Dill', 'Fennel', 'Anise', 'Caraway', 'Cumin',
  
  // Gems & Minerals
  'Agate', 'Jasper', 'Malachite', 'Turquoise', 'Lapis', 'Moonstone', 'Sunstone', 'Bloodstone', 'Peridot', 'Citrine',
  'Zircon', 'Spinel', 'Tanzanite', 'Alexandrite', 'Tourmaline', 'Aquamarine', 'Beryl', 'Carnelian', 'Chalcedony', 'Chrysoprase',
  
  // Architecture
  'Arch', 'Column', 'Pillar', 'Dome', 'Spire', 'Turret', 'Battlement', 'Parapet', 'Rampart', 'Bastion',
  'Chapel', 'Cathedral', 'Monastery', 'Abbey', 'Shrine', 'Altar', 'Sanctum', 'Chamber', 'Hall', 'Gallery',
  
  // Fabrics & Textures
  'Brocade', 'Damask', 'Chiffon', 'Organza', 'Tulle', 'Lace', 'Embroidery', 'Tapestry', 'Weave', 'Knit',
  'Smooth', 'Rough', 'Soft', 'Hard', 'Shiny', 'Matte', 'Glossy', 'Frosted', 'Polished', 'Rustic',
  
  // Weather phenomena
  'Cyclone', 'Typhoon', 'Hurricane', 'Tornado', 'Blizzard', 'Avalanche', 'Flood', 'Drought', 'Heatwave', 'Coldsnap',
  'Halo', 'Corona', 'Sundogs', 'Moonbow', 'Fogbow', 'Glory', 'Mirage', 'Fata', 'Morgana', 'Borealis',
  
  // Numbers & Quantities
  'Single', 'Double', 'Triple', 'Quad', 'Penta', 'Hexa', 'Hepta', 'Octa', 'Nona', 'Deca',
  'Prime', 'Perfect', 'Golden', 'Fibonacci', 'Euler', 'Pi', 'Phi', 'Tau', 'Infinity', 'Zero',
  
  // Verbs as adjectives
  'Blazing', 'Burning', 'Shining', 'Gleaming', 'Twinkling', 'Flickering', 'Pulsing', 'Throbbing', 'Beating', 'Racing',
  'Soaring', 'Diving', 'Climbing', 'Descending', 'Ascending', 'Hovering', 'Floating', 'Drifting', 'Sailing', 'Cruising',
  
  // More places
  'Citadel', 'Fortress', 'Stronghold', 'Outpost', 'Camp', 'Settlement', 'Colony', 'Frontier', 'Border', 'Boundary',
  'Market', 'Plaza', 'Square', 'Court', 'Arena', 'Stadium', 'Coliseum', 'Amphitheater', 'Theater', 'Stage',
  
  // Nautical
  'Anchor', 'Sail', 'Mast', 'Hull', 'Deck', 'Stern', 'Bow', 'Port', 'Starboard', 'Rudder',
  'Lighthouse', 'Pier', 'Dock', 'Wharf', 'Marina', 'Shipyard', 'Fleet', 'Armada', 'Voyage', 'Journey',
  
  // Musical instruments
  'Piano', 'Violin', 'Cello', 'Flute', 'Harp', 'Lyre', 'Drum', 'Bell', 'Chime', 'Gong',
  'Guitar', 'Mandolin', 'Banjo', 'Ukulele', 'Sitar', 'Koto', 'Shamisen', 'Erhu', 'Didgeridoo', 'Bagpipe',
  
  // Dance styles
  'Waltz', 'Tango', 'Salsa', 'Ballet', 'Jazz', 'Swing', 'Tap', 'Folk', 'Flamenco', 'Samba',
  
  // Writing & Literature
  'Epic', 'Saga', 'Legend', 'Myth', 'Fable', 'Tale', 'Story', 'Chapter', 'Volume', 'Tome',
  'Poem', 'Sonnet', 'Haiku', 'Ode', 'Elegy', 'Limerick', 'Rhyme', 'Prose', 'Essay', 'Novel',
  
  // Science
  'Atom', 'Molecule', 'Cell', 'Gene', 'DNA', 'RNA', 'Protein', 'Enzyme', 'Catalyst', 'Reaction',
  'Proton', 'Neutron', 'Electron', 'Photon', 'Quark', 'Boson', 'Fermion', 'Hadron', 'Lepton', 'Meson',
  
  // Geography
  'Peninsula', 'Isthmus', 'Archipelago', 'Atoll', 'Fjord', 'Strait', 'Channel', 'Gulf', 'Sound', 'Inlet',
  'Continent', 'Subcontinent', 'Region', 'Province', 'District', 'County', 'Parish', 'Borough', 'Ward', 'Quarter',
  
  // More adjectives
  'Pristine', 'Immaculate', 'Flawless', 'Perfect', 'Ideal', 'Supreme', 'Ultimate', 'Paramount', 'Sovereign', 'Imperial',
  'Humble', 'Modest', 'Simple', 'Plain', 'Pure', 'Clean', 'Clear', 'Transparent', 'Opaque', 'Translucent',
  'Ancient', 'Antique', 'Vintage', 'Classic', 'Timeless', 'Ageless', 'Perpetual', 'Enduring', 'Lasting', 'Permanent',
  'Modern', 'Contemporary', 'Current', 'Present', 'Future', 'Progressive', 'Advanced', 'Innovative', 'Revolutionary', 'Pioneering',
  
  // Final additions
  'Zenith', 'Apex', 'Pinnacle', 'Summit', 'Crest', 'Peak', 'Top', 'Crown', 'Head', 'Tip',
  'Echo', 'Resonance', 'Vibration', 'Oscillation', 'Undulation', 'Fluctuation', 'Variation', 'Modulation', 'Transformation', 'Metamorphosis'
];

// Function to generate a unique game name
export function generateGameName() {
  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
  return `${getRandomWord()} ${getRandomWord()} ${getRandomWord()}`;
}

export default words;
