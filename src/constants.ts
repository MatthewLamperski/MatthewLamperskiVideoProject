export const theme = {
  colors: {
    brand: {
      darkOrange: '#FF5000',
      orange: '#FF6300',
      lightOrange: '#FF6E00',
      darkInk: '#191F24',
      ink: '#232A31',
      coolGray11CP: '#38434F',
      typewriter: '#4E5D6C',
      electric: '#009CE3',
      white: '#FFFFFF',
      darkGray: '#DCE1E6',
      gray: '#EDF0F2',
      lightGray: '#F9FAFB',
    },
    utility: {
      action: '#009CE3',
      information: '#4D6680',
      confirmation: '#78A100',
      warning: '#F2B600',
      critical: '#E81C00',
    },
    background: {
      light: '#EDF0F2',
      dark: '#222222',
    },
  },
};

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: number; //number of seconds
  credit: string;
};

export const VIDEOS: Video[] = [
  {
    id: 'BigBuckBunny',
    title: 'Big Buck Bunny',
    duration: 596,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    credit: 'https://gist.github.com/jsturgis/3b19447b304616f18657',
  },
  {
    id: 'ElephantsDream',
    title: "Elephant's Dream",
    duration: 653,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    credit: 'https://gist.github.com/jsturgis/3b19447b304616f18657',
  },
  {
    id: 'ForBiggerBlazes',
    title: 'For Bigger Blazes',
    duration: 15,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    credit: 'https://gist.github.com/jsturgis/3b19447b304616f18657',
  },
  {
    id: 'ForBiggerEscapes',
    title: 'For Bigger Escapes',
    duration: 15,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    credit: 'https://gist.github.com/jsturgis/3b19447b304616f18657',
  },
  {
    id: 'ForBiggerFun',
    title: 'For Bigger Fun',
    duration: 60,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
    credit: 'https://gist.github.com/jsturgis/3b19447b304616f18657',
  },
  {
    id: 'ForBiggerJoyrides',
    title: 'For Bigger Joyrides',
    duration: 15,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    credit: 'https://gist.github.com/jsturgis/3b19447b304616f18657',
  },
  {
    id: 'ForBiggerMeltdowns',
    title: 'For Bigger Meltdowns',
    duration: 15,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    credit: 'https://gist.github.com/jsturgis/3b19447b304616f18657',
  },
  {
    id: 'SubaruOutbackOnStreetAndDirt',
    title: 'Subary Outback on Street and Dirt',
    duration: 594,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    thumbnail:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
    credit: 'https://gist.github.com/jsturgis/3b19447b304616f18657',
  },
  {
    id: 'TearsOfSteel',
    title: 'Tears Of Steal',
    duration: 734,
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    credit: 'https://gist.github.com/jsturgis/3b19447b304616f18657',
  },
];
