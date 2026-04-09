export type Room = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type GalleryPhoto = {
  _id: string;
  url: string;
  caption: string;
  span: string;
  order: number;
};
