import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString, IsIn, Min } from "class-validator"

export class CreateComissionadoDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "ID do vendedor é obrigatório" })
  @IsNumber({}, { message: "ID do vendedor deve ser um número" })
  vendedor_id: number

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: "ID da operação deve ser um número" })
  operacao_id?: number

  @ApiProperty({ example: "venda", enum: ["venda", "compra", "frete", "outro"], required: false })
  @IsOptional()
  @IsString({ message: "Tipo de operação deve ser uma string" })
  @IsIn(["venda", "compra", "frete", "outro"], { message: "Tipo de operação inválido" })
  operacao_tipo?: string

  @ApiProperty({ example: 500.75 })
  @IsNotEmpty({ message: "Valor é obrigatório" })
  @IsNumber({}, { message: "Valor deve ser um número" })
  @Min(0, { message: "Valor deve ser maior ou igual a zero" })
  valor: number

  @ApiProperty({ example: 2.5 })
  @IsNotEmpty({ message: "Percentual é obrigatório" })
  @IsNumber({}, { message: "Percentual deve ser um número" })
  @Min(0, { message: "Percentual deve ser maior ou igual a zero" })
  percentual: number

  @ApiProperty({ example: "2023-01-15" })
  @IsNotEmpty({ message: "Data é obrigatória" })
  @IsDateString({}, { message: "Data deve estar no formato ISO" })
  data: string

  @ApiProperty({ example: "pendente", enum: ["pendente", "pago", "cancelado"], required: false })
  @IsOptional()
  @IsString({ message: "Status deve ser uma string" })
  @IsIn(["pendente", "pago", "cancelado"], { message: "Status deve ser 'pendente', 'pago' ou 'cancelado'" })
  status?: string

  @ApiProperty({ example: "Comissão referente à venda #12345", required: false })
  @IsOptional()
  @IsString({ message: "Observação deve ser uma string" })
  observacao?: string
}
