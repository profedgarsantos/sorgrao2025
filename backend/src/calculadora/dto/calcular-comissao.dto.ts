import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, Min } from "class-validator"

export class CalcularComissaoDto {
  @ApiProperty({ example: 10000 })
  @IsNotEmpty({ message: "Valor da operação é obrigatório" })
  @IsNumber({}, { message: "Valor da operação deve ser um número" })
  @Min(0, { message: "Valor da operação deve ser maior ou igual a zero" })
  valor_operacao: number

  @ApiProperty({ example: 0.5 })
  @IsNotEmpty({ message: "Percentual de comissão é obrigatório" })
  @IsNumber({}, { message: "Percentual de comissão deve ser um número" })
  @Min(0, { message: "Percentual de comissão deve ser maior ou igual a zero" })
  percentual_comissao: number
}
