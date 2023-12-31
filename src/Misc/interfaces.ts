
export interface FormValues {
  user:string
  title: string;
  desp: string;
  TagArray: string[];
  media:media[];
}
export interface media{
  name:string
  url:string
}
export interface UserRecord {

  userid: number;
  title: string;
  description: string;
  tags: string[];
  media: media[] ;
  ruid:string
}
export interface UserRecord2 {
  ruid:string
  userid: number;
  title: string;
  description: string;
  tags: string;
  media: media[] ;
}

export interface PickedDocument {
  mimeType: string;
  name: string;
  size: number;
  uri: string;
}