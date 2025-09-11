export interface OdsEventRecord {
  id: string;
  title_fr: string;
  description_fr?: string;
  image: string; 
  firstdate_begin: string; 
  lastdate_end: string;    
  location_address: string;
  location_city: string;
  location_geopoint: {
    lat: number;
    lon: number;
  };
  keywords_fr: string[];
}

export interface OdsApiResponse {
  total_count: number;
  results: OdsEventRecord[];
}