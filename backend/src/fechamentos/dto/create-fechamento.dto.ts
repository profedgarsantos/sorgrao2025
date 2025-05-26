import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateFechamentoDto {
  @ApiProperty({ example: 1, description: "ID da oferta relacionada ao fechamento" })
  @IsNumber({}, { message: "ID da oferta deve ser um número" })
  @IsNotEmpty({ message: "ID da oferta não pode ser vazio" })
  oferta_id: number;

  @ApiProperty({ example: 1, description: "ID da demanda relacionada ao fechamento" })
  @IsNumber({}, { message: "ID da demanda deve ser um número" })
  @IsNotEmpty({ message: "ID da demanda não pode ser vazio" })
  demanda_id: number;

  @ApiProperty({ example: 1, description: "ID da empresa relacionada ao fechamento" })
  @IsNumber({}, { message: "ID da empresa deve ser um número" })
  @IsOptional()
  empresas_id?: number;

  @ApiProperty({ example: 500, description: "Quantidade do fechamento" })
  @IsNumber({}, { message: "Quantidade deve ser um número" })
  @IsOptional()
  quantidade?: number;

  @ApiProperty({ example: 145.75, description: "Valor unitário do fechamento" })
  @IsNumber({}, { message: "Valor unitário deve ser um número" })
  @IsOptional()
  valorunitario?: number;

  @ApiProperty({ example: 72875.00, description: "Valor final do fechamento" })
  @IsNumber({}, { message: "Valor final deve ser um número" })
  @IsOptional()
  valorfinal?: number;

  @ApiProperty({ example: "2025-01-15", description: "Data de início da entrega" })
  @IsDateString({}, { message: "Data de início da entrega deve estar no formato YYYY-MM-DD" })
  @IsOptional()
  inicioentrega?: Date;

  @ApiProperty({ example: "2025-01-30", description: "Data de fim da entrega" })
  @IsDateString({}, { message: "Data de fim da entrega deve estar no formato YYYY-MM-DD" })
  @IsOptional()
  fimentrega?: Date;

  @ApiProperty({ example: 1, description: "ID do comissionado (opcional)" })
  @IsNumber({}, { message: "ID do comissionado deve ser um número" })
  @IsOptional()
  comissionado_id?: number;

  @ApiProperty({ example: 728.75, description: "Valor da comissão (opcional)" })
  @IsNumber({}, { message: "Valor da comissão deve ser um número" })
  @IsOptional()
  valorcomissionado?: number;
}
