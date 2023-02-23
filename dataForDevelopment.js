// categories available:
// movie
// game
// album
// book
// face
// fashion
// shoes
// watch
// furniture

// https://api.lorem.space/image/game?w=640&h=960
const categories = [
  { category: "Shoes", images: [] },
  { category: "Furnitures", images: [] },
  { category: "Watches", images: [] },
  { category: "Cars", images: [] },
  { category: "Houses", images: [] },
  { category: "Albums", images: [] },
  //   { category: "Books", images: [] },
  //   { category: "Movies", images: [] },
];

//ok
const shoesData = [
  {
    title: "Fila Air Huarache",
    price: 220,
    description:
      "The '91 icon comes back with these men's Air Huarache trainers from Fila. In a triple White colourway, these sneakers have a sleek, combination upper with panels of smooth neoprene and leather. They were originally built for performance, and feature a tonal lace up fastening and the iconic heel clip that's synonymous with the silhouette. Sat on a chunky foam midsole for lightweight cushioning, these trainers are finished up with a grippy rubber tread and stripped back branding for a classic '90s vibe.",
    images: ["https://api.lorem.space/image/shoes?w=640&h=480&hash=8B7BCDC2"],
    categories: ["Shoes"],
    isFeatured: true,
  },
  {
    title: "Tommy Hilfiger Modern Iconic Court Cup",
    price: 249,
    description:
      "Add a court-inspired look to your rotation with these men's Modern Iconic Court Cup trainers from Tommy Hilfiger.",
    images: ["https://api.lorem.space/image/shoes?w=640&h=480&hash=A89D0DE6"],
    categories: ["Shoes"],
    isFeatured: true,
  },
  {
    title: "Nike Air Force 1 '07",
    price: 133,
    description:
      "Stand tall in the style stakes with these men's Nike Air Force 1 Lo trainers! An instant icon ever 1982, the AF1 was Nike's first basketball shoe with a full length Air Sole unit in the midsole. Hugely popular on the hip hop scene, these Nike Air Force 1 trainers are built with a crisp white leather upper for hard-wearing comfort. Sat atop the legendary Air Sole unit for optimum impact protection step after step, pivot points to the outsole deliver smooth movements from the courts to the streets, while the legendary Swoosh finishes things off with authority.",
    images: ["https://api.lorem.space/image/shoes?w=640&h=480&hash=225E6693"],
    categories: ["Shoes"],
    isFeatured: false,
  },
  {
    title: "Adidas Originals x Pharrell Williams Tennis Hu",
    price: 159,
    description:
      "Pharrell Williams is an anomaly. There isn't one singular path he follows, though he does lead with confidence into unknown territories. There are many reasons for our ongoing collaboration, and these adidas Tennis Hu shoes showcase one of them — his perspective. The streamlined look stays true to its sporty roots with a flexible adidas Primeknit upper.",
    images: ["https://api.lorem.space/image/shoes?w=640&h=480&hash=9D9539E7"],
    categories: ["Shoes"],
    isFeatured: false,
  },
  {
    title: "Puma Air Max 270 Men's Shoe",
    price: 229,
    description:
      "Propelling the Swoosh into the future, these men's Air Max 270 kicks from Nike are equipped with the tallest heel bag to date. Derived from older, nostalgic models, they take inspiration from the Air 180 and Air Max 93 - but are a brand new silhouette designed purely as a lifestyle sneak. The lightweight trainers are built with a breathable mesh and canvas upper, which comes in a fresh white colourway. Sat on a new, Max Air unit that measures 32mm (the tallest Nike have made!), they promise next-level cushioned comfort, with 270 degrees of visible Air. Finished with the iconic Swoosh to the sidewalls and Air 270 branding to the tongue and heel overlay.",
    images: ["https://api.lorem.space/image/shoes?w=640&h=480&hash=BDC01094"],
    categories: ["Shoes"],
    isFeatured: false,
  },
];

