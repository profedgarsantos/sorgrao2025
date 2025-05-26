import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateDemandaDto {
  @ApiProperty({ example: 1000, description: "Quantidade da demanda" })
  @IsNumber({}, { message: "Quantidade deve ser um número" })
  @IsOptional()
  quantidade?: number;

  @ApiProperty({ example: 150.50, description: "Valor unitário da demanda" })
  @IsNumber({}, { message: "Valor unitário deve ser um número" })
  @IsOptional()
  valorunitario?: number;

  @ApiProperty({ example: "2024-12-31", description: "Data de validade da demanda" })
  @IsDateString({}, { message: "Data de validade deve estar no formato YYYY-MM-DD" })
  @IsOptional()
  validade?: Date;

  @ApiProperty({ example: false, description: "Indica se a demanda está finalizada" })
  @IsBoolean({ message: "Finalizado deve ser um booleano" })
  @IsOptional()
  finalizado?: boolean;

  @ApiProperty({ example: 500, description: "Capacidade de recepção da demanda" })
  @IsNumber({}, { message: "Capacidade de recepção deve ser um número" })
  @IsOptional()
  capacidaderecepcao?: number;

  @ApiProperty({ example: false, description: "Indica se a demanda está cancelada" })
  @IsBoolean({ message: "Cancelado deve ser um booleano" })
  @IsOptional()
  cancelado?: boolean;

  @ApiProperty({ example: 1, description: "ID do produto relacionado à demanda" })
  @IsNumber({}, { message: "ID do produto deve ser um número" })
  @IsNotEmpty({ message: "ID do produto não pode ser vazio" })
  produtos_id: number;

  @ApiProperty({ example: 1, description: "ID do comprador relacionado à demanda" })
  @IsNumber({}, { message: "ID do comprador deve ser um número" })
  @IsNotEmpty({ message: "ID do comprador não pode ser vazio" })
  compradores_id: number;

  @ApiProperty({ example: 1, description: "ID da empresa relacionada à demanda" })
  @IsNumber({}, { message: "ID da empresa deve ser um número" })
  @IsOptional()
  empresas_id?: number;
}
