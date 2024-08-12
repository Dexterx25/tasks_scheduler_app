import {
    ApiProperty,
  } from "@nestjs/swagger";
  
  import {
    IsNotEmpty,
  } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
 
  export class UserRegisterDTO  {
    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    email!: string;

    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    password!: string;
  
    @IsNotEmpty()
    @ApiProperty({
      type: UUID
    })
    type_document_id!: string

    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    rePassword!: string;

    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    nikname!: string;
   
    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    names!: string;
    
    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    surnames!: string;
   
  
  }

 

  export class loginAdminUserDTO {
    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    email?: string;

    @IsNotEmpty()
    @ApiProperty({
      type: String,
    })
    password?: string;
  
  
  }

 
