export interface IncidentCore {
  id: string;
  incidentNumber: number;
  year: number;
  sarCase: boolean;
  rcc: string;
  startDate: string;
  startTime: string;
  incidentDate: string;
  incidentTime: string;
  smc: boolean;
  smcStartDate: string;
  smcStartTime: string;
  smcEndDate: string;
  smcEndTime: string;
  searchObjectLatitude: string;
  searchObjectLongitude: string;
  objectFoundLatitude: string;
  objectFoundLongitude: string;
  distanceOffshore: number;
  whoAlerted: string;
  incidentType: string;
  
  searchObjectName: string;
  searchObjectOfficialNumber: string;
  searchObjectRadioCallsign: string;
  nationalityOfSearchObject: string;
  typeOfSearchObject: string;
  pob: number;
  livesLostBeforeNotification: number;
  livesLostAfterNotification: number;
  livesSaved: number;
  valueOfPropertySaved: number;
}

export interface CollectiveFacilities {
  incidentId: string;
  numberOfAeronauticalUnits: number;
  numberOfGroundUnits: number;
  numberOfMaritimeUnits: number;
  sorties: number;
  dateTasked: string;
  timeTasked: string;
  dateOnScene: string;
  timeOnScene: string;
  dateSearchObjectFound: string;
  timeSearchObjectFound: string;
  dateSearchEnded: string;
  timeSearchEnded: string;
  dateNormal: string;
  timeNormal: string;
  formalSearchPlan: boolean;
  amountOfAreaSearched: number;
}

export interface WeatherCondition {
  id: string;
  incidentId: string;
  dateWeather: string;
  timeWeather: string;
  windSpeed: string;
  windDirection: string;
  airTemperature: number;
  seaTemperature: number;
  seaState: string;
  swellHeight: number;
  seaIceConditions: string;
  cloudCover: string;
  cloudCeiling: string;
  visibility: string;
  precipitation: string;
}

export interface SpecificSARFacility {
  id: string;
  incidentId: string;
  sarFacilityType: string;
  sarFacilityName: string;
  sarFacilityRadioCallsign: string;
  sarFacilityNationality: string;
  sarFacilityDateTasked: string;
  sarFacilityTimeTasked: string;
  sarFacilityDateResponded: string;
  sarFacilityTimeResponded: string;
  sarFacilityDateOnScene: string;
  sarFacilityTimeOnScene: string;
  sarFacilitySorties: number;
  sarFacilityDownTime: string;
  numberLivesRescued: number;
  numberDeceasedRecovered: number;
  sarFacilityDateReleased: string;
  sarFacilityTimeReleased: string;
  sarFacilityDateNormal: string;
  sarFacilityTimeNormal: string;
}

export interface Database {
  incidents: IncidentCore[];
  collectiveFacilities: Record<string, CollectiveFacilities>;
  weatherConditions: WeatherCondition[];
  specificFacilities: SpecificSARFacility[];
}
