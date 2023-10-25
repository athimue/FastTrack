export class Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: string;

  constructor(
    driverId: string,
    permanentNumber: string,
    code: string,
    url: string,
    givenName: string,
    familyName: string,
    dateOfBirth: Date,
    nationality: string
  ) {
    this.driverId = driverId;
    this.permanentNumber = permanentNumber;
    this.code = code;
    this.url = url;
    this.givenName = givenName;
    this.familyName = familyName;
    this.dateOfBirth = dateOfBirth;
    this.nationality = nationality;
  }
}
