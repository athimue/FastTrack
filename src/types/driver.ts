export type DriverResponse = {
  MRData: {
    DriverTable: DriverTable;
    limit: number;
    offset: number;
    sefies: string;
    total: number;
    url: string;
    xmlns: string;
  };
};

export type DriverTable = {
  Drivers: Driver[];
};

export type Driver = {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: string;
};
