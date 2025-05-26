import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator"
import { CalcularFreteDto } from "./calcular-frete.dto"

export class CalcularOfertaCompletaDto extends CalcularFreteDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "ID da oferta é obrigatório" })
  @IsNumber({}, { message: "ID da oferta deve ser um número" })
  oferta_id: number

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "ID do comissionado é obrigatório" })
  @IsNumber({}, { message: "ID do comissionado deve ser um número" })
  comissionado_id: number

  @ApiProperty({ example: 0.5, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Percentual de comissão deve ser um número" })
  @Min(0, { message: "Percentual de comissão deve ser maior ou igual a zero" })
  percentual_comissao?: number
}
