import { Constructor } from "../../../domain/model/Constructor";

export interface ConstructorDto {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export function toConstructor(constructorDto: ConstructorDto): Constructor {
  return new Constructor(
    constructorDto.constructorId,
    constructorDto.url,
    constructorDto.name,
    constructorDto.nationality
  );
}
