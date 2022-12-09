import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import PostNotFoundException from "./exceptions/postNotFound.exception";
import { Terms } from "./terms.entity";
import CreateUserDto from "./dto/createUser.dto";

@Injectable()
export class TermsService {
  constructor(
    @InjectRepository(Terms)
    private termsRepository: Repository<Terms>,
  ) { }

  async getAllUsers() {
    return this.termsRepository
        .createQueryBuilder()
        .select("*")
        .execute();
  }

  async create(termData: CreateUserDto) {
    const newTerm = await this.termsRepository.create(termData);
    // console.log(newUser);
    await this.termsRepository.save(newTerm);

    return newTerm;
  }

  async update(profileDto: CreateUserDto) {
    const title = profileDto.title;
    let term = await this.termsRepository.findOneBy({title: title});
    try {
      await this.termsRepository.update(term.id, profileDto);
    } catch (error) { 
      return {
        message: 'update failed.', access: false
      };
    }
    term = await this.termsRepository.findOneBy({title: title});
    return term;
  }

  async deleteTerm(title: string) {
    const term = await this.termsRepository.findOneBy({title: title});
    const deleteResponse = await this.termsRepository.delete(term.id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(title);
    }
    return true;
  }

  // async getByWalletAddress(address: string) {
  //   const findOptions: FindOneOptions = {
  //     where: {
  //       wallet_address : address
  //     }
  //   }
  //   const user = await this.termsRepository.findOneBy({wallet_address: address});
  //   if (user) {
  //     return user;
  //   }
  //   throw new HttpException(
  //     "User with this wallet_address does not exist",
  //     HttpStatus.NOT_FOUND
  //   );
  // }
}
