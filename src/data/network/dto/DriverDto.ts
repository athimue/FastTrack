export type DriverResponse = {
  MRData: {
    DriverTable: DriverTableDto;
    limit: number;
    offset: number;
    sefies: string;
    total: number;
    url: string;
    xmlns: string;
  };
};

export type DriverTableDto = {
  Drivers: DriverDto[];
};

export type DriverDto = {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: string;
};