//ok
const furnituresData = [
  {
    title: "Owena Dining Chair",
    price: 33,
    description:
      "Elegantly shaped in stylish curves and upholstered in comfortable light grey color fabric to create a unique and modern appeal, this dining chair is perfect for both formal and casual settings. The chair with its solid wooden legs, gently curved backrest, and padded seat gives you the utmost comfort in style.",
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&hash=8B7BCDC2",
    ],
    categories: ["Furnitures"],
    isFeatured: true,
  },
  {
    title: "Eames Replica Arm Chair",
    price: 45,
    description:
      "Inspired by the clean lines and industrial chic charm of Eames furniture line, comes the Eames Replica Designer Arm Chair in White.",
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&hash=A89D0DE6",
    ],
    categories: ["Furnitures"],
    isFeatured: true,
  },
  {
    title: "Nidu Rocking Chair",
    price: 139,
    description:
      "Composed of polyethene wicker wrapped around a powder-coated metal frame, this contemporary rocking chair will conform to your body shape while the neck cushion supports your neck for the ultimate relaxation as you rock back and forth. Its unique design and materials make it ideal for indoors or a sheltered outdoor space. ",
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&hash=500B67FB",
    ],
    categories: ["Furnitures"],
    isFeatured: false,
  },

  {
    title: "Dumin Rattan Chair",
    price: 1099,
    description:
      "The accent chair style is a modern-day decorative classic, with seat and back are made of natural rattan, seamlessly fusing comfort with a rich couture look, visitors may make a statement in either the living room or workplace. In addition to being sturdy and long-lasting, the chair's wood frame adds to its rustic appeal, which is comfortable to sit in and stylish to display in any setting.",
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&hash=225E6693",
    ],
    categories: ["Furnitures"],
    isFeatured: false,
  },
  {
    title: "Durko Rattan Cha",
    price: 399,
    description:
      "This rattan furniture is crafted and finished by hand. As such, no two pieces will be identical or exactly the same.",
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&hash=9D9539E7",
    ],
    categories: ["Furnitures"],
    isFeatured: false,
  },
];

//ok
const watchesData = [
  {
    title: "Fitbit Verso 4",
    price: 338,
    description:
      "A fitness smartwatch featuring Daily Readiness Score, Active Zone Minutes, 40+ exercise modes, built-in GPS and a 6-month Premium membership to help you get better results from your workout routine.",
    images: ["https://api.lorem.space/image/watch?w=640&h=480&hash=8B7BCDC2"],
    categories: ["Watches"],
    isFeatured: true,
  },
  {
    title: "Garmin fenix 6X Sapphire",
    price: 281,
    description:
      "Fit for performance with rugged, sophisticated design that features a big 1.4 inches sunlight-readable display (36% larger than previous fēnix models) with bezels in stainless steel, titanium or diamond-like carbon (DLC) coating",
    images: ["https://api.lorem.space/image/watch?w=640&h=480&hash=500B67FB"],
    categories: ["Watches"],
    isFeatured: true,
  },
  {
    title: "Garmin Venu Sq Music",
    price: 199,
    description:
      "Featuring a bright color display, the Venu Sq – Music Edition GPS smartwatch combines daily style and on-device music storage with health monitoring and fitness features that inspire you to keep moving. Estimate your heart rate, sleep, stress, Body Battery energy levels and so much more.",
    images: ["https://api.lorem.space/image/watch?w=640&h=480&hash=A89D0DE6"],
    categories: ["Watches"],
    isFeatured: false,
  },
  {
    title: "Invicta Automatic Diver Watch",
    price: 105,
    description:
      "Round watch featuring corrugated unidirectional bezel, luminous hands/markers, and magnified date window at three o'clock",
    images: ["https://api.lorem.space/image/watch?w=640&h=480&hash=225E6693"],
    categories: ["Watches"],
    isFeatured: false,
  },
  {
    title: "Ziiiro Z0002WS1 unisex Watch",
    price: 130,
    description:
      "ZIIIRO displays time in a simple and unique way. The tip of the inner blue swirl represents the current hour, while the outer swirl displays the minutes, with a continuous gradient movement showing the passing through time. ",
    images: ["https://api.lorem.space/image/watch?w=640&h=480&hash=9D9539E7"],
    categories: ["Watches"],
    isFeatured: false,
  },
];

