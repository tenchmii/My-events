export interface OdsEventRecord {
  uid: string; 
  id?: string;
  title_fr: string;
  description_fr?: string;
  image: string; 
  firstdate_begin: string; 
  lastdate_end: string;    
  location_address: string;
  location_city: string;
  originagenda_title: string;
  longdescription_fr: string;
  location_name: string;
  conditions_fr: string;
  location_coordinates: {
    lat: number;
    lon: number;
  };
  keywords_fr: string[];
}

export interface OdsApiResponse {
  total_count: number;
  results: OdsEventRecord[];
}