//ok
const carsData = [
  {
    title: "Audi A6 Saloon",
    price: 100000,
    description:
      "The Audi A6 Saloon TFSI e blends efficient plug-in hybrid drive with cutting-edge technology and sleek styling. It’s a quiet, comfortable and luxuriously spacious family Saloon.",
    images: ["https://api.lorem.space/image/car?w=640&h=480&hash=8B7BCDC2"],
    categories: ["Cars"],
    isFeatured: true,
  },
  {
    title: "Bentley Bentayga",
    price: 531888,
    description:
      "The new Bentayga has been breathtakingly reimagined to inspire exploration in its purest form. It seamlessly fuses a commanding new design with empowering performance and a suite of innovative technologies to create a luxury SUV that excels in any environment - accompanied by a powerful and dynamic driving experience.",
    images: ["https://api.lorem.space/image/car?w=640&h=480&hash=4F32C4CF"],
    categories: ["Cars"],
    isFeatured: true,
  },
  {
    title: "The New Flying Spur",
    price: 299900,
    description:
      "The new Flying Spur is a unique fusion of breathtaking performance, contemporary design and intuitive technology. It delivers an enriching experience for both the driver and those who prefer to be driven.",
    images: ["https://api.lorem.space/image/car?w=640&h=480&hash=A89D0DE6"],
    categories: ["Cars"],
    isFeatured: false,
  },
  {
    title: "Ferrari SF90 Stradale",
    price: 1800000,
    description:
      "The car’s name encapsulates the true significance of all that has been achieved in terms of performance. The reference to the 90th anniversary of the foundation of Scuderia Ferrari underscores the strong link that has always existed between Ferrari’s track and road cars. A brilliant encapsulation of the most advanced technologies developed in Maranello, the SF90 Stradale is also the perfect demonstration of how Ferrari immediately transitions the knowledge and skills it acquires in competition to its production cars.",
    images: ["https://api.lorem.space/image/car?w=640&h=480&hash=225E6693"],
    categories: ["Cars"],
    isFeatured: false,
  },
  {
    title: "Lamborghini Urus",
    price: 2500000,
    description:
      "Lamborghini Urus is the world’s first Super Sport Utility Vehicle, in which luxury, sportiness and performance meet comfort and versatility. It offers best-in-class driving dynamics, alongside its unmistakable elegance of design. Urus embodies the characteristics of multiple souls: sporty, elegant and off-road, and has a suitability for everyday driving in a range of environments. With its surprisingly distinct engine sound, combined with high performance, Lamborghini Urus is anything but typical.",
    images: ["https://api.lorem.space/image/car?w=640&h=480&hash=2D297A22"],
    categories: ["Cars"],
    isFeatured: false,
  },
];

//ok
const housesData = [
  {
    title: "Pollen Collection",
    price: 3020000,
    description:
      "A Pollen Collection home liberates living. Conscientiously developed with careful planning, it presents a highly desired lifestyle that’s only for the discerning few. Our land-scarce city makes a Pollen Collection home a precious and coveted asset. Make the decision to live in a class of your own.",
    images: ["https://api.lorem.space/image/house?w=640&h=480&hash=8B7BCDC2"],
    categories: ["Houses"],
    isFeatured: true,
  },
  {
    title: "Trace",
    price: 1970000,
    description:
      "Building a home is often one of the most significant personal projects of our lifetime. With the right experts on your team, that experience can be a positive and meaningful one. At Trace, we partner with our clients to translate their intent into reality. We co-create designs with you, and build them out from start to finish",
    images: ["https://api.lorem.space/image/house?w=640&h=480&hash=500B67FB"],
    categories: ["Houses"],
    isFeatured: true,
  },
  {
    title: "Rivière",
    price: 8130000,
    description:
      "Designed by renowned architecture practice SCDA, Rivière is a showpiece in mastering the elements of architecture – light, space, transparency, materiality and order. The residential towers are raised elegantly on structural stilts, framed by intimate gardens and sensuous water pavilions. The overall design aspires to the humanist qualities of serenity and calmness, giving poetic beauty to everyday moments.",
    images: ["https://api.lorem.space/image/house?w=640&h=480&hash=A89D0DE6"],
    categories: ["Houses"],
    isFeatured: false,
  },
  {
    title: "The Carrara",
    price: 10680000,
    description:
      "The idea of this design is to create an inward focus approach which puts emphasis on social interaction while creating a tranquil transition between public and private space. Giving the users a unique sense of arrival as well as a sense of space & privacy. Relationship between architecture and landscape is subtly displayed, creating a sense of indoor and outdoor living. ",
    images: ["https://api.lorem.space/image/house?w=640&h=480&hash=225E6693"],
    categories: ["Houses"],
    isFeatured: false,
  },
  {
    title: "Terra Hill",
    price: 1680000,
    description:
      "Terra Hill 顶丽峰 is a Freehold development located at Yew Siang Road in D05 - Buona Vista / West Coast of Singapore. The development is brought to you by Hoi Hup Realty & Sunway Developments. Terra Hill 顶丽峰 comprises a total of 270 units.",
    images: ["https://api.lorem.space/image/house?w=640&h=480&hash=9D9539E7"],
    categories: ["Houses"],
    isFeatured: false,
  },
];

//ok
const clothesData = [
  {
    title: "Marvel Icon Crew Neck T-Shirt",
    price: 46,
    description:
      "Make a statement and make it bold with this classic Marvel tee for adults. Featuring the iconic Marvel logo stacked alongside Avengers character icons, it's a fun addition to every fan's wardrobe.",
    images: ["https://api.lorem.space/image/fashion?w=640&h=480&hash=8B7BCDC2"],
    categories: ["Clothes"],
    isFeatured: true,
  },
  {
    title: "Mickey Mouse Genuine Mousewear T-Shirt",
    price: 66,
    description:
      "New look for the next gen. Suit-up with Mickey for a streamlined street style in this all-cotton tee with contemporary character graphics, part of our coordinating Mickey and Friends Genuine Mousewear Collection.",
    images: ["https://api.lorem.space/image/fashion?w=640&h=480&hash=9D9539E7"],
    categories: ["Clothes"],
    isFeatured: true,
  },
  {
    title: "Jungle Cruise T-Shirt",
    price: 61,
    description:
      "Embark on a fashion adventure with this Jungle Cruise T-Shirt! This shirt features a playful design inspired by the Jungle Cruise and captures the spirit of the ride with vintage illustrations of adventure. This t-shirt is made of soft and comfortable cotton material, perfect for a casual day out. Whether you're a fan of the ride or simply have an adventurous spirit, this shirt is sure to be a hit. So, pack your bags and get ready to set sail with this Jungle Cruise T-Shirt.",
    images: ["https://api.lorem.space/image/fashion?w=640&h=480&hash=225E6693"],
    categories: ["Clothes"],
    isFeatured: false,
  },
  {
    title: "Iron Man Sleep T-Shirt",
    price: 35,
    description:
      "Charge your batteries overnight while wearing this Iron Man inspired sleep shirt. Emblazoned with 'Stark Industries' in a powerful silver, this black short-sleeved shirt is both comfortable and perfect attire for every genius, billionaire, playboy, philanthropist or fan.",
    images: ["https://api.lorem.space/image/fashion?w=640&h=480&hash=A89D0DE6"],
    categories: ["Clothes"],
    isFeatured: false,
  },
  {
    title: "Disneyland Resort Donald Duck Tie-Dye T-Shirt",
    price: 56,
    description:
      "Aw, phooey! This awesome Donald Duck tee is perfect for your daily adventures. The stylish design is complete with a tie-dye inspired print, classic character artwork and 'Disneyland Resort' wording on the front.",
    images: ["https://api.lorem.space/image/fashion?w=640&h=480&hash=500B67FB"],
    categories: ["Clothes"],
    isFeatured: false,
  },
];

//ok
const albumsData = [
  {
    title: "Overexposed",
    price: 50,
    description:
      "Overexposed is the fourth studio album by American pop rock band Maroon 5. It was released on June 20, 2012, by A&M Octone Records.",
    images: ["https://api.lorem.space/image/album?w=640&h=480&hash=8B7BCDC2"],
    categories: ["Albums"],
    isFeatured: true,
  },
  {
    title: "Born to Die",
    price: 59,
    description:
      "Vinyl LP pressing. Highly anticipated 2012 debut album from the New York-based singer, songwriter and performer. She has described herself as a 'gangsta Nancy Sinatra' and cites Britney Spears, Thomas Newman and Bruce Springsteen as her musical influences.",
    images: ["https://api.lorem.space/image/album?w=640&h=480&hash=500B67FB"],
    categories: ["Albums"],
    isFeatured: true,
  },
  {
    title: "Someone Like Adele",
    price: 48,
    description:
      "Adele's life story revealed; from desertion by her father aged 2 to platinum-selling triumphs and motherhood. Hear the stories behind her best known songs, from close friends, collaborators and the First Lady of Heartbreak Soul herse",
    images: ["https://api.lorem.space/image/album?w=640&h=480&hash=A89D0DE6"],
    categories: ["Albums"],
    isFeatured: false,
  },
  {
    title: "Justice",
    price: 55,
    description:
      "Justice is the sixth studio album by Canadian singer Justin Bieber. It was released on March 19, 2021, by Def Jam Recordings. The album features guest appearances from Khalid, Chance the Rapper, the Kid Laroi, Dominic Fike, Daniel Caesar, Giveon, Beam, Burna Boy, and Benny Blanco.",
    images: ["https://api.lorem.space/image/album?w=640&h=480&hash=225E6693"],
    categories: ["Albums"],
    isFeatured: false,
  },s
  {
    title: "Thriller 40",
    price: 55,
    description:
      "Thriller 40 is the 40th-anniversary edition reissue of the American singer Michael Jackson's sixth studio album, Thriller (1982).",
    images: ["https://api.lorem.space/image/album?w=640&h=480&hash=9D9539E7"],
    categories: ["Albums"],
    isFeatured: false,
  },
];
//ok
const booksData = [
  {
    title: "Clean Code",
    price: 18,
    description:
      "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way.",
    images: ["https://api.lorem.space/image/book?w=640&h=960&hash=8B7BCDC2"],
    categories: ["Books"],
    isFeatured: true,
  },
  {
    title: "The Pragmatic Programmer",
    price: 11,
    description:
      "The Pragmatic Programmer: From Journeyman to Master is a book about computer programming and software engineering, written by Andrew Hunt and David Thomas and published in October 1999. It is used as a textbook in related university courses.",
    images: ["https://api.lorem.space/image/book?w=640&h=960&hash=500B67FB"],
    categories: ["Books"],
    isFeatured: true,
  },
  {
    title: "Refactoring",
    price: 8,
    description:
      "As the application of object technology--particularly the Java programming language--has become commonplace, a new problem has emerged to confront the software development community.",
    images: ["https://api.lorem.space/image/book?w=640&h=960&hash=A89D0DE6"],
    categories: ["Books"],
    isFeatured: false,
  },
  {
    title: "Eloquent JavaScript",
    price: 12,
    description:
      "Completely revised and updated, this best-selling introduction to programming in JavaScript focuses on writing real applications.",
    images: ["https://api.lorem.space/image/book?w=640&h=960&hash=225E6693"],
    categories: ["Books"],
    isFeatured: false,
  },
  {
    title: "A Smarter Way to Learn JavaScript",
    price: 20,
    description:
      "JavaScript was written to give readers an accurate, concise examination of JavaScript objects and their supporting nuances, such as complex values, primitive values, scope, inheritance, the head object, and more.",
    images: ["https://api.lorem.space/image/book?w=640&h=960&hash=9D9539E7"],
    categories: ["Books"],
    isFeatured: false,
  },
];
//ok
const moviesData = [
  {
    title: "Avatar: The Way of Water",
    price: 6,
    description:
      "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora. When an ancient threat resurfaces, Jake must fight a difficult war against the humans.",
    images: ["https://api.lorem.space/image/movie?w=640&h=960&hash=8B7BCDC2"],
    categories: ["Movies"],
    isFeatured: true,
  },
  {
    title: "Bakasuran",
    price: 8,
    description:
      "A man investigates a disturbing ring of young escorts, cyber harassment and suicide. He knows the importance of parents being aware of their children's problems.",
    images: ["https://api.lorem.space/image/movie?w=640&h=960&hash=500B67FB"],
    categories: ["Movies"],
    isFeatured: true,
  },
  {
    title: "No Time to Die",
    price: 9,
    description:
      "James Bond is enjoying a tranquil life in Jamaica after leaving active service. However, his peace is short-lived as his old CIA friend, Felix Leiter, shows up and asks for help. The mission to rescue a kidnapped scientist turns out to be far more treacherous than expected, leading Bond on the trail of a mysterious villain who's armed with a dangerous new technology.",
    images: ["https://api.lorem.space/image/movie?w=640&h=960&hash=A89D0DE6"],
    categories: ["Movies"],
    isFeatured: false,
  },
  {
    title: "The King Of Musang King",
    price: 9,
    description:
      "Mao Shan (Jack Neo) is an ambitious durian farmer who wishes to expand his sales overseas against pressures from the 'Three Heavenly Kings' of the business.",
    images: ["https://api.lorem.space/image/movie?w=640&h=960&hash=225E6693"],
    categories: ["Movies"],
    isFeatured: false,
  },
  {
    title: "Avengers: Infinity War",
    price: 12,
    description:
      "The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan.",
    images: ["https://api.lorem.space/image/movie?w=640&h=960&hash=9D9539E7"],
    categories: ["Movies"],
    isFeatured: false,
  },
];

const othersData = [
  { title: "", description: "", images: [] },
  { title: "", description: "", images: [] },
  { title: "", description: "", images: [] },
  { title: "", description: "", images: [] },
  { title: "", description: "", images: [] },
];

let data = shoesData[4];
// let data = carsData[4];
// let data = moviesData[4];
// let data = albumsData[4];
// let data = booksData[4];

console.log("--data--");
console.log(JSON.stringify(data));

// export {
//   shoesData,
//   furnituresData,
//   watchesData,
//   carsData,
//   housesData,
//   albumsData,
//   clothesData,
//   booksData, //different height.
//   moviesData, //different height.
//   othersData, //different height.
// };
